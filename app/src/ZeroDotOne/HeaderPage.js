import { CardHeader, Row, Col, Input, InputGroup, InputGroupText, Button } from 'reactstrap';
import { IoSearchSharp } from "react-icons/io5";
import { BsCartCheckFill,BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const HeaderPage = () => {
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
                        <a href="/ZeroDotOne/UserDetails"><FaUserCircle className="CartIcons" /></a>
                    </Col>
                    <Col md="1">
                        <a href="/ZeroDotOne/CartDetailsPage">
                            <BsCartCheckFill className="CartIcons" />
                        </a>
                        <BsThreeDotsVertical/>
                    </Col>
                </Row>
            </CardHeader>
        </div>

    );
}

export default HeaderPage;