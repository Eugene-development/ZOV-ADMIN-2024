import { create } from 'zustand'

const visibleReadProductModal = create(set => ({
    currentVisibleReadProductModal: false,
    currentReadProduct: [],
    openVisibleReadProductModal: product => {
        set(() => ({ currentReadProduct: product }))
        set(() => ({ currentVisibleReadProductModal: true }))
    },
    closeVisibleReadProductModal: () =>
        set(() => ({ currentVisibleReadProductModal: false })),
}))

const visibleCreateProductModal = create(set => ({
    currentVisibleCreateProductModal: false,
    allCategory: [],
    openVisibleCreateProductModal: allCategory => {
        set(() => ({ allCategory }))
        set(() => ({ currentVisibleCreateProductModal: true }))
    },
    closeVisibleCreateProductModal: () =>
        set(() => ({ currentVisibleCreateProductModal: false })),
}))

const visibleCreateImageProductModal = create(set => ({
    currentVisibleCreateImageProductModal: false,
    currentImages: [],
    setHashNameImage: newImage => {
    set((state) => ({ ...state, currentImages: [...state.currentImages, newImage] }))
    },
    openVisibleCreateImageProductModal: () => {
        set(() => ({ currentVisibleCreateImageProductModal: true }))
    },
    closeVisibleCreateImageProductModal: () => {
        set(() => ({ currentVisibleCreateImageProductModal: false }))
    },
    cleanCurrentImages: () => {
        set(() => ({ currentImages: [] }))
    },
    removeImage: index => {
    set(state => ({
        ...state,
        currentImages: state.currentImages.filter((_, i) => i !== index)
    }))
    }
}))

const visibleUpdateProductModal = create(set => ({
    currentVisibleUpdateProductModal: false,
    currentUpdateProduct: [],
    allCategory: [],
    openVisibleUpdateProductModal: (product, allCategory) => {
        set(() => ({ currentUpdateProduct: product }))
        set(() => ({ allCategory }))
        set(() => ({ currentVisibleUpdateProductModal: true }))
    },
    closeVisibleUpdateProductModal: () =>
        set(() => ({ currentVisibleUpdateProductModal: false })),
}))

const visibleDeleteProductModal = create(set => ({
    currentVisibleDeleteProductModal: false,
    currentDeleteProduct: [],
    openVisibleDeleteProductModal: category => {
        set(() => ({ currentDeleteProduct: category }))
        set(() => ({ currentVisibleDeleteProductModal: true }))
    },
    closeVisibleDeleteProductModal: () =>
        set(() => ({ currentVisibleDeleteProductModal: false })),
}))

export const useProductStore = {
    visibleReadProductModal,
    visibleCreateProductModal,
    visibleCreateImageProductModal,
    visibleUpdateProductModal,
    visibleDeleteProductModal,
}
