import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const contentScript = fs.readFileSync("extension/content/video-loop-controller.js", "utf8");
const sidePanelScript = fs.readFileSync("extension/sidepanel/sidepanel.js", "utf8");

test("side panel startup refreshes status without applying settings", () => {
  assert.match(sidePanelScript, /await refresh\(\);/);
  assert.doesNotMatch(sidePanelScript, /await saveAndApply\(\);/);
});

test("side panel observes quick-toggle storage changes without persisting runtime-only settings", () => {
  assert.match(sidePanelScript, /chrome\.storage\.onChanged\.addListener/);
  assert.match(sidePanelScript, /enabled: persistentSettings\.enabled/);
  assert.match(sidePanelScript, /loopCount: persistentSettings\.loopCount/);
  assert.match(sidePanelScript, /toStoredSettings\(settings\)/);
});

test("content messaging keeps completed count when side panel only requests status", async () => {
  const video = new FakeVideo();
  const runtime = createRuntime([video]);
  runtime.send({ type: "MOVIE_LOOP_APPLY_SETTINGS", settings: { enabled: true, loopCount: 2 } });
  video.dispatch("ended");
  await tick();

  const status = runtime.send({ type: "MOVIE_LOOP_GET_STATUS" });
  assert.equal(status.loopsCompleted, 1);
  assert.equal(video.currentTime, 0);
});

test("failed video.play does not count as a completed replay and reports the reason", async () => {
  const video = new FakeVideo();
  video.playImpl = () => Promise.reject(new Error("play blocked"));
  const runtime = createRuntime([video]);
  runtime.send({ type: "MOVIE_LOOP_APPLY_SETTINGS", settings: { enabled: true, loopCount: 1 } });

  video.dispatch("ended");
  await tick();

  const status = runtime.send({ type: "MOVIE_LOOP_GET_STATUS" });
  assert.equal(status.loopsCompleted, 0);
  assert.match(status.lastError, /play blocked/);
});

test("target video selection fixes looping to the selected video", async () => {
  const first = new FakeVideo({ label: "Preview" });
  const second = new FakeVideo({ label: "Lesson" });
  const runtime = createRuntime([first, second]);
  const initial = runtime.send({ type: "MOVIE_LOOP_GET_STATUS" });
  assert.equal(initial.videoList[0].label, "Video 1 (0.0s / 12.0s)");
  assert.equal(initial.videoList[1].label, "Video 2 (0.0s / 12.0s)");
  assert.equal(initial.videoList.some((video) => /Preview|Lesson|movie\.mp4/.test(video.label)), false);
  const selectedId = initial.videoList[1].id;

  runtime.send({ type: "MOVIE_LOOP_APPLY_SETTINGS", settings: { enabled: true, loopCount: 2, targetVideoId: selectedId } });
  first.dispatch("ended");
  await tick();
  assert.equal(runtime.send({ type: "MOVIE_LOOP_GET_STATUS" }).loopsCompleted, 0);

  second.dispatch("ended");
  await tick();
  assert.equal(runtime.send({ type: "MOVIE_LOOP_GET_STATUS" }).loopsCompleted, 1);
});

test("A-B repeat seeks to the segment start and counts successful segment loops", async () => {
  const video = new FakeVideo();
  const runtime = createRuntime([video]);
  runtime.send({ type: "MOVIE_LOOP_APPLY_SETTINGS", settings: { enabled: true, loopCount: 2, segment: { enabled: true, start: 3, end: 5 } } });

  video.currentTime = 5.2;
  video.dispatch("timeupdate");
  await tick();

  const status = runtime.send({ type: "MOVIE_LOOP_GET_STATUS" });
  assert.equal(video.currentTime, 3);
  assert.equal(status.loopsCompleted, 1);
});

test("scanner includes videos inside open shadow roots", () => {
  const shadowVideo = new FakeVideo({ label: "Shadow video" });
  const host = { nodeType: 1, tagName: "DIV", shadowRoot: new FakeRoot([shadowVideo]) };
  const runtime = createRuntime([], [host]);

  const status = runtime.send({ type: "MOVIE_LOOP_GET_STATUS" });
  assert.equal(status.videos, 1);
  assert.equal(status.videoList[0].label, "Video 1 (0.0s / 12.0s)");
});

test("scanner includes videos inside same-origin iframes", () => {
  const frameVideo = new FakeVideo({ label: "Frame video" });
  const iframe = { nodeType: 1, tagName: "IFRAME", contentDocument: { documentElement: new FakeRoot([frameVideo]), body: new FakeRoot([frameVideo]) }, addEventListener() {} };
  const runtime = createRuntime([], [iframe]);

  const status = runtime.send({ type: "MOVIE_LOOP_GET_STATUS" });
  assert.equal(status.videos, 1);
  assert.equal(status.videoList[0].label, "Video 1 (0.0s / 12.0s)");
});

function createRuntime(videos, nodes = []) {
  const messageListeners = [];
  const storageChangeListeners = [];
  const sandbox = {
    console,
    Node: { ELEMENT_NODE: 1 },
    MutationObserver: class {
      observe() {}
    },
    URL,
    location: { href: "https://example.test/watch" },
    document: {
      readyState: "complete",
      documentElement: new FakeRoot(videos, nodes),
      body: new FakeRoot(videos, nodes),
      addEventListener() {}
    },
    chrome: {
      storage: {
        sync: {
          get(_key, callback) {
            callback({ movieLoopTool: { enabled: false, loopCount: 1 } });
          }
        },
        onChanged: {
          addListener(listener) {
            storageChangeListeners.push(listener);
          }
        }
      },
      runtime: {
        onMessage: {
          addListener(listener) {
            messageListeners.push(listener);
          }
        }
      }
    }
  };
  sandbox.document.querySelectorAll = (selector) => sandbox.document.documentElement.querySelectorAll(selector);
  vm.runInNewContext(contentScript, sandbox, { filename: "video-loop-controller.js" });
  assert.equal(messageListeners.length, 1);
  return {
    send(message) {
      let response;
      messageListeners[0](message, {}, (value) => {
        response = value;
      });
      return response;
    },
    emitStorageChange(value) {
      for (const listener of storageChangeListeners) listener({ movieLoopTool: { newValue: value } }, "sync");
    }
  };
}

class FakeRoot {
  constructor(videos = [], nodes = []) {
    this.nodeType = 1;
    this.tagName = "HTML";
    this.videos = videos;
    this.nodes = nodes;
  }

  querySelectorAll(selector) {
    if (selector === "video") return this.videos;
    if (selector === "iframe") return this.nodes.filter((node) => String(node.tagName).toLowerCase() === "iframe");
    if (selector === "*") return this.nodes;
    return [];
  }
}

class FakeVideo {
  constructor({ label = "", src = "https://cdn.example.test/movie.mp4", duration = 12 } = {}) {
    this.nodeType = 1;
    this.tagName = "VIDEO";
    this.isConnected = true;
    this.currentSrc = src;
    this.src = src;
    this.duration = duration;
    this.currentTime = 0;
    this.playCalls = 0;
    this.playImpl = () => Promise.resolve();
    this.listeners = new Map();
    this.attributes = new Map();
    if (label) this.attributes.set("aria-label", label);
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) || [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  dispatch(type) {
    for (const listener of this.listeners.get(type) || []) listener({ currentTarget: this });
  }

  getAttribute(name) {
    return this.attributes.get(name) || "";
  }

  play() {
    this.playCalls += 1;
    return this.playImpl();
  }
}

function tick() {
  return new Promise((resolve) => setImmediate(resolve));
}
