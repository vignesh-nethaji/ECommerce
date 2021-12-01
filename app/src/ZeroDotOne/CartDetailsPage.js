import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Button,
    CardHeader,
    CardBody,
    CardText
} from "reactstrap";
import HeaderPage from "./HeaderPage";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ImLocation2 } from "react-icons/im"

const CartDetailsPage = () => {
    const [productDetails, setProductDetails] = useState([]);
    let total = 0;
    const token = localStorage.getItem("UserTokenDetails");
    const userId = localStorage.getItem("UserIdDetails");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    useEffect(() => {
        axios.get(("http://localhost:40073/api/Cart/GetProducts/" + userId),
            { headers: headers }
        )
            .then(res => { setProductDetails(res.data.data) })
    }, [userId, headers]);

    return (
        <div>
            <div>
                <HeaderPage />
            </div>
            <Button href="/ZeroDotOne/HomePage"><IoMdArrowRoundBack /></Button>
            <Row>
                <Col md="8" >
                    <CardHeader className="CartPageCard">
                        <CardBody>
                            <Row>
                                <Col md="6">
                                    <h5>My Cart ({productDetails.length})</h5>
                                </Col>
                                <Col md="6">
                                    <Row>
                                        <Col md="6" className="modal-footer"><ImLocation2 /></Col>
                                        <Col md="6" className="mt-3"><p>Deliver to</p></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr />
                            {productDetails.map((items, i) =>
                                <div key={i}>
                                    <Row className="mt-3">
                                        <Col md="3" className="mt-5"> <img src={"https://via.placeholder.com/100/" + items.image + "/placeholder.com/"}></img></Col>
                                        <Col md="5">
                                            <b>{items.title}</b>
                                            <p className="text-justify">{items.description}</p>
                                            <CardText tag="h5"> $ {items.price}{" "}<s> ${items.price + 199}</s></CardText>
                                            <p style={{ display: "none" }}>{total = total + items.price}</p>
                                        </Col>
                                        <Col md="4">
                                            <h6>Delivery by Sun Dec 5 | Free₹40</h6>
                                            <p>7 Days Replacement Policy</p>
                                            <p>Pickup charge ₹100</p>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                            <Button className="CartPlaceOrder"><h5>PLACE ORDER</h5></Button>
                        </CardBody>
                    </CardHeader>
                </Col>
                <Col md="4">
                    <CardHeader>
                        <h6 className="mt-2">PRICE DETAILS</h6>
                        <hr />
                        <Row>
                            <Col md="6">Price ({productDetails.length} items)</Col>
                            <Col md="6">$ {total + 199}</Col>
                        </Row >
                        <br />
                        <Row>
                            <Col md="6">Discount</Col>
                            <Col md="6">$ 199</Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">Exchange Value (0 item)</Col>
                            <Col md="6">$ 0</Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">Delivery Charges</Col>
                            <Col md="6">$ 100</Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">Pickup Charges</Col>
                            <Col md="6"> $ 0</Col>
                        </Row>
                        <br />
                        <Row className="dotted">
                            <Col md="6">Total Amount</Col>
                            <Col md="6">{total}</Col>
                        </Row>
                    </CardHeader>
                </Col>
            </Row>

        </div >
    )
}

export default CartDetailsPage;