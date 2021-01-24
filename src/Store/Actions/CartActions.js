export const addToCart = (title,price,author) =>{
    return{
        type:'ADD_TO_CART',
        payload:{
            title:title,
            price:price,
            author:author
        }
    }
}

export const removeFromCart = (id) =>{
    return{
        type:'REMOVE_FROM_CART',
        payload:{
            id:id
        }
    }
}