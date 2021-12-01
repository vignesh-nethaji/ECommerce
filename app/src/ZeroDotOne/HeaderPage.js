import { CardHeader, Row, Col, Input, InputGroup, InputGroupText, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { IoSearchSharp } from "react-icons/io5";
import { BsCartCheckFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
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
    return (
        <div>
            <CardHeader>
                <Row>
                    <Col md="2"><h4 style={{ fontFamily: "monospace" }}>Zero Dot One</h4></Col>
                    <Col md="6">
                        <InputGroup>
                            <Input placeholder="Search Product" />
                            <InputGroupText>
                                <IoSearchSharp />
                            </InputGroupText>
                        </InputGroup>
                    </Col>
                    <Col md="1">
                        <Button href="/">LogOut</Button>
                    </Col>
                    <Col md="1">
                        <FaUserCircle className="CartIcons" />
                    </Col>
                    <Col md="1">
                        <BsCartCheckFill className="CartIcons" onClick={() => CartPage()} />
                    </Col>
                    <Col md="1">
                        <div className="HeaderCart">
                            <UncontrolledDropdown >
                                <DropdownToggle>
                                    Admin {/* <BsThreeDotsVertical /> */}
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
            </CardHeader>
        </div>

    );
}

export default HeaderPage;

