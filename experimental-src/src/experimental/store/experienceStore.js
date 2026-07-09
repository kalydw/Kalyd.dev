import { create } from 'zustand';

const initialState = {
  hoveredProject: null,
  hoveredWord: null,
  cursorMode: 'default',
  activeSection: 'home',
  backgroundMode: 'idle'
};

export const useExperienceStore = create((set, get) => ({
  ...initialState,
  setHoveredProject: (hoveredProject) => {
    if (get().hoveredProject?.slug !== hoveredProject?.slug) set({ hoveredProject });
  },
  setHoveredWord: (hoveredWord) => {
    if (get().hoveredWord !== hoveredWord) set({ hoveredWord });
  },
  setCursorMode: (cursorMode) => {
    if (get().cursorMode !== cursorMode) set({ cursorMode });
  },
  setActiveSection: (activeSection) => {
    if (get().activeSection !== activeSection) set({ activeSection });
  },
  setBackgroundMode: (backgroundMode) => {
    if (get().backgroundMode !== backgroundMode) set({ backgroundMode });
  },
  resetInteraction: () =>
    set({
      hoveredProject: null,
      hoveredWord: null,
      cursorMode: 'default',
      backgroundMode: 'idle'
    })
}));
