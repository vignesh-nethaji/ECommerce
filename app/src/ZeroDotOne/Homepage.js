import React, { useEffect, useState } from "react";
import {
    Row,
    Col, 
    Button
} from "reactstrap";
import HeaderPage from "./HeaderPage";
import SidePage from "./SidePage";
import axios from "axios";
import SingleProductDtls from "./SingleProductDtls";
import { BsHeart } from "react-icons/bs";

const ReadMore = ({ children }) => {
    const text = children.props.children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="product-title">
        {isReadMore ? text.slice(0,30) : text}
        <span onClick={toggleReadMore} >
          {isReadMore ? "..." : " ..."}
        </span>
      </p>
    );
  };


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

    const GetCatValue=()=>{

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
                                    <div key={i} className="product-card" onClick={() => GetSingleProduct(postDetails)}>
                                        {/* <div className="badge">Hot</div> */}
                                        <div className="product-tumb">
                                            {/* <img src={"https://assets.ajio.com/medias/sys_master/root/20210511/Ao2d/6099b6ddaeb269a9e3ba8757/-473Wx593H-462405155-blue-MODEL.jpg"} alt="" /> */}
                                            <img src={postDetails.image} alt="" /> 

                                        </div>
                                        <div className="product-details">
                                            {/* <span className="product-catagory"></span> */}
                                            <ReadMore>
                                            <h4 className="product-title">{postDetails.title}</h4>
                                            </ReadMore>
                                            {/* <p>{postDetails.description}</p> */}
                                            <div className="product-bottom-details force-overflow">
                                                <div className="product-price"><small>${postDetails.price + 199}</small>${postDetails.price}</div>
                                                <div className="product-links">
                                                    <BsHeart />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    // <div key={i} className="mt-5">
                                    //     <Col md="10">
                                    //         <Card className="homecard">
                                    //             <CardBody className="mt-3">
                                    //                 <img src={"https://via.placeholder.com/150/" + postDetails.image + "/placeholder.com/"} className="Homepageimg"></img>
                                    //                 <CardText className="mt-3  text-center">{postDetails.title}</CardText>
                                    //                 <CardText tag="h5" className="text-center"> $ {postDetails.price}{" "}<s> ${postDetails.price + 199}</s></CardText>
                                    //             </CardBody>
                                    //             <Button className="mobilebtn" onClick={() => GetSingleProduct(postDetails)}>
                                    //                 View Detail's
                                    //             </Button>
                                    //         </Card>
                                    //     </Col>
                                    // </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                    : ''}
                {off ? <div><Button onClick={() => { BacktoHome() }}>Back</Button> < SingleProductDtls details={detailsAddCart} /></div> : ''}
            </div>
        </div >

    )
}
export default HomePage;