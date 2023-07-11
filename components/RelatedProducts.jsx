import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from './ProductCard';

const RelatedProducts = ({products}) => {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1023, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 767, min: 0 },
          items: 2
        }
      };

  return (
    <div className='mt-[50px] md:mt-[100px] md:mb-0 '>
        <div className='text-2xl font-bold mb-5'>You Might Also Like</div>
        <Carousel 
            responsive={responsive} 
            containerClass="-mx-[10px]"
            itemClass='px-[10px]'
        >
        {products?.data?.map((product)=>{
          return(
            <ProductCard key={product?.id} data={product} isNew={false} />
          )
        })}
          
        </Carousel>
    </div>
  )
}

export default RelatedProducts