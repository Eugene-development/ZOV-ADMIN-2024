"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useCropperStore } from "@/store/cropper";
const { visibleCropper } = useCropperStore;

export default function closeButton() {
  const { closeVisibleCropper } = visibleCropper();

  return (
    <button
      onClick={closeVisibleCropper}
      type="button"
      className="relative isolate mr-0 p-3 focus-visible:outline-offset-[-4px] z-20 "
    >
      <span className="sr-only">Закрыть</span>
      <XMarkIcon
        className="h-5 w-5 text-red-800 hover:text-red-700"
        aria-hidden="true"
      />
    </button>
  );
}
