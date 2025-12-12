import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setDataProduct } from "../redux/productSlide";
import { ImagetoBase64 } from "../utility/Imagetobase64";
import { BiCloudUpload } from "react-icons/bi";

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [data, setdata] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/product/${id}`
      );
      const resData = await res.json();
      // console.log("old", resData.data.image)
      if (resData.success) {
        setdata({
          name: resData.data.name,
          category: resData.data.category,
          price: resData.data.price,
          description: resData.data.description,
          image: resData.data.image,
        });
        // setImage(resData.data.image);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data);
    setdata((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };
  const handleOnChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name: data.name,
      category: data.category,
      price: data.price,
      description: data.description,
      image: data.image,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/product/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      const fetchRes = await response.json();

      if (fetchRes.type === "error") {
        toast(fetchRes.message);
      } else {
        toast(fetchRes.message);
        dispatch(setDataProduct([]));
        navigate("/", { state: { cameFromMenu: true } });
        // Reset the form data
        setdata({
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        });
      }
    } catch (error) {
      toast("Error during  request");
    }
  };
  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />
        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1  my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"other"}>select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"Icream"}>Icream</option>
          <option value={"Dosa"}>Dosa</option>
          <option value={"Piza"}>Piza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"Panner"}>Panner</option>
          <option value={"Sandwich"}>Sandwich</option>
        </select>
        <label html="image">
          Image
          <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl">
                {" "}
                <BiCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label html="price" className="my-1">
          {" "}
          Price
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />
        <lable htmlFor="description">Description</lable>
        <textarea
          ROWS={2}
          value={data.description}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleOnChange}
        ></textarea>
        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">
          UPDATE
        </button>
      </form>
    </div>
  );
};
export default EditProduct;
