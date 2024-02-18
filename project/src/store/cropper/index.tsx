import { create } from "zustand";

const visibleCropper = create((set) => ({
  currentVisibleCropper: true,
  closeVisibleCropper: () => set(() => ({ currentVisibleCropper: false })),
}));

export const useCropperStore = {
  visibleCropper,
};
