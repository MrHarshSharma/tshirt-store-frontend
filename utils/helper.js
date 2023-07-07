export const getDiscountedPricePercentage = (original_price, discountedPrice) => {

    const discount = original_price - discountedPrice;;

    const discountedPercent= (discount/original_price)*100;

    return discountedPercent.toFixed(2)
    
}