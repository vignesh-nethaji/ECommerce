import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, CardHeader } from 'reactstrap';

const SignUpPage = ({ initialValue, ...rest }) => {
    var [emilidvld, setEmilidvld] = useState(initialValue || "");
    var [passwordvld, setPasswordvld] = useState(initialValue || "");
    var [usernamevld, setUsernamevld] = useState(initialValue || "");
    var [firstnamevld, setFirstnamevld] = useState(initialValue || "");
    var [lastnamevld, setLastnamevld] = useState(initialValue || "");
    var [cityvld, setCityvld] = useState(initialValue || "");
    var [addressvld, setAddressvld] = useState(initialValue || "");
    var [zipcodevld, setZipcodevld] = useState(initialValue || "");

    const Emailidvld = (e) => {
        setEmilidvld(e.currentTarget.value);
    }

    const UserNamevld = (e) => {
        setUsernamevld(e.currentTarget.value);
    }

    const PassWordvld = (e) => {
        setPasswordvld(e.currentTarget.value)
    }

    const FirstNamevld = (e) => {
        setFirstnamevld(e.currentTarget.value)
    }

    const LastNamevld = (e) => {
        setLastnamevld(e.currentTarget.value)
    }

    const Cityvld = (e) => {
        setCityvld(e.currentTarget.value)
    }

    const Addressvld = (e) => {
        setAddressvld(e.currentTarget.value)
    }

    const Zipcodevld = (e) => {
        setZipcodevld(e.currentTarget.value)
    }

    const Onsubmit_Function = () => {

    }
    return (
        <div>
            <Row>
                <Col md="3"></Col>
                <Col md="6">
                    <CardHeader>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Email ID" value={emilidvld} onChange={(e) => Emailidvld(e)} />
                                <FormText >Please Fill Email Format</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">User Name</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="User Name" value={usernamevld} onChange={(e) => { UserNamevld(e) }} />
                                <FormText >Fill User Name</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="password" value={passwordvld} onChange={(e) => PassWordvld(e)} />
                                <FormText >Please Fill Correct PassWord</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md="6">
                                        <Input type="text" name="password" id="examplePassword" placeholder="First Name" value={firstnamevld} onChange={(e) => { FirstNamevld(e) }} />
                                    </Col>
                                    <Col md="6">
                                        <Input type="text" name="password" id="examplePassword" placeholder="Last Name" value={lastnamevld} onChange={(e) => { LastNamevld(e) }} />
                                    </Col>
                                </Row>
                                <FormText >Fill Correct First Name</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">City</Label>
                                <Input type="text" name="text" id="exampleText" value={cityvld} onChange={(e) => { Cityvld(e) }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Address</Label>
                                <Input type="textarea" name="text" id="exampleText" value={addressvld} onChange={(e) => { Addressvld(e) }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Zipcode</Label>
                                <Input type="number" name="text" id="exampleText" value={zipcodevld} onChange={(e) => { Zipcodevld(e) }} />
                            </FormGroup>
                            <FormGroup>
                                <Button href="/">Back</Button>{"  "}
                                <Button href="/" onClick={Onsubmit_Function}>Submit</Button>
                            </FormGroup>
                        </Form>
                    </CardHeader>
                </Col>
                <Col md="3">
                    <div>
                        <p>{emilidvld}</p>
                        <p>{passwordvld}</p>
                        <p>{usernamevld}</p>
                        <p>{firstnamevld}</p>
                        <p>{lastnamevld}</p>
                        <p>{cityvld}</p>
                        <p>{addressvld}</p>
                        <p>{zipcodevld}</p>
                    </div>
                </Col>
            </Row>
        </div>

    )
}
export default SignUpPage;