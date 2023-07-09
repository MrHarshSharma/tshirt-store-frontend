import React, { useEffect, useLayoutEffect, useState } from "react";

import { editproduct, fetchDataFromAPI } from "@/utils/api";
import { getDiscountedPricePercentage } from "@/utils/helper";

import { useDispatch } from "react-redux";
import { STRAPI_API_TOKEN } from "@/utils/urls";
import "react-toastify/dist/ReactToastify.css";
import {
  ChevronDoubleLeftIcon,
  PhotoIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { HiChevronLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/DashboardLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiX } from "react-icons/hi";
import FormData from "form-data";
import Loader from "@/components/Loader";
import { getSession } from "next-auth/react";

const ProductDetails = ({ product, AllCategories }) => {
  const router = useRouter();
  useLayoutEffect(() => {
    const fn = async () => {
      const session = await getSession();

      if (session?.user?.email != process.env.NEXT_PUBLIC_EMAIL_ADMIN) {
        router.push("/");
      }
      
    };

    fn();
  }, []);

  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const p = product?.data?.[0].attributes;
  const productId = product?.data?.[0].id;
  const [productDetails, setProductDetails] = useState({});

  const [newThumbnail, setThumbnail] = useState("");
  const [ThumbFile, setThumbFile] = useState();
  useEffect(() => {
    let allProductDetails = {};

    allProductDetails.name = p.name;
    allProductDetails.subtitle = p.subtitle;
    allProductDetails.description = p.description;
    allProductDetails.price = p.price;
    allProductDetails.original_price = p.original_price;
    allProductDetails.quantity = p.quantity;
    allProductDetails.categories = [];
    p.categories.data.map((cat) => {
      allProductDetails.categories.push({
        id: cat.id,
        name: cat.attributes.name,
      });
    });
    setProductDetails(allProductDetails);
  }, []);
  const [update, setUpdate] = useState(0);
  const updateProduct = async (id) => {
    setShowLoader(true);
    notify_start();
    delete productDetails.image;
    delete productDetails.thumbnail;

    const formData = new FormData();

    formData.append("data", JSON.stringify(productDetails));
    formData.append("files.thumbnail", newThumbnail);

    const updateThisProduct = await editproduct(
      `/api/products/${id}`,
      formData
    );

    if (updateThisProduct?.data) {
      setShowLoader(false);
      notify_done();
    }
  };

  const notify_done = () => {
    toast.success("Success. Product Updated!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const notify_start = () => {
    toast.warning("Updating Product!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const onSingleFileChange = (e) => {
    const file = e.target.files;
    console.log("onSingleFileChange", file);
    console.log("onSingleFileChange1", file[0]);

    setThumbnail(file[0]);
    if (file[0]) {
      setThumbFile(URL.createObjectURL(file[0]));
    }
  };

  const removeCategory = (cat_id) => {
    console.log(cat_id);
    productDetails.categories = productDetails.categories.filter(
      (cat) => cat_id !== cat.id
    );
    setProductDetails(productDetails);
    setUpdate((prev) => prev + 1);
    console.log(productDetails);
  };

  const addCategory = (cat_id) => {
    if (
      productDetails.categories.filter((cat) => cat_id == cat.id).length != 0
    ) {
      return;
    }
    const gotCategory = AllCategories.data.filter((cat) => cat_id == cat.id);
    const newCategory = {
      id: gotCategory[0].id,
      name: gotCategory[0].attributes.name,
    };
    productDetails.categories.push(newCategory);
    setProductDetails(productDetails);
    setUpdate((prev) => prev + 1);
    console.log(productDetails);
  };
  return (
    <DashboardLayout>
      {showLoader && <Loader />}

      <ToastContainer />
      <div className="w-full">
        <div className=" flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px] ">
          <div className=" flex-[1] py-3 ">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="flex items-center gap-5 font-semibold text-lg leading-7 text-gray-900">
                    <HiChevronLeft
                      onClick={() => router.back()}
                      className="text-2xl hover:cursor-pointer"
                    />{" "}
                    Edit {p.name}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="p_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product Name
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset  sm:max-w-md">
                          <input
                            defaultValue={productDetails.name}
                            onChange={(e) => {
                              productDetails.name = e.target.value;
                            }}
                            type="text"
                            name="p_name"
                            id="p_name"
                            autoComplete="p_name"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Product name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="p_subtitle"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Sub Title
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                          <input
                            defaultValue={productDetails.subtitle}
                            onChange={(e) => {
                              productDetails.subtitle = e.target.value;
                            }}
                            type="text"
                            name="p_subtitle"
                            id="p_subtitle"
                            autoComplete="p_subtitle"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Sub title"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="p_original_price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Original Price
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                          <input
                            defaultValue={productDetails.original_price}
                            onChange={(e) => {
                              productDetails.original_price = Number(
                                e.target.value
                              );
                              setUpdate((prev) => prev + 1);
                            }}
                            type="text"
                            name="p_original_price"
                            id="p_original_price"
                            autoComplete="p_original_price"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Original price"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="p_discounted_price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Discounted Price
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                          <input
                            defaultValue={productDetails.price}
                            onChange={(e) => {
                              productDetails.price = Number(e.target.value);
                              setUpdate((prev) => prev + 1);
                            }}
                            type="text"
                            name="p_discounted_price"
                            id="p_discounted_price"
                            autoComplete="p_discounted_price"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Discounted price"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="p.total_discount"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Total Discount
                      </label>
                      <div className={`mt-2 `}>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                          <input
                            value={`${getDiscountedPricePercentage(
                              productDetails.original_price,
                              productDetails.price
                            )}% off`}
                            type="text"
                            name="p.total_discount"
                            id="p.total_discount"
                            autoComplete="p.total_discount"
                            className={`${
                              getDiscountedPricePercentage(
                                productDetails.original_price,
                                productDetails.price
                              ) > -0.01
                                ? "text-green-500"
                                : "text-red-500"
                            } block text-green-500 flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 hover:cursor-not-allowed`}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="p_description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="p_description"
                          name="p_description"
                          rows={3}
                          className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                          defaultValue={productDetails.description}
                          onChange={(e) => {
                            productDetails.description = e.target.value;
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="p_categories"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Categories
                      </label>
                      <div className="mt-2">
                        <select
                          onChange={(e) => addCategory(e.target.value)}
                          id="p_categories"
                          name="p_categories"
                          autoComplete="p_categories"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>select multiple</option>
                          {AllCategories.data.map((cat) => {
                            return (
                              <option value={cat.id}>
                                {cat.attributes.name}
                              </option>
                            );
                          })}
                        </select>

                        <div className="flex gap-2 mt-2">
                          {productDetails?.categories?.map((cat, i) => {
                            return (
                              <span
                                className="flex gap-2 text-sm rounded-full  bg-slate-200 px-3 items-center justify-center leading-6 text-gray-900"
                                key={i}
                              >
                                {cat.name}{" "}
                                <button
                                  className="cursor-pointer "
                                  onClick={() => removeCategory(cat.id)}
                                >
                                  <HiX />
                                </button>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Thumbnail
                      </label>
                      <div className="mt-2 flex items-center gap-x-3">
                        {ThumbFile ? (
                          <img
                            className="h-12 w-12 border-slate-500 border-2 rounded-md"
                            src={ThumbFile}
                            alt={`images`}
                          />
                        ) : (
                          <img
                            className="h-12 w-12 border-slate-500 border-2 rounded-md"
                            src={p?.thumbnail?.data?.attributes?.url}
                            alt={`images`}
                          />
                        )}
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2  focus-within:ring-offset-2"
                        >
                          <span>Upload New</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={(e) => onSingleFileChange(e)}
                          />
                        </label>
                        {ThumbFile && (
                          <span
                            className="cursor-pointer text-rose-500"
                            onClick={() => {
                              setThumbFile("");
                            }}
                          >
                            Remove
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        <b>Thumbnail</b> | Current Images
                      </label>
                      <div className="mt-2">
                        <div className="flex gap-2 overflow-auto ">
                          <img
                            className="w-[100px] aspect-square border-slate-500 border-2 rounded-md"
                            src={p?.thumbnail?.data?.attributes?.url}
                            alt={`images`}
                          />

                          {p?.image?.data?.map((image, i) => {
                            return (
                              <img
                                className="w-[100px] aspect-square rounded-md"
                                src={image?.attributes?.url}
                                alt={`images`}
                                key={i}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cover photo
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2  focus-within:ring-offset-2"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  onClick={() => router.back()}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateProduct(productId)}
                  className=" p-2 rounded-md  bg-black text-white text-lg transition-transform active:scale-95 hover:opacity-75 "
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          {/*right colum end */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const products = await fetchDataFromAPI("/api/products?populate=*");

  const paths = products.data.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataFromAPI(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );

  const AllCategories = await fetchDataFromAPI(`/api/categories`);

  return {
    // Passed to the page component as props
    props: { product, AllCategories },
  };
}
