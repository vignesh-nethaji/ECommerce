import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Button,
    Container,
    CardHeader,
    CardBody,
    CardText
} from "reactstrap";
import HeaderPage from "./HeaderPage";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ImLocation2 } from "react-icons/im"
import swal from "sweetalert";

const CartDetailsPage = () => {
    const [productDetails, setProductDetails] = useState([]);
    let total = 0;
    const token = localStorage.getItem("UserTokenDetails");
    const userId = localStorage.getItem("UserIdDetails");
    const [cartDetails, setCartDetails] = useState([])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const getallCartDetails = () => {
        axios.get(("http://localhost:40073/api/Cart/GetAll"),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then(res => { setCartDetails(res.data.data) })

    }


    useEffect(() => {
        axios.get(("http://localhost:40073/api/Cart/GetProducts/" + userId),
            { headers: headers }
        )
            .then(res => { setProductDetails(res.data.data) })
    }, [userId, headers]);
    const CartDetailsDelete = (id) => {
        if (window.confirm('Sure  U want to delete this Product?')) {

            axios.delete(("http://localhost:40073/api/Cart/Delete/" + id),
                { headers: { "Authorization": `Bearer ${token}` } }
            )
                .then(res => {
                    getallCartDetails();
                    swal({
                        title: "Done!",
                        text: "Product is deleted into a Cart",
                        icon: "success",
                        timer: 2000,
                        button: false
                    })
                    this.setState({ redirect: this.state.redirect === false });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <div>
            <div>
                <HeaderPage />
            </div>
            <Button href="/ZeroDotOne/HomePage"><IoMdArrowRoundBack /></Button>
            <Row>
                <Col md="8" sm="8" lg="8">
                    <CardHeader className="CartPageCard">
                        <CardBody>
                            <Row>
                                <Col md="6" sm="6" lg="6">
                                    <h5>My Cart ({productDetails.length})</h5>
                                    {localStorage.setItem("CartCount", productDetails.length)}
                                </Col>
                                <Col md="6" lg="6" sm="6">
                                    <Row>
                                        <Col md="6" lg="6" sm="2" className="modal-footer"><ImLocation2 /></Col>
                                        <Col md="6" lg="6" sm="10" className="mt-3"><p>Deliver to</p></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr />
                            {productDetails.map((items, i) =>
                                <div key={i}>
                                    <Row className="mt-3">
                                        <Col md="3" sm="3" lg="3" className="mt-1"> <img src={items.image} style={{ width: "200px", height: "200px" }}></img></Col>
                                        <Col md="5" sm="5" lg="5">
                                            <b>{items.title}</b>
                                            <p className="text-justify">{items.description}</p>
                                            <Row>
                                                <Col md='6' sm="6" lg="6"><CardText tag="h5"> $ {items.price}{" "}<s> ${items.price + 199}</s></CardText><p style={{ display: "none" }}>{total = total + items.price}</p></Col>
                                                <Col md='6' sm="6" lg="6"><a href="#" value={items.id} onClick={() => { CartDetailsDelete(items.id) }} >Delete</a></Col>
                                            </Row>
                                            <br /><br />
                                        </Col>
                                        <Col md="4" sm="4" lg="4">
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
                <Col md="4" sm="4" lg="4">
                    <CardHeader>
                        <h6 className="mt-2">PRICE DETAILS</h6>
                        <hr />
                        <Row>
                            <Col md="6">Price ({productDetails.length} items)</Col>
                            <Col md="6">$ {total + (productDetails.length * 199)}</Col>
                        </Row >
                        <br />
                        <Row>
                            <Col md="6">Discount</Col>
                            <Col md="6">$ {(productDetails.length * 199)}</Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6" sm="6" lg="6">Exchange Value (0 item)</Col>
                            <Col md="6" sm="6" lg="6">$ 0</Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6" sm="6" lg="6">Delivery Charges</Col>
                            <Col md="6" sm="6" lg="6">$ 100</Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6" sm="6" lg="6">Pickup Charges</Col>
                            <Col md="6" sm="6" lg="6"> $ 0</Col>
                        </Row>
                        <br />
                        <Row className="dotted">
                            <Col md="6">Total Amount</Col>
                            <Col md="6">{total + 100}</Col>
                        </Row>
                    </CardHeader>
                </Col>
            </Row>
        </div >
    )
}

export default CartDetailsPage;