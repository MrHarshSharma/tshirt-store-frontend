import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getDiscountedPricePercentage } from "@/utils/helper";
import { HiPencil, HiArchiveBoxXMark } from "react-icons/hi2";

const ProductCardList = ({ data: { attributes: p, id }, checkdeleteProduct }) => {

  return (
     <li className="flex gap-x-6 py-5 w-full justify-between items-center ">
      <div className="flex gap-x-4">
        <img className="h-12 w-12 flex-none rounded-sm bg-gray-50" src={p?.thumbnail?.data?.attributes?.url} alt={`${p?.slug} image`} />
        <div className="min-w-0 flex flex-col md:items-center md:gap-5  sm:flex-row sm:gap-0">
          <p className="text-sm font-semibold etxt-base leading-6 text-gray-900">{p.name}</p>
          <p className=" truncate text-base leading-5 text-gray-500">  &#8377;{p.price}</p>
          <p className="text-base font-medium line-through">
                &#8377;{p?.original_price}
              </p>

          <p className="text-base text-green-500 ">
          {getDiscountedPricePercentage(p.original_price, p.price)}% off
        </p>
        </div>
        </div>
        <div className="flex gap-4 items-center">
        <div className="hidden sm:flex sm:flex-row sm:items-end gap-1">
        {p?.categories?.data?.map((category, i) =>{
          return(
            <span key={i} className="text-sm rounded-full bg-slate-200 px-3 flex items-center justify-center leading-6 text-gray-900">{category?.attributes?.name}</span>
            )
          })}
          </div>
          <Link
      href={`/dashboard/editproduct/${p?.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer "
    >
    <HiPencil className="hover:cursor-pointer"/>
    </Link>
           <HiArchiveBoxXMark className="hover:cursor-pointer" onClick={()=>checkdeleteProduct(id)}/>
        </div>
        
    </li>
    
  );
};

export default ProductCardList;
