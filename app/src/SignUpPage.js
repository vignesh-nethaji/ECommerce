import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const SignUpPage = () => {
    const navigate = useNavigate();
    var [emailidvld, setEmailidvld] = useState("");
    var [passwordvld, setPasswordvld] = useState("");
    var [usernamevld, setUsernamevld] = useState("");
    var [firstnamevld, setFirstnamevld] = useState("");
    var [lastnamevld, setLastnamevld] = useState("");
    var [countryDtls, setCountryDtls] = useState([]);
    var [addressvld, setAddressvld] = useState("");
    var [zipcodevld, setZipcodevld] = useState("");
    var [Phonenumber, setPhonenumber] = useState("");



    const OnCancel_Function = () => {
        window.location.reload();
    }

    useEffect(() => {
        axios.get("https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json", {

        })
            .then((response) => (response))
            .then((response) => (setCountryDtls(response.data)))
            .catch(error => {
                console.log(error);
            });

    })
    const Onsubmit_Function = () => {
        if (!emailidvld) {
            alert('Enter E-mailId')
            return false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[com]{2,4}$/i.test(emailidvld)) {
            alert('Enter Valid Email(@.)')
            return false;
        }
        else if (passwordvld.length < 7) {
            alert('Enter Password');
            return false;
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(passwordvld)) {
            alert('Enter valid Password');
            return false;
        }
        else if (usernamevld === '') {
            alert("Enter Username");
            return false;
        }
        else if (!/^[a-zA-Z0-9_]*$"/.test(passwordvld)) {
            alert('Enter valid Username');
            return false;
        }
        else if (firstnamevld === '') {
            alert("Enter FirstName");
            return false;
        }
        else if (addressvld === '') {
            alert("Enter Address");
            return false;
        }
        else if (countryDtls === '') {
            alert("Select Country");
            return false;
        }

        else if (zipcodevld.length < 6 || zipcodevld.length < 5) {
            alert("Enter Your Zipcode");
            return false;
        }
        else if (Phonenumber.length < 10) {
            alert("Enter Mobile Number");
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
            "Country": countryDtls,
            "zipcode": zipcodevld,
            "Phonenumber": Phonenumber

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
    // function isNumber(evt) {
    //     evt = (evt) ? evt : window.event;
    //     var charCode = (evt.which) ? evt.which : evt.keyCode;
    //     if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //         return false;
    //     }
    //     return true;
    // }

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
                                        <label>Email <span className="errorMsg">*</span></label>
                                        <input type="email" onChange={(e) => setEmailidvld(e.target.value)} value={emailidvld} placeholder="Enter Email" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Password <span className="errorMsg">*</span></label>
                                        <input type="password" onChange={(e) => setPasswordvld(e.target.value)} value={passwordvld} placeholder="Enter Password" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>UserName <span className="errorMsg">*</span></label>
                                        <input type="text" onChange={(e) => setUsernamevld(e.target.value)} value={usernamevld} placeholder="Enter UserName" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>FirstName <span className="errorMsg">*</span></label>
                                        <input type="text" onChange={(e) => setFirstnamevld(e.target.value)} value={firstnamevld} placeholder="Enter FirstName" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>LastName</label>
                                        <input type="text" onChange={(e) => setLastnamevld(e.target.value)} value={lastnamevld} placeholder="Enter LastName" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Address <span className="errorMsg">*</span></label>
                                        <textarea onChange={(e) => setAddressvld(e.target.value)} value={addressvld} placeholder="Enter Address" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Country <span className="errorMsg">*</span></label>

                                        <select id="Country" onChange={(e) => setCountryDtls(e.target.value)} value={countryDtls} className="form-control">
                                            <option defaultValue value={0}>Select Country</option>
                                            {countryDtls.map((country, i) => {
                                                return (
                                                    <option value={country.dial_code} value2={country.name} key={i}>{country.name}</option>
                                                )
                                            }
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>ZipCode</label>
                                        <input type="number" onChange={(e) => setZipcodevld(e.target.value)} value={zipcodevld} placeholder="Enter ZipCode" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Mobile Number <span className="errorMsg">*</span></label>
                                        <PhoneInput type="text" maxLength="10" onKeyPress={(e) => setPhonenumber(e.target.value)} placeholder="Enter Mobile Number" className="form-control" />
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



