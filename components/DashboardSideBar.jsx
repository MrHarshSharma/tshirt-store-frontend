import { forwardRef } from "react";
import Link from "next/link";
import { HiHome, HiShoppingBag, HiCreditCard } from "react-icons/hi";
import { useRouter } from "next/router";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className="pt-2 fixed w-56 h-full bg-white shadow-sm">
      

      <div className="flex flex-col">
      <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <img src="/logo.svg" className="w-[20px]"/>
            </div>
            <div>
              <p>Website</p>
            </div>
          </div>
        </Link>
        <Link href="/dashboard">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/dashboard"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <HiHome className="h-5 w-5" />
            </div>
            <div>
              <p>Home</p>
            </div>
          </div>
        </Link>
        <Link href="/dashboard/products">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname.includes('/dashboard/products') || router.pathname.includes('/editproduct') || router.pathname.includes('/addproduct')
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <HiShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <p>Products</p>
            </div>
          </div>
        </Link>
       
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;