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
import axios from "axios";


const HomePage = () => {

    const [product, setProduct] = useState([]);
    const token = localStorage.getItem("UserTokenDetails")

    useEffect(() => {

        GetAllProduct();
            
    }, [token])

    const GetAllProduct=()=>{
        axios.get(("http://localhost:40073/api/Product/GetAll"),
        { headers: { "Authorization": `Bearer ${token}` } }
    )
        .then(res => { setProduct(res.data.data) })
    }

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
            .then((res) => (console.log(res)))
    }

    const OnChangeCategory=()=>{
        let Catid= localStorage.getItem("CategoryIds")
        axios.get("http://localhost:40073/api/Product/GetProductByCategory/"+Catid,{
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        })
        .then(res=>{ setProduct(res.data.data) })
      }
    return (
        <div>
            <div>
                <HeaderPage />
            </div>

            <Row>
                <Col md="3" > <SidePage callback={OnChangeCategory}/></Col>
                <Col md="9" >
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10, }}>
                        {product.map((postDetails, i) =>
                            <div key={i} className="mt-5">
                                <Col md="10">
                                    <Card className="homecard">
                                        {/* <CardBody>
                                            <CardTitle>{postDetails.category} </CardTitle>
                                        </CardBody> */}
                                        <CardBody className="mt-3 text-justify">
                                            <img src={"https://via.placeholder.com/150/" + postDetails.image + "/placeholder.com/"}></img>
                                            {/* {postDetails.image} */}
                                            <h5 className="mt-3">{postDetails.title}</h5>
                                            <CardText>{postDetails.description}</CardText>
                                            <CardText tag="h5"> $ {postDetails.price}{" "}<s> ${postDetails.price + 199}</s></CardText>
                                        </CardBody>
                                        <CardFooter>

                                            <Button className="mobilebtn" value={postDetails.id} onClick={() => AddToCart(postDetails.id)}>
                                                Add To Cart
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