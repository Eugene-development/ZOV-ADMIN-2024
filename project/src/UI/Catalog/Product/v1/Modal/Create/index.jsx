import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'

import { useSlug } from '@/hooks/slug'

import FormCreate from './FormCreate'

import { useProductStore } from '@/store/product'
const { visibleCreateProductModal, visibleCreateImageProductModal } =
    useProductStore

export default () => {
    const {
        currentVisibleCreateProductModal,
        closeVisibleCreateProductModal,
        allCategory,
    } = visibleCreateProductModal()

    const { openVisibleCreateImageProductModal, currentImages, cleanCurrentImages, removeImage } =
        visibleCreateImageProductModal()

    // const rubric = map(data?.rubric, v => v.id)
    const [selectedParent, setSelectedParent] = useState([])
    const handleParentChange = e => setSelectedParent(e.target.value)

    const [value, setValue] = useState('')
    const [text, setText] = useState('')
    console.log(text)
    const [seoTitle, setSEOTitle] = useState('')
    const [seoDescription, setSEODescription] = useState('')

    const { slugify } = useSlug()

    let formData = {
        selectedParent,
        value,
        text,
        slug: slugify(value.translit()),
        seoTitle,
        seoDescription,
        currentImages
    }
    // console.log(formData.currentImages)
    const cancelButtonRef = useRef(null)

    return (
        <>
            <Transition.Root
                show={currentVisibleCreateProductModal}
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

                    <div className="fixed inset-0 z-10 overflow-y-auto">
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <CheckIcon
                                                className="h-6 w-6 text-green-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Добавление продукта
                                            </Dialog.Title>
                                            {/* <div className="hidden md:block mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Lorem ipsum, dolor sit amet
                                                    consectetur adipisicing
                                                    elit. Eius aliquam
                                                    laudantium explicabo
                                                    pariatur iste dolorem animi
                                                    vitae error totam. At
                                                    sapiente aliquam accusamus
                                                    facere veritatis.
                                                </p>
                                            </div> */}
                                        </div>
                                    </div>

                                    <div className="space-y-4 divide-gray-200">
                                        <div className="">
                                            <div className="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label
                                                        htmlFor="parent"
                                                        className="block text-xs font-medium text-gray-700"
                                                    >
                                                        Принадлежит категории
                                                    </label>
                                                    <div className="mt-1">
                                                        <select
                                                            onChange={e =>
                                                                handleParentChange(
                                                                    e,
                                                                )
                                                            }
                                                            defaultValue={
                                                                'DEFAULT'
                                                            }
                                                            id="parent"
                                                            name="parent"
                                                            autoComplete="parent-name"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        >
                                                            <option
                                                                value="DEFAULT"
                                                                disabled
                                                                hidden
                                                            >
                                                                Выбрать
                                                            </option>
                                                            {allCategory?.category?.map(
                                                                (item, key) => (
                                                                    <option
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        value={
                                                                            item.id
                                                                        }
                                                                    >
                                                                        {
                                                                            item.value
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-6">
                                                    <label
                                                        htmlFor="value"
                                                        className="block text-xs font-medium text-gray-700"
                                                    >
                                                        Значение
                                                    </label>
                                                    <div className="">
                                                        <input
                                                            onChange={e =>
                                                                setValue(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            type="text"
                                                            name="value"
                                                            id="value"
                                                            autoComplete="value"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="sm:col-span-6">
                                                    <label htmlFor="comment" className="block text-xs font-medium leading-6 text-gray-900">
                                                        Добавьте текст
                                                    </label>
                                                    <div className="">
                                                        <textarea
                                                            onChange={e =>
                                                                setText(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            rows={2}
                                                            name="comment"
                                                            id="comment"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={''}
                                                        />
                                                    </div>
                                                </div>

                                                {/* <div className="sm:col-span-6">
                                                    <label
                                                        htmlFor="text"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Текст
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            onChange={e =>
                                                                setText(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            type="text"
                                                            name="text"
                                                            id="text"
                                                            autoComplete="text"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div> */}
                                                <div className="sm:col-span-6">
                                                    <label
                                                        htmlFor="value"
                                                        className="block text-xs font-medium text-gray-700"
                                                    >
                                                        Title
                                                    </label>
                                                    <div className="">
                                                        <input
                                                            onChange={e =>
                                                                setSEOTitle(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            type="text"
                                                            name="value"
                                                            id="value"
                                                            autoComplete="value"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6">
                                                    <label
                                                        htmlFor="value"
                                                        className="block text-xs font-medium text-gray-700"
                                                    >
                                                        Description
                                                    </label>
                                                    <div className="">
                                                        <input
                                                            onChange={e =>
                                                                setSEODescription(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            type="text"
                                                            name="value"
                                                            id="value"
                                                            autoComplete="value"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="button"
                                                className="mt-2 px-24 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-1 sm:text-sm"
                                                onClick={() => {
                                                    // closeVisibleCreateProductModal()
                                                    openVisibleCreateImageProductModal()
                                                }}
                                            >
                                                Добавить изображение (макс. 5)
                                            </button>
                                        </div>

                                        <div className='flex '>

                                            {currentImages.map((image, index) => (
                                                <div key={image?.hash} className='mr-2 mt-2 relative'>
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_S3}/${image?.hash}`}
                                                        className="h-20 w-full object-cover object-center rounded-sm "
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            removeImage(index)
                                                        }}
                                                        type="button"
                                                        className="absolute opacity-80 top-0.5 right-0.5 rounded-full bg-red-700 p-1 rotate-45 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        <PlusIcon className="h-4 w-4 " aria-hidden="true" />
                                                    </button>
                                                </div>
                                            ))}

                                        </div>


                                        <div className="border-t">
                                            <div className="mt-4 flex justify-between">
                                                <div
                                                    onClick={() =>
                                                        closeVisibleCreateProductModal()
                                                    }
                                                >
                                                    <FormCreate
                                                        data={formData}
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="mt-3 px-24 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                                        onClick={() => {
                                                            cleanCurrentImages()
                                                            closeVisibleCreateProductModal()
                                                        }

                                                        }
                                                        ref={cancelButtonRef}
                                                    >
                                                        Отменить
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
