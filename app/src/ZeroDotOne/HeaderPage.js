import { Card, CardHeader, Row, Col, Input, InputGroup, InputGroupText, Button } from 'reactstrap';
import { IoSearchSharp } from "react-icons/io5";
import { BsCartCheckFill } from "react-icons/bs";

const HeaderPage = () => {
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
                        <Button href="/">Login</Button>
                    </Col>
                    <Col md="1">
                        <BsCartCheckFill className="CartIcons" />
                    </Col>
                    <Col md="1">
                        <Card className="HeaderUserCle">
                            <h2>hii</h2>
                        </Card>
                    </Col>
                </Row>
            </CardHeader>
        </div>

    );
}

export default HeaderPage;