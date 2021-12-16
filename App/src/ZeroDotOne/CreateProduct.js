import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import HeaderPage from "./HeaderPage";
import { Context } from "./ProductDetails";
import Swal from "sweetalert2";
import { IoMdArrowRoundBack } from "react-icons/io";


const CreateProduct = () => {

  const [category, setCategory] = useState([]);
  const [Singlecategory, setSingleCategory] = useState([]);
  const [addProduct, setAddProduct] = useState([]);

  const singleProdDtls = useContext(Context)

  var [ddlCategory, setDdlCategory] = useState(0);
  var [txtProduct, setTxtProduct] = useState("");
  var [txtPrice, setTxtPrice] = useState();
  var [txtDesc, setTxtDesc] = useState("");
  var [txtImg, setTxtImg] = useState("");
  var [prodId, setTxtId] = useState(0);

  const [on, setOnVal] = useState(false);
  const [off, setOffVal] = useState(false);


  const token = localStorage.getItem("UserTokenDetails")


  useEffect(() => {
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
    let product = txtProduct;
    let price = txtPrice;

    if (ddlCategory === "0" || ddlCategory == undefined || ddlCategory === 0) {
      alert("Please Select Category");
      return false;
    }

    else if (product == "") {
      alert("Please Enter Product Name");
      return false;
    }

    else if (price == "" || price == "0") {
      alert("Please Enter price");
      return false;
    }

    else if (txtDesc == "") {
      alert("Please Enter Product Description");
      return false;
    }

    else if (txtImg == "") {
      alert("Please Enter Image");
      return false;
    }
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
    setTxtPrice();
    setTxtDesc("");
    setTxtImg("");
    setTxtId(0);
  }
  const onlyAllowCharAndSpace = (e) => {
    var regex = new RegExp("^[a-zA-Z ]*$");
    if (regex.test(e)) {
      setTxtProduct(e);
      return true;
    }
    else {
      return false;
    }
  }
  const onlyAllowNumber = (e) => {
    var regex = new RegExp("^[0-9]*$");
    // var regex = new RegExp("^[0-9]*\.?[0-9]*$");
    if (regex.test(e)) {
      setTxtPrice(e);
      return true;
    }
    else {
      return false;
    }
  }

  return (

    <div>

      <div>
        {on ?
          <HeaderPage />
          : ''}
      </div>
      <Button href="../ZeroDotOne/ProductDetails"><IoMdArrowRoundBack /></Button>

      <div className="container-fluid login-3">
        <div className="container">
          <div className="login-form">
            <div className="row align-items-center">
              <div className="login-box">
                <form>
                  <div className="form-group">
                    <label id="lblCat">Category <span className="errorMsg">*</span></label>
                    <select className="form-control" onChange={e => setDdlCategory(e.target.value)}>
                      <option value="0">Select Category</option>

                      {off ?
                        <option selected={true} value={Singlecategory.id}>{Singlecategory.name}</option>

                        : category.map((catDetails, i) => {
                          return (
                            <option key={i} value={catDetails.id}>
                              {catDetails.name}
                            </option>
                          )
                        })
                      }
                    </select>
                  </div>

                  <div className="form-group">
                    <label id="lblProduct" >Product Name <span className="errorMsg">*</span></label>
                    <input value={txtProduct} maxLength={20} placeholder="Enter Product" className="form-control" onChange={e => onlyAllowCharAndSpace(e.target.value)} />
                    {/* onChange={e => setTxtProduct(e.target.value)} */}
                  </div>
                  <div className="form-group">
                    <label id="lblPrice"> Price <span className="errorMsg">*</span></label>
                    <input type="number" onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault()} value={txtPrice} placeholder="Enter Price" className="form-control" onChange={e => onlyAllowNumber(e.target.value)} />
                    {/* onChange={e => setTxtPrice(e.target.value)} */}
                  </div>
                  <div className="form-group">
                    <label id="lblDes">Product Description <span className="errorMsg">*</span></label>
                    <textarea value={txtDesc} placeholder="Enter Product Description" maxLength={100} className="form-control" onChange={e => setTxtDesc(e.target.value)} />

                  </div>
                  <div className="form-group">
                    <label id="lblImg">Image <span className="errorMsg">*</span></label>
                    <input value={txtImg} placeholder="Enter Image" className="form-control" onChange={e => setTxtImg(e.target.value)} />
                  </div>

                  <div className="form-group text-center">
                    {on ? <input type="button" value="Add Product" onClick={AddProduct} className="btn btn-primary"></input> : ''}{" "}
                    {/* {on ? <button onClick={AddProduct} className="btn btn-primary">Add Product</button> : ''}{" "} */}
                    {off ? <button onClick={UpdateProduct} className="btn btn-primary">Update Product</button> : ''}{" "}
                    <button color="danger" onClick={CancelProduct} className="btn btn-primary">Cancel</button>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CreateProduct;