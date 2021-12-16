import React, { useEffect, useState, useMemo } from "react";
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
import Pagination from "./Pagination"
let PageSize = 6;


const ReadMore = ({ children }) => {
    const text = children.props.children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="product-title">
            {isReadMore ? text.slice(0, 30) : text}
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
    const [page, setPage] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        GetAllProduct();
        currentTableData();
    }, [token]);

    const GetAllProduct = () => {
        axios.get(("http://localhost:40073/api/Product/GetAll"),
            {
                headers: { "Authorization": `Bearer ${token}` }
            }
        )
            .then(res => { setProduct(res.data.data) })
    }

    const OnChangeCategory = () => {
        let Catid = localStorage.getItem("CategoryIds");
        setCurrentPage(1);
        if (Catid !== "0") {
            axios.get("http://localhost:40073/api/Product/GetProductByCategory/" + Catid, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })

                .then(res => { setProduct(res.data.data) })
            setPage(false);
        }
        else {
            axios.get(("http://localhost:40073/api/Product/GetAll"),
                { headers: { "Authorization": `Bearer ${token}` } }
            )
                .then(res => { setProduct(res.data.data) })
            setPage(true);
        }

    }

    const currentTableData = () => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return product.slice(firstPageIndex, lastPageIndex);
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
        <>
            <div>
                <HeaderPage />
                {on ?
                    <Row>
                        {on ? <Col md="3" > <SidePage callback={OnChangeCategory} /></Col> : ''}
                        <Col md="9" >
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10, }}>
                                {currentTableData().map((postDetails, i) =>
                                    <div key={i} className="product-card" onClick={() => GetSingleProduct(postDetails)}>
                                        <div className="product-tumb"><img src={postDetails.image} alt="" /></div>
                                        <div className="product-details">
                                            <ReadMore>
                                                <h4 className="product-title">{postDetails.title}</h4>
                                            </ReadMore>
                                            <div className="product-bottom-details force-overflow">
                                                <div className="product-price"><small>${postDetails.price + 199}</small>${postDetails.price}</div>
                                                <div className="product-links">
                                                    <BsHeart />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                    : ''}
                {off ? <div><Button onClick={() => { BacktoHome() }}>Back</Button> < SingleProductDtls details={detailsAddCart} /></div> : ''}
            </div>
            {page ?
                <Pagination
                    className="pagination-bar"
                    key={product.key}
                    currentPage={currentPage}
                    totalCount={product.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
                : ' '}

        </ >

    )
}
export default HomePage;