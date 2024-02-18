"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useCropperStore } from "@/store/cropper";
import { useProductStore } from '@/store/product'
const { visibleCreateImageProductModal } = useProductStore

export default function closeButton() {
const {
        closeVisibleCreateImageProductModal,
    } = visibleCreateImageProductModal()
  return (
    <button
      onClick={closeVisibleCreateImageProductModal}
      type="button"
      className="relative isolate -m-3 p-3 focus-visible:outline-offset-[-4px] z-20 "
    >
      <span className="sr-only">Закрыть</span>
      <XMarkIcon
        className="h-5 w-5 text-red-800 hover:text-red-700"
        aria-hidden="true"
      />
    </button>
  );
}
