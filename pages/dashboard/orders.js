import DashboardLayout from "@/components/DashboardLayout";
import NoDataPresent from "@/components/NoDataPresent";
import { fetchDataFromAPI } from "@/utils/api";
import React from "react";
import { BiShoppingBag } from "react-icons/bi";
import { TiTimes } from "react-icons/ti";
const orders = ({ AllOrders }) => {
  return (
    <DashboardLayout>
    {AllOrders?.data?.length == 0 && (
       <NoDataPresent message="No Orders Available" />
    )}
      <div>
        {AllOrders?.data?.map((order) => (
          <div>
            {order?.attributes?.products.map((pro) => (
              <div className="flex z-[-1] items-center relative justify-around border-gray-400 border-[0.8px] rounded-md px-5 pt-10 pb-5 m-3 gap-2">
                <span
                  className='flex items-center gap-1 absolute top-0 left-0 '
                >
                  {" "}
                  <BiShoppingBag fontSize={25} /> {order.id}
                </span>

                <img
                  src={pro.attributes.thumbnail.data.attributes.url}
                  width={100}
                  height={100}
                  className="rounded-md"
                  alt="product image"
                />

                <span className="flex items-center gap-1"><b className="text-green-500">{pro.attributes.name}</b><TiTimes />{" "}
                {` ${pro.quantity}`}</span>

                <div className="flex flex-col ">
                  <span className="flex text-center">
                    {`Price: Rs ${pro.oneQuantityPrice}`}
                  </span>

                  <span>{`Total value: Rs ${
                    pro.oneQuantityPrice * pro.quantity
                  }`}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default orders;

export async function getStaticProps(context) {
  const AllOrders = await fetchDataFromAPI("/api/orders?populate=*");

  return {
    props: { AllOrders },
  };
}
