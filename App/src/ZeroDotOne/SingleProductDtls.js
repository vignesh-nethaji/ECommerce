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
    return (
        <Card >
            <Row>
                <Col md="6">
                    <CardBody className="mt-3 text-justify">
                        <img src={"https://via.placeholder.com/250/" + singleProduct.image + "/placeholder.com/"} style={{ width: "100%" }}></img>
                        <Button value={singleProduct.id} onClick={() => AddToCart(singleProduct.id)} className="CartPlaceOrder btn btn-secondary"><h5>Add To Cart</h5></Button>
                    </CardBody>
                </Col>
                <Col md="6" >
                    <CardBody className="mt-3 text-justify">

                        <h5 className="mt-3">{singleProduct.title}</h5>
                        <CardText>{singleProduct.description}</CardText>
                        <CardText tag="h5"> $ {singleProduct.price}{" "}<s> ${singleProduct.price + 199}</s></CardText>
                        <br /> <h5>Available offers</h5>
                        <p><strong> Special Price </strong> Get extra 10% off (price inclusive of discount)T&C</p>
                        <p><strong>Bank Offer </strong> Flat ₹100 off on first ZDO Pay Later order of ₹500 and aboveT&C</p>
                        <p><strong> Bank Offer</strong> 5% Unlimited Cashback on ZDO Axis Bank Credit CardT&C</p>
                        <p><strong>Bank Offer</strong> 20% off on 1st txn with Amex Network Cards issued by ICICI Bank,IndusInd Bank,SBI Cards and MobikwikT&C</p>
                        <p><strong>Partner Offer</strong> Wishlist Now, Get ₹50 Off, during EOSS Sale</p>
                    </CardBody>
                </Col>
            </Row>
        </Card>

    )

}

export default SingleProductDtls;
