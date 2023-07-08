import DeliveryType from "@/components/DeliveryType";
import HeroBanner from "@/components/HeroBanner";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromAPI } from "@/utils/api";


export default function Home({products}) {

  return (
    <main className="">
      <HeroBanner />
  
      <Wrapper>
        {/* heasding and paragraph start  */}

        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px] ">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight ">
          Step into Style and Comfort
          </div>
          <div className="text-md md:text-xl">
          Unleash Your Style with Trendsetter Tees!
          </div>
        </div>

        {/* heasding and paragraph end */}

        {/* product grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 my-14 px-5 md:px-0 ">
        {products?.data?.map((product, count)=>{
          if(count < 4){
          return(

              <ProductCard key={product?.id} data={product} isNew={true} />
              )
            }
        })}
        </div>
        {/* product grid end */}

        {/* free delivery container*/}
        <DeliveryType />
      </Wrapper>
    </main>
  );
}


export async function getStaticProps(context) {
     const products = await fetchDataFromAPI('/api/products?populate=*')
  return {
    props: {products}, 
  }
}