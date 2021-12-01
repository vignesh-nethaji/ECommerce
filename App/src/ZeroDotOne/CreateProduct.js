import React, { useContext, useEffect, useState } from "react";
import { Input, Button, CardHeader, Label, Row, Col } from "reactstrap";
import axios from "axios";
import HeaderPage from "./HeaderPage";
import SidePage from "./SidePage";
import { Context } from "./ProductDetails";
// import ColorPicker from 'react-input-colorpicker';


const CreateProduct = () => {

  const [category, setCategory] = useState([]);
  const [Singlecategory, setSingleCategory] = useState([]);

  const [addProduct, setAddProduct] = useState([]);
  // const [editProductDtls, setEditproductDtls] = useState([])

  const singleProdDtls = useContext(Context)

  var [ddlCategory, setDdlCategory] = useState(0);
  var [txtProduct, setTxtProduct] = useState("");
  var [txtPrice, setTxtPrice] = useState(0);
  var [txtDesc, setTxtDesc] = useState("");
  var [txtImg, setTxtImg] = useState("");
  var [prodId, setTxtId] = useState(0);

  const [on, setOnVal] = useState(false);
  const [off, setOffVal] = useState(false);


  const token = localStorage.getItem("UserTokenDetails")


  useEffect(() => {
    debugger
    if (singleProdDtls !== null && singleProdDtls !== "" && singleProdDtls !== undefined) {

      setDdlCategory(singleProdDtls.categoryId);
      setTxtProduct(singleProdDtls.title);
      setTxtPrice(singleProdDtls.price);
      setTxtDesc(singleProdDtls.description);
      setTxtImg(singleProdDtls.image);
      setTxtId(singleProdDtls.id);

      axios.get("http://localhost:40073/api/Category/Get/" + singleProdDtls.categoryId, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => (res.data.data))
        .then((res) => (setSingleCategory(res)))
        .then((res) => (console.log("nathan nan", res)))
      setOffVal(true);

    }
    else {
      axios.get("http://localhost:40073/api/Category/GetAll", {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => (res.data.data))
        // .then(console.log("Single Product " + productId))
        .then((res) => (setCategory(res)))
      setOnVal(true);
    }
  }, [token])

  const AddProduct = () => {
    const ProductDtls = {
      "Id": 0,
      "Title": txtProduct,
      "Price": parseFloat(txtPrice),
      "Description": txtDesc,
      "Image": txtImg,
      "CategoryId": parseInt(ddlCategory)
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    // console.log(JSON.stringify(headers));
    axios.post("http://localhost:40073/api/Product/Add", ProductDtls, {
      headers: headers
    })
      .then((res) => (res))
      //.then((res) => (console.log(res)))
      .then((res) => (setAddProduct(res)))
    if (addProduct.status === 200 && addProduct.data.data.message === "product data Added") {
      alert("product data Added");
    }
  }
  console.log(addProduct);

  // const EditProductDtls = (productId) => {

  //   axios.get(("http://localhost:40073/api/Product/Get/" + productId),
  //     { headers: { "Authorization": `Bearer ${token}` } }
  //   )
  //     .then(res => { setEditproductDtls(res.data.data) })

  // }

  const UpdateProduct = () => {
    const edidProductDtls = {
      "Id": prodId,
      "Title": txtProduct,
      "Price": parseFloat(txtPrice),
      "Description": txtDesc,
      "Image": txtImg,
      "CategoryId": parseInt(ddlCategory)
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    axios.put("http://localhost:40073/api/Product/Update", edidProductDtls, {
      headers: headers
    })
      .then((res) => (res))
  }

  const CancelProduct = () => {
    setDdlCategory(0);
    setTxtProduct("");
    setTxtPrice(0);
    setTxtDesc("");
    setTxtImg("");
    setTxtId(0);
  }
  //   function changeHandler(colors) {
  //     console.log(colors);
  // }

  return (

    <div>

      <div>
        {on ?
          <HeaderPage />
          : ''}
      </div>
      <Row>
        {on ?
          <Col md="3" > <SidePage /></Col>
          : ''}
        <Col md="9" >
        <Button href="../ZeroDotOne/HomePage">Back</Button>
          <CardHeader className="">
            <div >
              <Label id="lblCat">Category</Label>
              <select className="form-control" onChange={e => setDdlCategory(e.target.value)}>
                <option>Select Category</option>

                {off ?
                  <option value={Singlecategory.id}>{Singlecategory.name}</option>

                  : category.map((catDetails, i) => {
                    return (
                      <option key={i} value={catDetails.id}>
                        {catDetails.name}
                      </option>
                    )
                  })
                }
              </select>


              <br /><br />
              <Label id="lblProduct">Product Name</Label>
              <Input value={txtProduct} className="form-control" onChange={e => setTxtProduct(e.target.value)} /><br /><br />

              <Label id="lblPrice"> Price</Label>
              <Input value={txtPrice} className="form-control" onChange={e => setTxtPrice(e.target.value)} /><br /><br />

              <Label id="lblDes">Product Description</Label>
              <Input value={txtDesc} className="form-control" onChange={e => setTxtDesc(e.target.value)} /><br /><br />

              <Label id="lblImg">Image</Label>
              <Input value={txtImg} className="form-control" onChange={e => setTxtImg(e.target.value)} /><br /><br />
              {/* <ColorPicker
                label='Color: '
                color={'#36c'}
                onChange={changeHandler}
                mode='RGB'
              /> */}

              {on ? <Button onClick={AddProduct} color="danger" >Add Product</Button> : ''}{" "}
              {off ? <Button onClick={UpdateProduct} color="danger" >Update Product</Button> : ''}{" "}
              <Button color="danger" onClick={CancelProduct} >Cancel</Button>{" "}
            </div>

          </CardHeader>
        </Col>
      </Row>
    </div>
  )
}
export default CreateProduct;