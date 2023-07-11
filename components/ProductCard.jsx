import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getDiscountedPricePercentage } from "@/utils/helper";
import { MdFiberNew } from "react-icons/md";
import { GiRoundStar } from "react-icons/gi";

const ProductCard = ({ data: { attributes: p, id }, isNew }) => {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer "
    >
      <Image
        height={300}
        width={300}
        src={p.thumbnail.data.attributes.url}
        alt={`${p.slug} image`}
        className="w-full"
      />
      <div className="p-4 text-black/[0.9]">
      {isNew && (
        
        <MdFiberNew
        style={{
          color: "black",
          fontSize: 30,
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
        }}
        />
        )}

        <h2 className="text-sm md:text-lg font-medium leading-tight">{p.name}</h2>
        <div className="flex  items-center text-black/[0.5]">
          <p className=" mr-2 text-sm md:text-lg font-semibold ">&#8377;{p.price}</p>
          {p.original_price && (
            <>
              <p className="text-sm md:text-base hidden md:block font-medium line-through">
                &#8377;{p.original_price}
              </p>
              <p className=" ml-auto text-sm md:text-base font-medium text-green-500 ">
                {getDiscountedPricePercentage(p.original_price, p.price)}% off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
