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

        <Row>
            <Col md="6">
                <Card >
                    <CardBody className="mt-3 text-justify">
                        <img src={"https://via.placeholder.com/250/" + singleProduct.image + "/placeholder.com/"}></img>
                        <button value={singleProduct.id} onClick={() => AddToCart(singleProduct.id)} className="CartPlaceOrder btn btn-secondary"><h5>Add To Cart</h5></button>
                    </CardBody>
                </Card>
            </Col>
            <Col md="6" >
                <Card className="homecard">
                    <CardBody className="mt-3 text-justify">

                        <h5 className="mt-3">{singleProduct.title}</h5>
                        <CardText>{singleProduct.description}</CardText>
                        <CardText tag="h5"> $ {singleProduct.price}{" "}<s> ${singleProduct.price + 199}</s></CardText>

                    </CardBody>
                    {/* <h1><center>Available Offers</center></h1> */}

                </Card>
            </Col>
        </Row>

    )

}

export default SingleProductDtls;
