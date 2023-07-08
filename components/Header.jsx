import Link from "next/link";
import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import Wrapper from "./Wrapper";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight, BiUserPlus } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromAPI } from "@/utils/api";
import { useSelector } from "react-redux";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
const Header = () => {
  
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);

  const controlNavBar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }

    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);
    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, [lastScrollY]);

  const {data:session} = useSession();

  useEffect(()  => {
    fetchCategories();


  }, []);

  const fetchCategories = async () => {
    const { data } = await fetchDataFromAPI("/api/categories?populate=*");
    setCategories(data);
  };


  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="flex h-[60px] justify-between items-center">
        <Link href="/">
          <img src="/logo.svg" className="w-[20px] md:w-[50px]" />
        </Link>
        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
          session={session}
        />
        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
            session={session}
          />
        )}
        <div className="flex items-center gap-2 text-black">
          {/*Heart icon start */}

          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
            {/*<div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 mg:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px] ">
              51
        </div>*/}
          </div>
          {/*Heart icon end */}

          {/*cart icon start */}
          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 mg:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px] ">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>
          {/*cart icon end */}

           {/*login icon start */}
           <div>
           <div className="flex justify-center items-center  cursor-pointer relative">
                <div className="border cursor-pointer px-0 pr-[4px] rounded-full hover:bg-black/[0.05]">
                <div className="flex items-center gap-2">
                {session?(
                  <React.Fragment>
                  <img className="rounded-full " alt="userImg" height={25} width={25} src={session.user.image} />
                    <span onClick={()=>signOut()}>Sign Out</span>
                  </React.Fragment>
                  ):(
                    
                    <React.Fragment>
                    <BiUserPlus className="text-[24px] p-1 bg-slate-400 rounded-full " />
                    <span onClick={()=>signIn()}>Sign In</span>
                  </React.Fragment>
                    )}
                    </div>
                </div>
          
           </div>
         </div>
         {/*login  icon end */}

          {/* Mobile icon start */}

          <div className="-mr-2 w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile icon end */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
