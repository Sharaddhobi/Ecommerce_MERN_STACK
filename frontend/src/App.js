import { useEffect } from "react";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import "./App.css";
// import logo from "./logo.svg";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
      const resData = await res.json();
      console.log(resData);
      dispatch(setDataProduct(resData));
    })();
  }, []);

  return (
    <>
      <ToastContainer />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
