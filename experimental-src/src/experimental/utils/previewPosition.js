const previewPosition = {
  targetX: 0,
  targetY: 0,
  currentX: 0,
  currentY: 0,
  hasPosition: false
};

function getPreviewSize() {
  const width = Math.min(340, window.innerWidth * 0.27);
  return {
    width: Math.max(width, 260),
    height: 245
  };
}

function getSafePreviewPosition(x, y) {
  const margin = 18;
  const { width, height } = getPreviewSize();
  const safeX = Math.min(Math.max(x + 28, margin), window.innerWidth - width - margin);
  const safeY = Math.min(Math.max(y - 92, margin), window.innerHeight - height - margin);

  return { x: safeX, y: safeY };
}

function writePreviewPosition() {
  document.documentElement.style.setProperty('--project-preview-x', `${previewPosition.currentX}px`);
  document.documentElement.style.setProperty('--project-preview-y', `${previewPosition.currentY}px`);
  document.documentElement.classList.add('has-project-preview-position');
}

export function setPreviewPosition(x, y, { immediate = false } = {}) {
  const next = getSafePreviewPosition(x, y);
  previewPosition.targetX = next.x;
  previewPosition.targetY = next.y;

  if (!previewPosition.hasPosition || immediate) {
    previewPosition.currentX = next.x;
    previewPosition.currentY = next.y;
    previewPosition.hasPosition = true;
    writePreviewPosition();
  }
}

export function tickPreviewPosition(strength = 0.2) {
  if (!previewPosition.hasPosition) return;

  previewPosition.currentX += (previewPosition.targetX - previewPosition.currentX) * strength;
  previewPosition.currentY += (previewPosition.targetY - previewPosition.currentY) * strength;
  writePreviewPosition();
}

