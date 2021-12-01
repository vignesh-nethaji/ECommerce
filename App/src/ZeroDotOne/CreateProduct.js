import { useContext,useEffect, useState } from "react";
import { Input, Button, CardHeader,Label,Row,Col } from "reactstrap";
import axios from "axios";
import HeaderPage from "./HeaderPage";
import SidePage from "./SidePage";
import { Context } from "./ProductDetails";
import Swal from "sweetalert2";
// import ColorPicker from 'react-input-colorpicker';
import { SketchPicker } from 'react-color';



const CreateProduct = () => {

  const [category, setCategory] = useState([]);
  const [Singlecategory, setSingleCategory] = useState([]);
  var [colorHexCode, setColorHexCode] = useState('#000000');

  const [addProduct, setAddProduct] = useState([]);

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
      "Image": colorHexCode.substring(1),
      "CategoryId": parseInt(ddlCategory)
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    axios.post("http://localhost:40073/api/Product/Add", ProductDtls, {
      headers: headers
    })
      .then((res) => (setAddProduct(res)))
      .then(res => {
        var toastMixin = Swal.mixin({
          toast: true,
          icon: 'success',
          title: 'General Title',
          animation: false,
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        toastMixin.fire({
          animation: true,
          title: 'Product Added Successfully'
        });
        CancelProduct();
      })

  }

  const UpdateProduct = () => {
    const edidProductDtls = {
      "Id": prodId,
      "Title": txtProduct,
      "Price": parseFloat(txtPrice),
      "Description": txtDesc,
      "Image": colorHexCode.substring(1),
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
      .then(res => {
        var toastMixin = Swal.mixin({
          toast: true,
          icon: 'success',
          title: 'General Title',
          animation: false,
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });


        toastMixin.fire({
          animation: true,
          title: 'Product Updated Successfully'
        });
        CancelProduct();
      })
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
        <HeaderPage />
      </div>
      <Row>
        <Col md="3" > <SidePage /></Col>
        <Col md="9" >
        <Button href="../ZeroDotOne/HomePage">Back</Button>
          <CardHeader className="">
            <div >
              <Label id="lblCat">Category</Label>
              <select className="form-control" onChange={e => setDdlCategory(e.target.value)}>
                <option value={0}>Select Category</option>

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

                    <Label>Price</Label>
                    <Input className="form-control" /><br /><br />

              <Label id="lblImg">Image</Label>
              <Input readOnly value={colorHexCode} className="form-control" onChange={e => setTxtImg({colorHexCode})} /><br /><br />

              <SketchPicker
                color={colorHexCode}
                onChange={e => setColorHexCode(e.hex)} /><br/>

              {/* <br />
              <b>Selected Hex Color: </b>{colorHexCode} */}

                    <Button color="danger">Add Product</Button>
                </div>
                
            </CardHeader>
            </Col>
            </Row>
            
        </div>
    )
}
export default CreateProduct;