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
    return (
        <div>
            <CardHeader>
                <Row>
                    <Col md="3"><h4 style={{ fontFamily: "monospace" }}>Zero Dot One</h4></Col>
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
                        <Row>
                            <Col md="6">
                                <BsCartCheckFill className="CartIcons" onClick={() => CartPage()} />
                            </Col>
                            <Col md="6" className="HeaderCart">
                                <UncontrolledDropdown >
                                    <DropdownToggle>
                                        <BsThreeDotsVertical />
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <DropdownItem >Category </DropdownItem>
                                        <DropdownItem >Products</DropdownItem>
                                        <DropdownItem onClick={() => UserDetails()} >User Details</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardHeader>
        </div>

    );
}

export default HeaderPage;