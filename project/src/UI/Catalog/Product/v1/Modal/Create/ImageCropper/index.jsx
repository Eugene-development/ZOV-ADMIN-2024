import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CloseButton from './CloseButton'
import { useProductStore } from '@/store/product'
const { visibleCreateImageProductModal } = useProductStore

import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { useImage } from '@/lib/image'


// const defaultSrc =
//     'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg'


export default () => {

    const {
        currentVisibleCreateImageProductModal,
        closeVisibleCreateImageProductModal,
        setHashNameImage,
    } = visibleCreateImageProductModal()

    const cancelButtonRef = useRef(null)

    const { sendImageToBucket } = useImage()

    const [image, setImage] = useState()
    const [cropper, setCropper] = useState()
    const [cropData, setCropData] = useState('#')

    const cleanCropper = () => {
        setImage(null);
        setCropper(null);
        setCropData('#');
    }


    const handleFileChange = e => {
        e.preventDefault()
        let files
        if (e.dataTransfer) {
            files = e.dataTransfer.files
        } else if (e.target) {
            files = e.target.files
        }
        const reader = new FileReader()
        reader.onload = () => {
            setImage(reader.result)
        }
        reader.readAsDataURL(files[0])
    }

    const getCropData = () => {
        if (typeof cropper !== 'undefined') {
            setCropData(cropper.getCroppedCanvas().toDataURL())
        }
    }


    const handleAddImageProduct = () => {
        try {
            cropper.getCroppedCanvas().toBlob(async cropData => {
                try {
                    const hashNameImage = await sendImageToBucket(cropData)

                    const newImage = {
                        key: process.env.NEXT_PUBLIC_KEY,
                        hash: hashNameImage,
                        alt: 'image',
                    }
                    setHashNameImage(newImage)
                    closeVisibleCreateImageProductModal()
                    cleanCropper()

                } catch (error) {
                    console.error(
                        'Error while processing the response from the server:',
                        error,
                    )
                }
            }, 'image/jpeg')
        } catch (error) {
            console.error('Error in handleAddImageProduct:', error)
        }
    }

    return (
        <Transition.Root
            show={currentVisibleCreateImageProductModal}
            as={Fragment}
        >
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={() => null}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">

                                <div className='absolute top-4 right-4' onClick={() => cleanCropper()}>
                                    <CloseButton />
                                </div>

                                <div className="my-4 max-w-full" >

                                    <input
                                        type="file"
                                        name="image"
                                        className="block w-full text-sm text-slate-500 mb-3 my-
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-full file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-green-50 file:text-green-700
                                                    hover:file:bg-violet-100
                                                    "
                                        onChange={handleFileChange}
                                    />
                                    {image && (
                                        <Cropper
                                            style={{
                                                height: 350,
                                                width: '100%',
                                            }}
                                            aspectRatio={3 / 2}
                                            zoomTo={0.1}
                                            initialAspectRatio={3 / 2}
                                            src={image}
                                            viewMode={1}
                                            minCropBoxHeight={10}
                                            minCropBoxWidth={10}
                                            background={true}
                                            responsive={true}
                                            autoCropArea={1}
                                            checkOrientation={true} // https://github.com/fengyuanchen/cropperjs/issues/671
                                            onInitialized={instance => {
                                                setCropper(instance)
                                            }}
                                            guides={true}
                                        />
                                    )}
                                </div>

                                {image && (
                                    <div className="flex pt-4 justify-between">
                                        {cropData !== '#' && (
                                            <>
                                                <div className="">
                                                    <img
                                                        className="w-full h-48"
                                                        src={cropData}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                {image && (
                                    <div className="mt-3 sm:mt-4 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                            onClick={() => handleAddImageProduct()}
                                        >
                                            Загрузить
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                            onClick={getCropData}
                                            ref={cancelButtonRef}
                                        >
                                            Обрезать
                                        </button>
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
