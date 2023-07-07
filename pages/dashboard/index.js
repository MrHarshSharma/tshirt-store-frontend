import DashboardLayout from "@/components/DashboardLayout";
import ProductCardList from "@/components/ProductCardList";
import { fetchDataFromAPI } from "@/utils/api";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {HiCurrencyRupee} from 'react-icons/hi2';



const Dashboard = ({ AllOrders, AllProducts, session }) => {

const [stats, setStats] = useState([
  { id: 1, name: 'Revenue', value: '' },
  { id: 2, name: 'Total Assets', value: AllProducts.length},
  { id: 3, name: 'New users annually', value: '46,000' },
])
  
console.log(session)

  useEffect(()=>{
    let TotalSales = 0;
    const CalculateTotalSalePrice = () =>{
      AllOrders.forEach((soldProduct)=>{
        soldProduct.attributes.products.forEach((price)=>{
          TotalSales = TotalSales + price.attributes.price
          
        })
      })

      stats[0].value = "₹ "+ TotalSales
      setStats(stats)
    } 

    CalculateTotalSalePrice()
  },[])
  return (
    <DashboardLayout>
    <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.id} className=" flex  flex-col gap-y-4 shadow-lg rounded-lg overflow-hidden hover:shadow-md hover:scale-105  transition-all cursor-pointer  ">
            <dt className="text-base leading-7 text-gray-600 mt-3">{stat.name}</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              {stat.value}
            </dd>
            <div className="bg-gray-900 py-2 ">
              <span className="text-gray-100 ">View all</span>
            </div>
          </div>
        ))}
      </dl>
    </div>
  </div>
  
    </DashboardLayout>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  const AllOrders = await fetchDataFromAPI(`/api/orders`);

  const AllProducts = await fetchDataFromAPI(`/api/products`);
  const session  = await getSession(context);

  if(!session || session.user.email != process.env.NEXT_PUBLIC_EMAIL_ADMIN){
    return{
      redirect:{
        destination:'/login'
      }
    }
  }
  return {
    // Passed to the page component as props
    props: { AllOrders : AllOrders.data, AllProducts: AllProducts.data, session },
  };
}