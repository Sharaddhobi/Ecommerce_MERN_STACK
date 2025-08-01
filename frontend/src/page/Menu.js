import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCardItem, setDataProduct } from "../redux/productSlide";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
const Menu = () => {
  const { filterby } = useParams();
  const productData = useSelector((state) => state.product.productList);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Find product by ID
  const productDisplay = productData.find((e1) => e1._id === filterby);
  const productadminEmails = JSON.parse(process.env.REACT_APP_ADMIN_EMAIL);
  const userData = useSelector((state) => state.user);

  // ✅ If no product found, show message
  if (!productDisplay) {
    return (
      <div className="p-4  text-center text-red-500">
        Product not found or still loading...
      </div>
    );
  }
  const handleAddCardProduct = (e) => {
    dispatch(addCardItem(productDisplay));
  };

  const handelEdit = async (e) => {
    let id = e;
    navigate(`/product/edit/${id}`);
  };
  const handelDelete = async (e) => {
    let productId = e;
    console.log(productId);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/product/delete/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Optional: If you expect a JSON response
      const result = await response.json();
      console.log(result);

      // const dataRes = response.data.message;
      if (result.type === "success") {
        toast(result.message);

        dispatch(setDataProduct([]));
        navigate("/", { state: { cameFromMenu: true } });
      } else {
        toast(result.message);
      }
      // console.log(dataRes);
    } catch (error) {
      toast("Error during  request");
      // console.error(error);
    }
  };
  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    console.log(productDisplay);
    handelDelete(productDisplay?._id);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  // ✅ If found, show product details
  return (
    <div className="p-2 md:p-4">
      <div className=" 	w-full   m-auto md:flex bg-white">
        <div className="max-w-sm w-full gap-7  flex flex-row items-center justify-between  p-5">
          <img
            src={productDisplay.image}
            alt={productDisplay.name}
            className="hover:scale-105 transition-all"
          />
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
                {productDisplay?.name}
              </h3>
              {/* <Button label="Top" icon="pi pi-arrow-down" onClick={  confirm('top')} className="p-button-warning" style={{ minWidth: '10rem' }} /> */}
              {productadminEmails.includes(userData.email) && (
                <>
                  <div className="flex mx-6 flex-row items-center justify-between">
                    <div className="p-2 bg-red-200 cursor-pointer rounded-md">
                      <h2 onClick={handleDeleteClick}>
                        <MdDeleteOutline
                          color="red"
                          className="font-bold text-xl"
                        />
                      </h2>
                    </div>
                    <div className="p-2 ml-6 bg-green-200 cursor-pointer rounded-md">
                      <h2 onClick={() => handelEdit(productDisplay?._id)}>
                        <FaRegEdit
                          color="black"
                          className="font-bold text-xl"
                        />
                      </h2>
                    </div>
                  </div>
                </>
              )}
              {showConfirmation && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="bg-white p-4 rounded shadow-md">
                    <p className="mb-4">
                      Are you sure you want to delete this item?
                    </p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={handleConfirmDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Yes
                      </button>
                      <button
                        onClick={handleCancelDelete}
                        className="px-4 py-2 bg-gray-300 rounded"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-slate-500 font-medium text-2xl">
              {productDisplay.category}
            </p>
            <p className="md:text-2xl font-bold">
              <span className="text-red-500">₹</span>
              <span>{productDisplay.price}</span>
            </p>
            <div className="flex gap-3">
              <button className="bg-yellow-500 py-1 mt-2 px-4 rounded hover:bg-yellow-600 min-w-[100px]">
                Buy
              </button>
              <button
                onClick={handleAddCardProduct}
                className="bg-yellow-500 py-1 mt-2 px-4 rounded hover:bg-yellow-600 min-w-[100px]"
              >
                Add Cart
              </button>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Description :</p>
              <p>{productDisplay.description}</p>
            </div>
          </div>
        </div>
      </div>
      <AllProduct heading={"Related product "} />
    </div>
  );
};

export default Menu;
