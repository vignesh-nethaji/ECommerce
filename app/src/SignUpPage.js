import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, CardHeader } from 'reactstrap';
import axios from "axios";
import {useNavigate} from 'react-router-dom';



const SignUpPage = () => {
    const navigate = useNavigate();
    var [emailidvld, setEmailidvld] = useState("");
    var [passwordvld, setPasswordvld] = useState( "");
    var [usernamevld, setUsernamevld] = useState( "");
    var [firstnamevld, setFirstnamevld] = useState( "");
    var [lastnamevld, setLastnamevld] = useState( "");
    var [cityvld, setCityvld] = useState( "");
    var [addressvld, setAddressvld] = useState( "");
    var [zipcodevld, setZipcodevld] = useState( "");
    var [PhoneNumbervld, setphoneNumvervld] = useState( "");

   
    const Onsubmit_Function = () => {
        debugger;
        if (!emailidvld) {
            alert('Enter Valid Email')
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailidvld)) {
            alert('Invalid email address')
            return false;
        }
    
         else if( passwordvld.length < 7) {
            alert('Password is too Short');
            return false;
        }
        else if(usernamevld ==='') {
            alert("Enter Username");
            return false;
        }
        else if(firstnamevld ==='') {
            alert("Enter FirstName");
            return false;
        }
        else if(lastnamevld===''){
            alert("Enter LastName");
            return false;
        }
        else  if(cityvld===''){
            alert("Enter your city");
            return false;
        }
        else if(addressvld===''){
            alert("Enter Your Address");
            return false;
        }
        else if(zipcodevld.length<6){
            alert("Enter Your Correct Zipcode");
            return false;
        }
         
        else if(PhoneNumbervld.length>10){
            alert("Enter Phone Number");
            return false;
       }else{
            navigate('/')
        }

        axios.post("http://localhost:40073/api/User/Add", {
        "id": 0,
        "email": emailidvld,
        "username": usernamevld,
        "password": passwordvld,
        "firstname": firstnamevld,
        "lastname": lastnamevld,
        "address": addressvld,
        "city": cityvld,
        "zipcode": zipcodevld,
        "phoneNumber": PhoneNumbervld

         })
         .then((response) => { JSON.stringify(response)})
         .catch(error => {
            console.log(error);
          });
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
                                <Input type="email" name="email" placeholder="Email ID" value={emailidvld} onChange={(e) => setEmailidvld(e.currentTarget.value)}/>
                                <FormText >Please Fill Email Format</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" name="password" placeholder="password" value={passwordvld} onChange={(e) => setPasswordvld(e.currentTarget.value)} />
                                <FormText >Please Fill Correct PassWord</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label>User Name</Label>
                                <Input type="text" name="Username" placeholder="User Name" value={usernamevld} onChange={(e) => setUsernamevld(e.currentTarget.value)} />
                                <FormText >Fill User Name</FormText>
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
                                <Label>phoneNumber</Label><br/>
                                <Input type="number" placeholder="+91"  value={PhoneNumbervld}  onChange={(e) => { setphoneNumvervld(e.currentTarget.value) }} required></Input>
                            </FormGroup>
                            <FormGroup>
                                <Button href="/">Back</Button>{"  "}
                                <Button onClick={()=>Onsubmit_Function()}>Submit</Button>
                            </FormGroup>
                        </Form>
                    </CardHeader>
                </Col>
                <Col md="3"></Col>
            </Row>
        </div>

    )
}
export default SignUpPage;