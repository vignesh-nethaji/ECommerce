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


            <nav className="navbar">
                <div className="nav">
                    <img src="/Image.png" className="brand-logo" alt="dddddd" />
                    <div className="nav-items">
                        <div className="search">
                            <input type="text" className="search-box" placeholder="search brand, product" />
                            <button className="search-btn">search</button>
                        </div>

                        <UncontrolledDropdown >
                            <DropdownToggle >
                                <img src="/user.png" alt="ddd" />
                            </DropdownToggle>
                            <DropdownMenu >
                                <DropdownItem onClick={() => YourProfile()}>Your Profile</DropdownItem>
                                <DropdownItem onClick={() => { LogoutFun() }}>Logout </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <a href="#"><img src="/cart.png" alt="dddd" onClick={() => CartPage()} /></a>

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
                    </div>
                </div>
            </nav>
        </div >

    );
}
export default HeaderPage;

