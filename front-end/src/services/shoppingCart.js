import { getProductsById } from "./products";

let shoppingCart = [];

export function getShoppingCart() {
  return shoppingCart;
}

// export function addToShoppingCart(quantity, product_id) {
//   const product = getProductsById(product_id);
//   const item = {
//     quantity: quantity,
//     image: product.image,
//     description: product.description,
//     name: product.name,
//   };
//   shoppingCart.push(item);
// }
