import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onClick, isActive }) => {
  //   console.log(category);
  return (
    <div onClick={onClick}>
      <div
        className={`text-xl md:text-3xl p-3 md:p-5 rounded-full hover:cursor-pointer ${
          isActive ? "bg-yellow-800" : "bg-yellow-300"
        }`}
      >
        <CiForkAndKnife />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
