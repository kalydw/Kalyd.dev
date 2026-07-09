import { create } from 'zustand';

const initialState = {
  hoveredProject: null,
  hoveredWord: null,
  cursorMode: 'default',
  activeSection: 'home',
  backgroundMode: 'idle',
  mousePosition: { x: 0, y: 0 }
};

export const useExperienceStore = create((set) => ({
  ...initialState,
  setHoveredProject: (hoveredProject) => set({ hoveredProject }),
  setHoveredWord: (hoveredWord) => set({ hoveredWord }),
  setCursorMode: (cursorMode) => set({ cursorMode }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setBackgroundMode: (backgroundMode) => set({ backgroundMode }),
  setMousePosition: (mousePosition) => set({ mousePosition }),
  resetInteraction: () =>
    set({
      hoveredProject: null,
      hoveredWord: null,
      cursorMode: 'default',
      backgroundMode: 'idle'
    })
}));
