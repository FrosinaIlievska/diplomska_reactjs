// ACTIONS
// addToCart
export const addToCart = (id, count, priceSelected) => (
    {
      type: 'ADD_TO_CART',
      id,
      count,
      priceSelected,
    }
  );
  
  // removeFromCart
 export const removeFromCart = (id) => (
    {
      type: 'REMOVE_FROM_CART',
      id,
    }
  );
  
  // updateCartItem
  export const updateCartItem = (id, count, priceSelected) => (
    {
      type: 'UPDATE_CART_ITEM',
      id,
      count,
      priceSelected
    }
  );
  
  // removeStockItem
  export const removeStockItem = (id, count) => (
    {
      type: 'REMOVE_STOCK_ITEM',
      id,
      count,
    }
  );

