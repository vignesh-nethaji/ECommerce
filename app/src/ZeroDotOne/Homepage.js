import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardFooter,
    Button
} from "reactstrap";
import HeaderPage from "./HeaderPage";
import SidePage from "./SidePage";

const HomePage = () => {

    const [UserName, setUserName] = useState([]);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then((data) => setUserName(data));
    }, [])
    return (
        <div>
            <div>
                <HeaderPage />
            </div>
            <Row>
                <Col md="3" > <SidePage /></Col>
                <Col md="9" >
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10, }}>
                        {UserName.map((postDetails, i) =>
                            <div key={i} className="mt-5">
                                <Col md="10">
                                    <Card className="homecard">
                                        <CardBody>
                                            <CardTitle tag="h5">{postDetails.category}</CardTitle>
                                        </CardBody>
                                        <CardBody>
                                            <h4>{postDetails.title}</h4>
                                            <CardText>{postDetails.description}</CardText>
                                        </CardBody>
                                        <CardFooter>
                                            <Button className="mobilebtn">
                                                ${postDetails.price}{" "}<s> ${postDetails.price + 199}</s>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>

    )
}
export default HomePage;