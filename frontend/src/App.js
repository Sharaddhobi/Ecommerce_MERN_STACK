// import { useEffect } from "react";
import Header from "./component/Header";
import { BrowserRouter, Outlet, Route, Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./page/Home";
import Menu from "./page/Menu";
import About from "./page/About";
import Contect from "./page/Contect";
import Login from "./page/login";
import Newproduct from "./page/Newproduct";
import Signup from "./page/Signup";
import Cart from "./page/Cart";
import EditProduct from "./page/EditProduct";
// import "./App.css";
// import logo from "./logo.svg";
// import { setDataProduct } from "./redux/productSlide";
// import { useDispatch, useSelector } from "react-redux";

function App() {
  // const dispatch = useDispatch();
  // const productData = useSelector((state) => state.product);

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
  //     const resData = await res.json();
  //     console.log(resData);
  //     dispatch(setDataProduct(resData));
  //   })();
  // }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/menu/:filterby" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contect" element={<Contect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newproduct" element={<Newproduct />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
