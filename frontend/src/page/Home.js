import React, { useEffect, useRef, useState } from "react";
import HomeCard from "../component/HomeCard";
import { useDispatch, useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import HomeImg from "../assets/vender.png";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";
import { Link, useNavigate } from "react-router-dom";
import { setDataProduct } from "../redux/productSlide";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector((state) => state.product.productList);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/product`
        );
        const resData = await res.json();
        dispatch(setDataProduct(resData));
      } catch (error) {
        toast("Error during  request");
      }
    };

    fetchProducts();
    const cameFromMenu = navigate?.location?.state?.cameFromMenu;

    if (cameFromMenu) {
      fetchProducts();
    }
  }, [dispatch, navigate]);

  // console.log(productData);
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (e1) => e1.category === "vegetable",
    []
  );
  // console.log(homeProductCartListVegetables);
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };
  const [categoryList, setCategoryList] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    const categories = [...new Set(productData.map((item) => item.category))];
    setCategoryList(categories);
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    const filtered = productData.filter((e1) => e1.category === category);
    setDataFilter(filtered);
  };

  //filterData display

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className=" md:w-1/2 ">
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fasted Delivery in
            <span className="text-red-700 text">Your Home</span>
          </h2>
          <p className="py-3 text-base   ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.{" "}
          </p>
          <Link to="/cart">
            <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
              Order now
            </button>
          </Link>
        </div>

        <div className="md:w-1/2  ">
          {/* <div className="md:w-1/2  flex flex-wrap gap-5 p-4 justify-center"> */}
          <img
            src={HomeImg}
            alt="home"
            className="h-[500px] w-full resize rounded-full"
          />
          {/* {homeProductCartList[0]
            ? homeProductCartList.map((e1) => {
                return (
                  <HomeCard
                    key={e1.id}
                    image={e1.image}
                    name={e1.name}
                    price={e1.price}
                    category={e1.category}
                  />
                );
              })
            : loadingArray.map((e1, index) => {
                return <HomeCard key={index+"loading"} loading={"Loading..."} />;
              })} */}
        </div>
      </div>
      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-600 mb-4 ">
            Fresh Vegetable
          </h2>
          <div className="ml-auto  flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((e1) => {
                return (
                  <CardFeature
                    key={e1._id + "vegetable"}
                    id={e1._id}
                    name={e1.name}
                    category={e1.category}
                    price={e1.price}
                    image={e1.image}
                  />
                );
              })
            : loadingArrayFeature.map((e1, index) => (
                <CardFeature loading="Loading..." key={index + "cartloading"} />
              ))}
        </div>
      </div>

      <div className="my-5">
        <h2 className="font-bold text-2xl text-slate-800 mb-4 ">
          Your product
        </h2>

        <div className="flex gap-4 justify-center overflow-scroll scrollbar-non">
          {categoryList[0] &&
            categoryList.map((e1) => {
              return (
                <FilterProduct
                  category={e1}
                  onClick={() => handleFilterProduct(e1)}
                />
              );
            })}
        </div>
        <div className="flex flex-wrap justify-center gap-4 my-4">
          {dataFilter.map((e1) => {
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
          })}
        </div>
      </div>

      <AllProduct heading={"Your product"} />
    </div>
  );
};

export default Home;
