"use client";

export default function AddToCartBtn({ id }) {

  function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if(cart===null){
      cart=new Array();
    }
    cart.push(id);
    localStorage.setItem("cart",JSON.stringify(cart));
  };

  return (
    <button onClick={addToCart} className="bg-white p-2">
      Add to Cart
    </button>
  );
}