import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import { BiGift } from "react-icons/bi";

const DeliveryType = () => {
  return (
    <div className="flex items-center justify-around py-3 mt-5 " style={{borderTop:'0.8px solid #d2d2d2'}}>
      <div className="flex items-center flex-col ">
        <BiGift fontSize={25} />
        <span className="text-gray-500 text-sm"> Free Shipping</span>
      </div>
      <div className="flex items-center flex-col">
        <TbReload fontSize={25} className=""/>
        <span className="text-gray-500 text-sm"> 30 Days Return</span>
      </div>
      <div className="flex items-center flex-col">
        <MdLocalShipping fontSize={30} />
        <span className="text-gray-500 text-sm"> Express Delivery</span>
      </div>
      
    </div>
  );
};

export default DeliveryType;
