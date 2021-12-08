import { CardHeader, Row, Col, Input, InputGroup, InputGroupText, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { IoSearchSharp } from "react-icons/io5";
import { BsCartCheckFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



const HeaderPage = (props) => {
    let navigate = useNavigate();
    const token = localStorage.getItem("UserTokenDetails");
    const [myOptions, setMyOptions] = useState([]);
    const userId = localStorage.getItem("UserIdDetails");
    const [cartDetails, setCartDetails] = useState([]);

    const [On, setOn] = useState(false);
    const [Off, setOff] = useState(false);
    const userName = localStorage.getItem("UserName")

    useEffect(() => {
        getDataFromAPI();
        CartDetails();
        if (userName === "Admin") {
            setOn(true);
        }
        else {
            setOff(true);
        }
    }, []);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const CartDetails = () => {
        axios.get(("http://localhost:40073/api/Cart/GetProducts/" + userId),
            { headers: headers }
        )
            .then(res => { setCartDetails(res.data.data) })
    }
    const CartPage = () => {
        navigate("/ZeroDotOne/CartDetailsPage")
    }
    const UserDetails = () => {
        navigate("/ZeroDotOne/UserDetails")
    }
    const CategoryDetails = () => {
        navigate("/ZeroDotOne/CategoryDetails")
    }
    const ProductDetails = () => {
        navigate("/ZeroDotOne/productdetails")
    }
    const YourProfile = () => {
        navigate("/ZeroDotOne/YourProfile");
    }
    const HomePageLink = () => {
        navigate("/ZeroDotOne/HomePage")
    }
    const getDataFromAPI = () => {

        axios.get(("http://localhost:40073/api/Category/GetAll"),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then((res) => {
                for (var i = 0; i < res.data.data.length; i++) {
                    myOptions.push(res.data.data[i].name)

                }
                setMyOptions(myOptions)
            })
    }
    const OnchangeAuto = (id) => {
        localStorage.setItem("CategoryIds", id)
        props.clickMe();
    }
    const LogoutFun = () => {
        localStorage.removeItem("UserName");
        navigate("/")
    }

    return (
        <div>
            <CardHeader className="sidepage">
                <Row>
                    <Col md="3"><h4 style={{ fontFamily: "monospace" }} className="mt-2">Zero Dot One</h4></Col>
                    <Col md="6">
                        <InputGroup >
                            <Autocomplete
                                className="AutocompleteHeader"
                                //onChange={OnchangeAuto}
                                freeSolo
                                autoComplete
                                autoHighlight
                                options={myOptions}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        //onChange={OnchangeAuto}
                                        // variant="outlined"
                                        // label="Search Box"
                                        // style={{ height: "2rem" }}
                                        placeholder="search Products"
                                    />
                                )}
                            />
                            {/* <InputGroupText>
                                <IoSearchSharp />
                            </InputGroupText> */}
                        </InputGroup>
                    </Col>
                    <Col md="3">
                        <Row>
                            <Col md="3"><FaHome onClick={() => HomePageLink()} className="HeaderHome" /></Col>
                            <Col md="3" >
                                <UncontrolledDropdown className="UserIcons ">
                                    <DropdownToggle className="HeaderUserIcon">
                                        <FaUserCircle className="UserIconsss" />
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <DropdownItem onClick={() => YourProfile()}>Your Profile</DropdownItem>
                                        <DropdownItem onClick={() => { LogoutFun() }}>Logout </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>
                            <Col md="3">
                                {/* <BsCartCheckFill className="CartIcons " onClick={() => CartPage()} /><span className="CartSpan ">{CartCount}</span> */}
                                <div>
                                    <div><BsCartCheckFill className="CartIcons " onClick={() => CartPage()} /><span className='counter'>{cartDetails.length}</span></div>
                                </div>
                            </Col>
                            <Col md="3">
                                {On ? <div className="HeaderCart">
                                    <UncontrolledDropdown >
                                        <DropdownToggle className="HeaderUserIcon">
                                            <BsThreeDotsVertical />
                                        </DropdownToggle>
                                        <DropdownMenu >
                                            <DropdownItem onClick={() => UserDetails()} >User Management</DropdownItem>
                                            <DropdownItem onClick={() => { CategoryDetails() }}>Category Management</DropdownItem>
                                            <DropdownItem onClick={() => { ProductDetails() }}>Products Management</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div> : ''}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardHeader>
        </div >

    );
}


export default HeaderPage;

