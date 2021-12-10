import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, CardHeader } from 'reactstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUpPage = () => {
    const navigate = useNavigate();
    var [emailidvld, setEmailidvld] = useState("");
    var [passwordvld, setPasswordvld] = useState("");
    var [usernamevld, setUsernamevld] = useState("");
    var [firstnamevld, setFirstnamevld] = useState("");
    var [lastnamevld, setLastnamevld] = useState("");
    var [cityvld, setCityvld] = useState("");
    var [addressvld, setAddressvld] = useState("");
    var [zipcodevld, setZipcodevld] = useState("");
    var [PhoneNumbervld, setphoneNumvervld] = useState("");

    const OnCancel_Function = () => {
        window.location.reload();
    }
    const Onsubmit_Function = () => {
        if (!emailidvld) {
            alert('Enter Valid Email')
            return false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailidvld)) {
            alert('Invalid email address')
            return false;
        }

        else if (passwordvld.length < 7) {
            alert('Enter Password');
            return false;
        }
        else if (usernamevld === '') {
            alert("Enter Username");
            return false;
        }
        else if (firstnamevld === '') {
            alert("Enter FirstName");
            return false;
        }
        else if (lastnamevld === '') {
            alert("Enter LastName");
            return false;
        }
        else if (cityvld === '') {
            alert("Enter your city");
            return false;
        }
        else if (addressvld === '') {
            alert("Enter Your Address");
            return false;
        }
        else if (zipcodevld.length < 6) {
            alert("Enter Your Correct Zipcode");
            return false;
        }
        else if (PhoneNumbervld.length > 10) {
            alert("Enter Phone Number");
            return false;
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
            .then((response) => { JSON.stringify(response) })
            .catch(error => {
                console.log(error);
            });
        var toastMixin = Swal.mixin({
            toast: true,
            icon: 'Success',
            title: 'General Title',
            animation: false,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        toastMixin.fire({
            animation: true,
            title: 'UserAdded Successfully'
        });
        navigate("/")
    }

    return (
        <div>
            <section>
                <h1> SignUp </h1>
            </section>
            <div className="container-fluid login-2">
                <div className="container">
                    <div className="login-form">
                        <div className="row align-items-center">
                            <div className="col-md-1">
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="login-box">
                                <form>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" onChange={(e) => setEmailidvld(e.target.value)} value={emailidvld} placeholder="Enter your Email" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" onChange={(e) => setPasswordvld(e.target.value)} value={passwordvld} placeholder="Enter your password" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>UserName</label>
                                        <input type="text" onChange={(e) => setUsernamevld(e.target.value)} value={usernamevld} placeholder="Enter your Name" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>FirstName</label>
                                        <input type="text" onChange={(e) => setFirstnamevld(e.target.value)} value={firstnamevld} placeholder="Enter your FirstName" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>LastName</label>
                                        <input type="text" onChange={(e) => setLastnamevld(e.target.value)} value={lastnamevld} placeholder="Enter your LastName" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>City</label>
                                        <input type="text" onChange={(e) => setCityvld(e.target.value)} value={cityvld} placeholder="Enter your City" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input type="text" onChange={(e) => setAddressvld(e.target.value)} value={addressvld} placeholder="Enter your Address" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>ZipCode</label>
                                        <input type="text" onChange={(e) => setZipcodevld(e.target.value)} value={zipcodevld} maxLength="6" placeholder="Enter your ZipCode" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>PhoneNumber</label>
                                        <input type="text" onChange={(e) => setphoneNumvervld(e.target.value)} value={PhoneNumbervld} maxLength="10" placeholder="Enter your PhoneNumber" className="form-control" />
                                    </div>

                                    <input type="button" value="Submit" className="btn btn-primary" onClick={() => Onsubmit_Function()}></input>{"   "}
                                    <input href="/" type="button" value="Cancel" className="btn btn-primary" onClick={() => OnCancel_Function()}></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUpPage;