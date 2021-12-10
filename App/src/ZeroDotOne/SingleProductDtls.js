import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardText, Col, Row } from "reactstrap";
import Swal from "sweetalert2";

const SingleProductDtls = (props) => {

    const [singleProductDtls, setSingleProductDtls] = useState(props.details.id);
    const token = localStorage.getItem("UserTokenDetails");
    const [singleProduct, setSingleProduct] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        axios.get(("http://localhost:40073/api/Product/Get/" + singleProductDtls),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then(res => { setSingleProduct(res.data.data) })
    }, [token, singleProductDtls]);

    const AddToCart = (productId) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        const cartDtls = {
            "Id": 0,
            "Date": today,
            "Quantity": "1",
            "userId": parseInt(localStorage.getItem("UserIdDetails")),
            "productId": productId
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        axios.post("http://localhost:40073/api/Cart/Add", cartDtls, {
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
                    title: 'Product Add To Cart'
                });
            })
        GoCart();

    }
    const GoCart = () => {
        navigate("/ZeroDotOne/CartDetailsPage")
    }
    const buttons = document.querySelectorAll("button");
    const minValue = 0;
    const maxValue = 100;

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
          
            const element = event.currentTarget;
            
            const parent = element.parentNode;
           
            const numberContainer = parent.querySelector(".number");
            const number = parseFloat(numberContainer.textContent);
           
            const increment = parent.querySelector(".plus");
            const decrement = parent.querySelector(".minus");
          
            const newNumber = element.classList.contains("plus")
                ? number + 1
                : number - 1;
            numberContainer.textContent = newNumber;
            console.log(newNumber);
         
            if (newNumber === minValue) {
                decrement.disabled = true;
                numberContainer.classList.add("dim");
             
                element.blur();
            } else if (newNumber > minValue && newNumber < maxValue) {
                decrement.disabled = false;
                increment.disabled = false;
                numberContainer.classList.remove("dim");
            } else if (newNumber === maxValue) {
                increment.disabled = true;
                numberContainer.textContent = `${newNumber}+`;
                element.blur();
            }
        });
    });

    return (
        <div className="container mt-6 mb-6">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="images p-3">
                                    <div className="text-center p-4"> <img id="main-image" src={singleProduct.image} width="250" /> </div>
                                    <Button value={singleProduct.id} onClick={() => AddToCart(singleProduct.id)} className="CartPlaceOrder btn btn-secondary"><h5>Add To Cart</h5></Button>
                                    
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="product p-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center"> <i className="fa fa-long-arrow-left"></i> <span className="ml-1">{" "}</span> </div> <i className="fa fa-shopping-cart text-muted"></i>
                                    </div>
                                    <div className="mt-4 mb-3"> 
                                        <h5 className="text-uppercase">{singleProduct.title}</h5>
                                        <div className="price d-flex flex-row align-items-center"> <span className="act-price">${singleProduct.price}</span>{" "}
                                            <div className="ml-2"> <s> ${singleProduct.price + 199}</s> </div>
                                        </div>
                                    </div>
                                    <p className="about">{singleProduct.description}</p>
                                    
                                    <div className="input-row" />
                                    <div className="input" />
                                    <button className="minus" aria-label="Decrease by one" disabled />
                                    
                                    <line y1="1" x2="16" y2="1" stroke="#0064FE" strokeWidth="2" className="icon" />
                                    <div className="number dim">0</div>
                                    <button className="plus" aria-label="Increase by one" />
                                   
                                    <line x1="8" y1="4.37114e-08" x2="8" y2="16" stroke="#0064FE" strokeWidth="2" />
                                    <line y1="8" x2="16" y2="8" stroke="#0064FE" strokeWidth="2" />

                                    <div className="sizes mt-5">
                                       
                                        <br /> <h5>Available offers</h5>
                                        <p><strong> Special Price </strong> Get extra 10% off (price inclusive of discount)T&C</p>
                                        <p><strong>Bank Offer </strong> Flat ₹100 off on first ZDO Pay Later order of ₹500 and aboveT&C</p>
                                        <p><strong> Bank Offer</strong> 5% Unlimited Cashback on ZDO Axis Bank Credit CardT&C</p>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SingleProductDtls;
