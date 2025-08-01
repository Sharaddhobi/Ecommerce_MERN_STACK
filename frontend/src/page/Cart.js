import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";

const Cart = () => {
  //   const productCartItem = useSelector((state) => state.product.CartItem);
  const productCartItem = useSelector((state) => state.product.cartItem || []);

  console.log(productCartItem);
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  return (
    <>
      <div className="p-2 md:p-4 ">
        <h2 className="text-lg md:text-2xl  font-bold text-slate-600">
          Your Cart Items
        </h2>
        {productCartItem[0] && (
          <div className="my-4 flex  gap-5">
            {" "}
            <div className="w-1/2 max-6xl  ">
              {/* dISPLAY CART  */}
              {productCartItem.map((e1) => {
                return (
                  <CartProduct
                    key={e1._id}
                    id={e1._id}
                    name={e1.name}
                    image={e1.image}
                    category={e1.category}
                    qty={e1.qty}
                    total={e1.total}
                    price={e1.price}
                  />
                );
              })}
            </div>
            {/* Total card item */}
            <div className="w-full max-w-md bg-slate-100 ml-auto ">
              <h2 className="bg-blue-600 text-white p-2 text-lg rounded">
                Summary
              </h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total qty:</p>
                <p className="ml-auto w-32 font-bold">{totalQty} </p>
              </div>
              <div className=" flex w-full py-2 text-lg border-b">
                <p>Total price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500 ">₹</span>
                  {totalPrice}
                </p>
              </div>
              <button className="bg-red-500 w-full text-lg font-bold py-2 text-white">
                Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
