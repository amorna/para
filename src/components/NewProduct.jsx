import { useState } from "react"
import { saveProduct } from "../services/sevice"

export default function NewProduct() {
  const [name,setName]=useState("")
  const [price,setPrice]=useState(0)
  const [checked,setChecked]=useState(false)
  const handleSaveProduct=(event)=>{
    event.preventDefault()
    let product={name,price,checked}
    saveProduct(product)
    .then((resp)=>{
      alert(JSON.stringify(resp.data))
    })
  }
  return (
    <div className="row p-1">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSaveProduct}>
              <div className="mb-3">
                <label  className="form-label">Name :</label>
                <input onChange={(e)=>setName(e.target.value)}
                value={name}
                type="text" className="form-control"/>
              </div>
              <div className="mb-3">
                <label  className="form-label">Price :</label>
                <input  onChange={(e)=>setPrice(Number(e.target.value))}
                value={price}
                type="text" className="form-control"/>
              </div>
              <div className="form-check">
                <input 
                 onChange={()=>setChecked(!checked)}
                 checked={checked}
                type="checkbox" className="form-check-input" />
                <label form="flexCheckChecked" className="form-check-label">checked</label>
              </div>
              <div className="align-self-end">
              <button className="btn btn-success ">Save</button>
    
              </div>
             

            </form>
          </div>
        </div>
      </div>
      
    </div>
  )
}
