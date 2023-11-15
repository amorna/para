import { BrowserRouter, Route, Routes,Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";

function App() {
  const [currentRoute,setCurrentRoute]=useState();
  useEffect(()=>{
    const path=window.location.pathname.toLocaleLowerCase();
    // console.log(path)
    setCurrentRoute(path.slice(1,path.length))
   // console.log(currentRoute)
  },[currentRoute])
  return (
    <>
       <BrowserRouter>
       <nav className="m-1 p-1 border border-info">
       <ul className="nav nav-pills">
          <li>
            <Link onClick={()=>setCurrentRoute("home")}
            className={currentRoute=='home'?"btn btn-info ms-1":"btn btn-outline-info ms-1"} to={"/home"}>Home</Link>
          </li>
          
          <li>
           
            <Link onClick={()=>setCurrentRoute("products")}
             className={currentRoute=='products'?"btn btn-info ms-1":"btn btn-outline-info ms-1"} to={"/products"}>Products</Link>
          </li>
          <li>
           
            <Link onClick={()=>setCurrentRoute("newProduct")}
             className={currentRoute=='newProduct'?"btn btn-info ms-1":"btn btn-outline-info ms-1"} to={"/newproduct"}>NewProduct</Link>
          </li>
        </ul>
      </nav> 
     
     

        <Routes>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/newproduct" element={<NewProduct/> }></Route>
          <Route path="/editproduct/:id" element={<EditProduct/> }></Route>
        </Routes>
        
      </BrowserRouter> 
      </>
  );
}

export default App;
