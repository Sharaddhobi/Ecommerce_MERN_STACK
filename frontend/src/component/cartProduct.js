import React from "react";
import { CgMathPlus } from "react-icons/cg";
import { FiMinus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deletCartItem, increaseQty, decreaseQty } from "../redux/productSlide";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div
            className="curser-pointer text-slate-700 hover:text-red-500"
            onClick={() => dispatch(deletCartItem(id))}
          >
            <MdDelete />
          </div>
        </div>

        <p className="text-slate-500 font-medium text-2xl">{category}</p>
        <p className="md:text-2xl font-bold">
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>

        <div className="flex justify-between ">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => dispatch(increaseQty(id))}
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 "
            >
              <CgMathPlus />
            </button>

            <p className="font-semibold p-1 ">{qty}</p>
            <button
              onClick={() => dispatch(decreaseQty(id))}
              className="bg-slate-300 py-1 mt-2  rounded hover:bg-slate-400 p-1"
            >
              <FiMinus />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <p>Total :</p>
          <p>
            {" "}
            <span className="text-red-500">₹</span>
            {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
