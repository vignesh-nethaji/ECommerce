import { CardHeader, Row, Col, Input, InputGroup, InputGroupText, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { IoSearchSharp } from "react-icons/io5";
import { BsCartCheckFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const HeaderPage = () => {
    let navigate = useNavigate();
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

    return (
        <div>
            <CardHeader className="sidepage">
                <Row>
                    <Col md="3"><h4 style={{ fontFamily: "monospace" }} className="mt-2">Zero Dot One</h4></Col>
                    <Col md="6">
                        <InputGroup>
                            <Input placeholder="Search Product" />
                            <InputGroupText>
                                <IoSearchSharp />
                            </InputGroupText>
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
                                        <DropdownItem href="/">Logout </DropdownItem>
                                        <DropdownItem onClick={() => YourProfile()}>Your Profile</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>
                            <Col md="3"><BsCartCheckFill className="CartIcons " onClick={() => CartPage()} /></Col>
                            <Col md="3">
                                <div className="HeaderCart">
                                    <UncontrolledDropdown >
                                        <DropdownToggle className="HeaderUserIcon">
                                            <BsThreeDotsVertical />
                                        </DropdownToggle>
                                        <DropdownMenu >
                                            <DropdownItem onClick={() => { CategoryDetails() }}>Category </DropdownItem>
                                            <DropdownItem onClick={() => { ProductDetails() }}>Products</DropdownItem>
                                            <DropdownItem onClick={() => UserDetails()} >User Details</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardHeader>
        </div>

    );
}


export default HeaderPage;

