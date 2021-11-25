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
                                <Label>Email</Label>
                                <Input type="email" name="email" placeholder="Email ID" value={emilidvld} onChange={(e) => setEmilidvld(e.currentTarget.value)} />
                                <FormText >Please Fill Email Format</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label>User Name</Label>
                                <Input type="text" name="Username" placeholder="User Name" value={usernamevld} onChange={(e) => setUsernamevld(e.currentTarget.value)} />
                                <FormText >Fill User Name</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" name="password" placeholder="password" value={passwordvld} onChange={(e) => setPasswordvld(e.currentTarget.value)} />
                                <FormText >Please Fill Correct PassWord</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md="6">
                                        <Input type="text" name="password" placeholder="First Name" value={firstnamevld} onChange={(e) => { setFirstnamevld(e.currentTarget.value) }} />
                                    </Col>
                                    <Col md="6">
                                        <Input type="text" name="password" placeholder="Last Name" value={lastnamevld} onChange={(e) => { setLastnamevld(e.currentTarget.value) }} />
                                    </Col>
                                </Row>
                                <FormText >Fill Correct First Name</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label>City</Label>
                                <Input type="text" name="text" value={cityvld} onChange={(e) => { setCityvld(e.currentTarget.value) }} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Address</Label>
                                <Input type="textarea" name="text" value={addressvld} onChange={(e) => { setAddressvld(e.currentTarget.value) }} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Zipcode</Label>
                                <Input type="number" name="text" value={zipcodevld} onChange={(e) => { setZipcodevld(e.currentTarget.value) }} />
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