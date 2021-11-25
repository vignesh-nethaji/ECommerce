import { useEffect, useState } from "react";
import { Input, Button, CardHeader, Label, Row, Col } from "reactstrap";
import axios from "axios";
import HeaderPage from "./HeaderPage";
import SidePage from "./SidePage";

const CreateProduct = () => {

  const [category, setCategory] = useState([]);
  const [addProduct, setAddProduct] = useState([]);

  var [ddlCategory, setDdlCategory] = useState(0);
  var [txtProduct, setTxtProduct] = useState("");
  var [txtPrice, setTxtPrice] = useState(0);
  var [txtDesc, setTxtDesc] = useState("");
  var [txtImg, setTxtImg] = useState(""); 

  const token = localStorage.getItem("UserTokenDetails")


  useEffect(() => {
    axios.get("http://localhost:40073/api/Category/GetAll", {

    })
      .then((res) => (res.data.data))
      .then((res) => (setCategory(res)))

  }, [])
  //console.log(category)

  const AddProduct = () => {
     const ProductDtls={
      "Id":0,
      "Title": txtProduct,
      "Price": parseFloat(txtPrice),
      "Description": txtDesc,
      "Image": txtImg,
      "CategoryId": parseInt(ddlCategory)
      // "category":{
      //   "id": 0,
      //   "name": "null",
      //   "product": [
      //     "null"
      //   ]
      // }
     }
     const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    console.log(JSON.stringify(headers));
    axios.post("http://localhost:40073/api/Product/Add", ProductDtls, {
      headers: headers
    })
      .then((res) => (res))
      .then((res) => (setAddProduct(res))) 
  }

  // const EditProduct=(id)=>{
  //     axios.get("http://localhost:40073/api/Product/Get"+id, {
  //         categoryId: 0,
  //         title: "",
  //         price: 0.0,
  //         description: "",
  //         image:"ff8cbf49"
  //     })
  //     .then((res) => (res))
  //     .then((res) => (setCategory(res)))
  // }


  // const UpdateProduct=(id)=>{
  //     axios.post("http://localhost:40073/api/Product/Update"+id, {
  //         categoryId: 0,
  //         title: "",
  //         price: 0.0,
  //         description: "",
  //         image:"ff8cbf49"
  //     })
  //     .then((res) => (res))
  //     .then((res) => (setCategory(res)))
  // }


  return (

    <div>
      <div>
        <HeaderPage />
      </div>
      <Row>
        <Col md="3" > <SidePage /></Col>
        <Col md="9" >
          <CardHeader className="">
            <div >
              <Label id="lblCat">Category</Label>
              <select className="form-control" onChange={e=>setDdlCategory(e.target.value)}>
                <option>Select Category</option>
                {category.map((catDetails,i) => {
                  return (
                    <option key={i} value={catDetails.id}>
                      {catDetails.name}
                    </option>
                  )
                })}
              </select>
              <br /><br />
              <Label id="lblProduct">Product Name</Label>
              <Input  value={txtProduct} className="form-control" onChange={e => setTxtProduct(e.target.value)} /><br /><br />

              <Label id="lblPrice"> Price</Label>
              <Input value={txtPrice} className="form-control" onChange={e=>setTxtPrice(e.target.value)} /><br /><br />

              <Label id="lblDes">Product Description</Label>
              <Input value={txtDesc} className="form-control" onChange={e=> setTxtDesc(e.target.value)}/><br /><br />

              <Label id="lblImg">Image</Label>
              <Input value={txtImg} className="form-control" onChange={e=>setTxtImg(e.target.value)} /><br /><br />

              <Button onClick={AddProduct} color="danger">Add Product</Button>{" "}
              <Button   color="danger">Cancel</Button>

            </div>

          </CardHeader>

        </Col>
      </Row>

    </div>
  )
}
export default CreateProduct;