import DashboardLayout from "@/components/DashboardLayout";
import React, { Fragment, useRef, useState } from "react";
import { fetchDataFromAPI, deleteproduct } from "@/utils/api";
import ProductCardList from "@/components/ProductCardList";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { getDiscountedPricePercentage } from "@/utils/helper";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import Loader from "@/components/Loader";
import NoDataPresent from "@/components/NoDataPresent";

const products = ({ Allproducts }) => {
    const router = useRouter()
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(Allproducts)
  const [showLoader, setShowLoader] = useState(false)
  const [toDeleteProductDetails, setToDeleteProductDetails] = useState({});
  const cancelButtonRef = useRef(null);
  const checkdeleteProduct =  (id) => {
    const toDeleteProduct = products.data.filter((p) => p.id === id);
    setToDeleteProductDetails(toDeleteProduct[0]);
    console.log(toDeleteProductDetails);
    setOpen(true);
  };

  const deleteProduct = async (id) =>{
    setShowLoader(true)
      const deleteThis = await deleteproduct('/api/products/'+id)
      setOpen(false)
      notify();
      const fetchProducts = await fetchDataFromAPI("/api/products?populate=*");
      setProducts(fetchProducts)
      setShowLoader(false)
    }
    
    const notify = () => {
        toast.success('Delete Success', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
 
 

  return (

     
    <DashboardLayout>
    {showLoader&&<Loader />}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete {toDeleteProductDetails?.attributes?.name}?
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this product?
                          </p>
                          <p className="text-base  font-medium"> Details as follows</p>
                          <p className=" truncate text-base leading-5 text-gray-500">
                            {" "}
                            Discounted Price: &#8377;{toDeleteProductDetails?.attributes?.price}
                          </p>
                          <p className=" ">
                            Price: <span className="line-through">&#8377;{toDeleteProductDetails?.attributes?.original_price} </span>
                            &nbsp; <span className="text-base text-green-500 ">
                               {getDiscountedPricePercentage(
                                  toDeleteProductDetails?.attributes?.original_price,
                                  toDeleteProductDetails?.attributes?.price
                              )}
                              % off
                            </span>
                          </p>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={()=>deleteProduct(toDeleteProductDetails?.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="w-full">
      <Link href="/dashboard/addproduct"> Add new</Link>
      {products?.data?.length == 0 && (
        <NoDataPresent message='No Products Available' />
      )}
        <ul role="list" className="divide-y divide-gray-100">
          {products?.data?.map((product) => {
            return (
              <ProductCardList
                key={product?.id}
                data={product}
                checkdeleteProduct={checkdeleteProduct}
              />
            );
          })}
        </ul>
        <ToastContainer />
      </div>
    </DashboardLayout>

  );
};

export default products;

export async function getStaticProps(context) {
  const Allproducts = await fetchDataFromAPI("/api/products?populate=*");
  return {
    props: { Allproducts },
  };
}
