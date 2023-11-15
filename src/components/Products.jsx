import { faCheckCircle,faCircle, faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { checkProduct, deleteProduct, getProducts } from "../services/sevice";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [query,setQuery]=useState("")
  const navigate=useNavigate();
  const [state, setState] = useState({
    products:[],
    currentPage:1,
    pageSize:4,
    keyword:"",
    totalPages:0
  });
  useEffect(()=>{
    handleGetProducts(state.keyword,state.currentPage,state.pageSize);
  },[])

  const handleGetProducts=(keyword,page,size)=>{
    getProducts(keyword,page,size)
    .then((resp)=>{
      const totalElements=resp.headers['x-total-count'];
      let totalPages=Math.floor(totalElements/size);
      if(totalElements % size !=0) ++totalPages

      setState({...state,
        products:resp.data,
        keyword:keyword,
        currentPage:page,
        pageSize:size,
        totalPages:totalPages
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleDeleteProduct=(product)=>{
    deleteProduct(product)
    .then(()=>{
      const newProducts=state.products.filter(p=>p.id!=product.id)
      setState({...state,products:newProducts})

    })
   .catch((err)=>{
    console.log(err)
   })
  }

  const handleCheckProduct=(product)=>{
    checkProduct(product)
    .then(()=>{
      const newProducts=state.products.map(p=>{
        if(p.id==product.id){p.checked=!product.checked}
        return p
      })
      setState({...state,products:newProducts})

    })
    .catch((err)=>{
      console.log(err)
     })
   
  }

  const handleGoToPage=(page)=>{
    handleGetProducts(state.keyword,page,state.pageSize);
  }
  const handleSearch=(event)=>{
    event.preventDefault();
    handleGetProducts(query,1,state.pageSize)
  }
  return (
    <div className="p-1">
      <div className="row">
        <div className="col-md-6">
          <div className="card m-2">
          <div className="card-body">
              <form onSubmit={handleSearch}>
                <div className="row g-2">
                  <div className="col-auto">
                    <input value={query}
                    onChange={(e)=>setQuery(e.target.value)} className="form-control"/>
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-success"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card">
            
            <div className="card-body">
              <table className="table">
              <thead>
                <tr>
                  <th>Id</th><th>Name</th><th>Price</th><th>Checked</th><th>Delete</th><th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {
                 state.products.map(product=>(
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td><button onClick={()=>handleCheckProduct(product)} className="btn btn-outline-success">
                        <FontAwesomeIcon icon={product.checked?faCheckCircle:faCircle}></FontAwesomeIcon></button></td>
                      <td><button onClick={()=>handleDeleteProduct(product)} className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> </button></td>  
                      <td><button onClick={()=>navigate(`/editproduct/${product.id}`)} className="btn btn-outline-success"><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button></td>
                    </tr>
                  )
                  
                  )
                }
              </tbody>
            </table>
            <ul className="nav nav-pills">
              
              {
                  new Array(state.totalPages).fill(0).map((v,index)=>(
                    <li key={index}><button onClick={()=>handleGoToPage(index+1)} className={((index+1)==state.currentPage)?"btn btn-info ms-1":"btn btn-outline-info ms-1"} >{index+1}</button></li>
                  ))
                }
              

            </ul>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}
