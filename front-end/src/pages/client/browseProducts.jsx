import React, { Component } from "react";
import ProductList from "../../components/client/products/productList";
import Purchase from "../../components/client/products/purchase";

const Products = ({
  products,
  onPurchase,
  productPurchasing,
  ifPurchasing,
  onCancelPurchase,
  onMakePurchase,
  shoppingCartItems,
}) => {
  return (
    <div>
      <ProductList products={products} onPurchase={onPurchase} />
      <Purchase
        product={productPurchasing}
        ifPurchasing={ifPurchasing}
        onCancelPurchase={onCancelPurchase}
        onMakePurchase={onMakePurchase}
        shoppingCartItems={shoppingCartItems}
      />
    </div>
  );
};

export default Products;
