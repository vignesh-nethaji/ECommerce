import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardText,
    CardFooter,
    Button
} from "reactstrap";
import HeaderPage from "./HeaderPage";
import SidePage from "./SidePage";
import axios from "axios";
import SingleProductDtls from "./SingleProductDtls";
import { IoMdArrowRoundBack } from "react-icons/io";


const HomePage = () => {

    const [product, setProduct] = useState([]);
    const [detailsAddCart, setDetailsAddCart] = useState([]);
    const token = localStorage.getItem("UserTokenDetails");
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(false);

    useEffect(() => {

        GetAllProduct();

    }, [token])

    const GetAllProduct = () => {
        axios.get(("http://localhost:40073/api/Product/GetAll"),
            {
                headers: { "Authorization": `Bearer ${token}` }
            }
        )
            .then(res => { setProduct(res.data.data) })
    }

    const OnChangeCategory = () => {
        let Catid = localStorage.getItem("CategoryIds")
        if (Catid !== "0") {
            axios.get("http://localhost:40073/api/Product/GetProductByCategory/" + Catid, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })

                .then(res => { setProduct(res.data.data) })
        }
        else {
            axios.get(("http://localhost:40073/api/Product/GetAll"),
                { headers: { "Authorization": `Bearer ${token}` } }
            )
                .then(res => { setProduct(res.data.data) })
        }

    }

    const GetSingleProduct = (details) => {
        setDetailsAddCart(details)
        setOff(true);
        setOn(false);
    }
    const BacktoHome = () => {
        window.location.reload();
    }

    return (
        <div>
            <div>
                <HeaderPage />
                {/* clickMe={OnChangeCategory} */}
                {on ?
                    <Row>
                        {on ? <Col md="3" > <SidePage callback={OnChangeCategory} /></Col> : ''}
                        <Col md="9" >

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10, }}>
                                {product.map((postDetails, i) =>
                                    <div key={i} className="mt-5">
                                        <Col md="10">
                                            <Card className="homecard">
                                                <CardBody className="mt-3 text-justify">
                                                    <img src={"https://via.placeholder.com/150/" + postDetails.image + "/placeholder.com/"} className="Homepageimg"></img>
                                                    <CardText className="mt-3  text-center">{postDetails.title}</CardText>
                                                    <CardText tag="h5" className="text-center"> $ {postDetails.price}{" "}<s> ${postDetails.price + 199}</s></CardText>
                                                </CardBody>
                                                <Button className="mobilebtn" onClick={() => GetSingleProduct(postDetails)}>
                                                    View Detail's
                                                </Button>
                                            </Card>
                                        </Col>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                    : ''}


                {off ? <div><Button href="/ZeroDotOne/HomePage"><IoMdArrowRoundBack /></Button>{"   "} < SingleProductDtls details={detailsAddCart} /></div> : ''}

            </div>
        </div >

    )
}
export default HomePage;