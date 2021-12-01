import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Button,
    CardHeader,
    CardBody
} from "reactstrap";
import HeaderPage from "./HeaderPage";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";

const CartDetailsPage = () => {
    // const [cartDetailsId, setCartDetailsId] = useState(0);
    const [cartDetails, setCartDetails] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    let [order, setOrder] = useState([]);
    const token = localStorage.getItem("UserTokenDetails");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    useEffect(() => {
        axios.get("http://localhost:40073/api/Cart/GetAll", {
            headers: headers
        })
            .then((res) => (setCartDetails(res.data.data)))
    }, [token])

    useEffect(() => {
        {
            cartDetails.map((cartDetails) => {
                console.log(order)
                // for (var i = 0; i < cartDetails.length; i++) {
                axios.get(("http://localhost:40073/api/Product/Get/" + cartDetails.productId),
                    { headers: headers }
                )
                    .then(res => { setProductDetails(res.data.data) })
                // }
            })
        }

    }, [cartDetails]);
    console.log("Cart", cartDetails);
    console.log("Product", productDetails);
    if (productDetails !== null && productDetails.length === 0 && productDetails === undefined) {
        { setOrder(order => [productDetails.title, ...order]) }
    } else {
        console.log("empty")
    }


    return (
        <div>
            <div>
                <HeaderPage />
            </div>
            <Button href="/ZeroDotOne/HomePage"><IoMdArrowRoundBack /></Button>
            <Row>
                <Col md="8" >
                    <CardHeader>
                        <CardBody>
                            <h4>Title</h4>
                        </CardBody>
                    </CardHeader>
                </Col>
                <Col md="4">
                    <CardHeader>
                        <h4>Total</h4>
                        <Button>Added to Delevery</Button>
                        {/* {productDetails.map((items) => {
                            <p>{items.title}</p>
                        })} */}
                        <p>{order}</p>
                    </CardHeader>
                </Col>
            </Row>

        </div >
    )
}

export default CartDetailsPage;