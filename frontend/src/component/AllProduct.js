import React, { useEffect, useState } from "react";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import { useSelector } from "react-redux";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);

  const categoryList = [...new Set(productData.map((e1) => e1.category))];
  //filterData display
  const [Filterby, setDataFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setDataFilter(category);
    const filter = productData.filter(
      (e1) => e1.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };
  const loadingArrayFeature = new Array(10).fill(null);
  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4 ">{heading}</h2>

      <div className="flex gap-4 justify-center overflow-scroll scrollbar-non">
        {categoryList[0] ? (
          categoryList.map((e1) => {
            return (
              <FilterProduct
                category={e1}
                isActive={e1.toLowerCase() === Filterby.toLowerCase()}
                key={e1}
                onClick={() => handleFilterProduct(e1)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0]
          ? dataFilter.map((e1) => {
              return (
                <CardFeature
                  key={e1._id}
                  id={e1._id}
                  image={e1.image}
                  name={e1.name}
                  category={e1.category}
                  price={e1.price}
                />
              );
            })
          : loadingArrayFeature.map((e1, index) => (
              <CardFeature loading="Loading..." key={index + "allproduct"} />
            ))}
      </div>
    </div>
  );
};

export default AllProduct;
