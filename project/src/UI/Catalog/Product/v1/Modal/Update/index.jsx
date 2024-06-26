import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'

import { useSlug } from '@/hooks/slug'

import { useProductStore } from '@/store/product'
const { visibleUpdateProductModal } = useProductStore

import ButtonUpdate from './ButtonUpdate'

export default () => {
    const {
        currentVisibleUpdateProductModal,
        closeVisibleUpdateProductModal,
        currentUpdateProduct,
        allCategory,
    } = visibleUpdateProductModal()

    // console.log(currentUpdateProduct)

    const [changedName, setName] = useState(currentUpdateProduct.value)
    const [changedText, setText] = useState(currentUpdateProduct.text?.value)
    const [changedSeoTitle, setSeoTitle] = useState('')
    const [changedSeoDescription, setSeoDescription] = useState('')
    console.log(changedText)



    // const seoTitle = changedSeoTitle || currentSeoTitleProduct;
    // const seoDescription = changedSeoDescription || currentSeoDescriptionProduct;

    const [selectedParent, setSelectedParent] = useState(
        currentUpdateProduct?.parent?.id,
    )
    // const parent = selectedParent ? selectedParent : currentParentIdProduct;
    // const text = changedText ? changedText : currentValueProduct;

    const { slugify } = useSlug()

    let formData = {
        id: currentUpdateProduct.id,
        selectedParent,
        name: changedName || currentUpdateProduct.value,
        slug: changedName
            ? slugify(changedName.translit())
            : currentUpdateProduct.slug,
        idText: currentUpdateProduct.text?.id,
        text: changedText || currentUpdateProduct.text?.value,
        idTitle: currentUpdateProduct.seoTitle?.id,
        title: changedSeoTitle || currentUpdateProduct.seoTitle?.value,
        idDescription: currentUpdateProduct.seoDescription?.id,
        description:
            changedSeoDescription || currentUpdateProduct.seoDescription?.value,
    }

    const cleanerProduct = () => {
        closeVisibleUpdateProductModal()
        setName('')
        setText('')
        setSeoTitle('')
        setSeoDescription('')
    }

    const handleParentChange = e => setSelectedParent(e.target.value)
    // const handleUpdateProduct = e => {
    //     e.preventDefault()
    //     if (text.trim().length) {
    //         updateProduct({
    //             variables: {
    //                 id: currentIdProduct,
    //                 key,
    //                 is_active: true,
    //                 value: text,
    //                 slug: slugify(text.translit()),
    //                 parentableType: 'rubric',
    //                 parentableId: Number(parent),
    //                 updateSeoTitle: {
    //                     key: '1',
    //                     id: currentIdSeoTitleProduct,
    //                     value: seoTitle,
    //                 },
    //                 updateSeoDescription: {
    //                     key: '1',
    //                     id: currentIdSeoDescriptionProduct,
    //                     value: seoDescription,
    //                 },
    //             },
    //         })
    //         setText('')
    //         setSeoTitle('')
    //         setSeoDescription('')
    //     }
    // }

    const cancelButtonRef = useRef(null)

    return (
        <>
            <Transition.Root
                show={currentVisibleUpdateProductModal}
                as={Fragment}
            >
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={() => closeVisibleUpdateProductModal()}
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
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                            <CheckIcon
                                                className="h-6 w-6 text-blue-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Изменение данных
                                            </Dialog.Title>
                                            {/* <div className="hidden md:block mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Обновление действия
                                                    необратимо. Будьте
                                                    внимательны к заполнению
                                                    полей и предварительно
                                                    сверяйте данные с
                                                    первоисточником.
                                                </p>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div
                                        // onSubmit={handleUpdateProduct}
                                        className="space-y-6 divide-gray-200"
                                    >
                                        <div className="py-2">
                                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label
                                                        htmlFor="parent"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Изменить рубрику
                                                        категории
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
                                                                {
                                                                    currentUpdateProduct
                                                                        ?.parent
                                                                        ?.value
                                                                }
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

                                                            {/* <option value="значение2" selected>Вариант 2 (дефолтный выбор)</option> */}
                                                            {/* {data.rubric.map((item, key) => {
                                                        return item.id == currentParentIdProduct ?
                                                            <option key={item.id} value={currentParentIdProduct}>{currentParentValueProduct}</option>
                                                            :
                                                            <option key={item.id} value={item.id}>{item.value}</option>
                                                    }
                                                        )} */}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6">
                                                    <label
                                                        htmlFor="value"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Наименование
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            defaultValue={
                                                                currentUpdateProduct.value
                                                            }
                                                            onChange={e =>
                                                                setName(
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
                                                        htmlFor="text"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Текст
                                                    </label>
                                                    <div className="mt-1">
                                                        <textarea
                                                            defaultValue={
                                                                currentUpdateProduct.text?.value
                                                            }
                                                            onChange={e =>
                                                                setText(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            rows={2}
                                                            type="text"
                                                            name="text"
                                                            id="text"
                                                            autoComplete="value"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="sm:col-span-6">
                                                    <label
                                                        htmlFor="title"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Title
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            defaultValue={
                                                                currentUpdateProduct
                                                                    .seoTitle
                                                                    ?.value
                                                            }
                                                            onChange={e =>
                                                                setSeoTitle(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            type="text"
                                                            name="title"
                                                            id="title"
                                                            autoComplete="title"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6">
                                                    <label
                                                        htmlFor="description"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Description
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            defaultValue={
                                                                currentUpdateProduct
                                                                    .seoDescription
                                                                    ?.value
                                                            }
                                                            onChange={e =>
                                                                setSeoDescription(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            type="text"
                                                            name="description"
                                                            id="description"
                                                            autoComplete="description"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>



                                            </div>
                                        </div>
                                        <div className='flex '>
                                            {currentUpdateProduct?.image?.map(image => (
                                                <div key={image?.hash} className='flex relative mr-2 mt-2'>
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_S3}/${image?.hash}`}
                                                        className="h-24 w-32 object-cover object-center rounded-sm "
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            console.log("123")
                                                        }}
                                                        type="button"
                                                        className="absolute opacity-80 top-0.5 right-0.5 rounded-full bg-red-700 p-1 rotate-45 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        <PlusIcon className="h-4 w-4" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t">
                                            <div className="mt-8 flex justify-between">
                                                <div
                                                    onClick={() => {
                                                        cleanerProduct()
                                                    }}
                                                >
                                                    <ButtonUpdate
                                                        data={formData}
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-24 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                                        onClick={() =>
                                                            closeVisibleUpdateProductModal()
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
