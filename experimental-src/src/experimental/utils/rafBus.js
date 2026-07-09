const subscribers = new Set();
let frameId = 0;
let lastTime = 0;

function tick(time) {
  const delta = lastTime ? time - lastTime : 16;
  lastTime = time;

  subscribers.forEach((callback) => callback(time, delta));
  frameId = subscribers.size ? requestAnimationFrame(tick) : 0;
}

export function subscribeFrame(callback) {
  subscribers.add(callback);

  if (!frameId) {
    lastTime = 0;
    frameId = requestAnimationFrame(tick);
  }

  return () => {
    subscribers.delete(callback);

    if (!subscribers.size && frameId) {
      cancelAnimationFrame(frameId);
      frameId = 0;
      lastTime = 0;
    }
  };
}

