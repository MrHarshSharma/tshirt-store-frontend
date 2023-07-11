import ProductDetailsCarousal from "@/components/ProductDetailsCarousal";
import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchDataFromAPI } from "@/utils/api";
import { getDiscountedPricePercentage } from "@/utils/helper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeliveryType from "@/components/DeliveryType";


const ProductDetails = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const p = product?.data?.[0].attributes;

  const notify = () => {
    toast.success('Success. Chek your cart!', {
      position: "bottom-right",
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
    <div className="w-full md:py-20">
 
    <ToastContainer />
      <Wrapper>
        <div className=" flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px] ">
          {/*Left colum start*/}
          <div className=" w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:max-0 ">
            <ProductDetailsCarousal images={p.image.data} />
          </div>
          {/*Left colum end */}

          {/*right colum start*/}
          <div className=" flex-[1] py-3 ">
            {/* Product title */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">{p.name}</div>

            {/* Product subtitle */}
            <div className="text-lg font-semibold mb-5 ">{p.subtitle}</div>

            {/* Product Price */}
            <div className="flex items-center">
              <p className="text-lg font-semibold mr-2 ">
                MRP : &#8377;{p.price}
              </p>
              {p.original_price && (
                <>
                  <p className="text-base font-medium line-through">
                    &#8377;{p.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPricePercentage(p.original_price, p.price)}%
                    off
                  </p>
                </>
              )}
            </div>
            <div className="text-md font-medium text-black/[0.5] ">
              incl. of taxes
            </div>
            <div className="text-md font-medium mb-20 text-black/[0.5] ">
              {`(Also includes all applicable duties)`}
            </div>

            {/** product size range start */}
            <div className="mb-10">
              {/** Heading start */}
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Size Guide
                </div>
              </div>
              {/** Heading end */}
              {/** size section start */}
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {p?.quantity?.data.map((quant) => {
                  return (
                    <div
                    
                      onClick={() => {
                        if(quant.enabled){

                          setSelectedSize(quant.size);
                          setShowError(false);
                        }
                      }}
                      key={quant.id}
                      className={`border rounded-md text-center py-3 font-medium  ${
                        quant.enabled
                          ? "hover:border-black cursor-pointer"
                          : " cursor-not-allowed bg-black/[0.5] opacity-50 "
                      } ${selectedSize === quant.size ? "border-black" : ""}`}
                    >
                      {quant.size}
                    </div>
                  );
                })}
              </div>
              {/** size section end */}
              {/** show error start */}

              {showError && (
                <div className="text-red-600 mt-1">
                  Quantity selection is required
                </div>
              )}

              {/** show error end */}
            </div>
            {/** product size range emd */}

            {/** Add to cart btn start */}
            <button
              onClick={() => {
                if(!selectedSize){
                  setShowError(true)
                  document.getElementById("sizesGrid").scrollIntoView({
                    block: "center",
                    behavior: "smooth"
                  })
                }else{

                  dispatch(addToCart({
                    ...product?.data?.[0],
                    selectedSize,
                    oneQuantityPrice: p.price,
                  }))
                  notify();
                }

              }}
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 "
            >
              Add to Cart
            </button>
            {/** Add to cart btn end */}

            {/** wishlist  btn start */}
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10 ">
              Wishlist <IoMdHeartEmpty />
            </button>
            {/** wishlist  btn end */}

            {/**Product details start */}
            <div>
              <div className="text-lg font-bold mb-5 ">Product Details</div>
              <div className="text-md mb-5 makrdown">
              <ReactMarkdown>
                {p.description}
              </ReactMarkdown>
              </div>
              
            </div>
            {/**Product details end */}
          </div>
          {/*right colum end */}
        </div>

        {/** RElated products start */}
        <RelatedProducts products={products} />
        {/** RElated products start */}
        </Wrapper>
        <DeliveryType />

    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const products = await fetchDataFromAPI("/api/products?populate=*");

  const paths = products?.data?.map((p) => ({
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
  const products = await fetchDataFromAPI(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
    // Passed to the page component as props
    props: { product, products },
  };
}
