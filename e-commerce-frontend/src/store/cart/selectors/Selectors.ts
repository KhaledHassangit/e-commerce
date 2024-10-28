import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@store/index"

const getCartTotalQuantity = createSelector(
    (state:RootState) => state.cart.items,
    (items)=>{
    const totalQuantity = Object.values(items).reduce(
        (accumulator, currentValue) => {
        return accumulator + currentValue
    },
        0
    )
    return totalQuantity
})



export {getCartTotalQuantity}
