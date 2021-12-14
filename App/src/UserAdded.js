import React, { useEffect, useState, useContext } from 'react';
import { Col } from 'reactstrap';
import axios from "axios";
import { Context } from "./UserDetails";
import { YourProfileId } from './YourProfile';
import HeaderPage from './ZeroDotOne/HeaderPage';
import { useNavigate } from "react-router-dom";


const UserAdded = () => {
    let navigate = useNavigate();
    const id = useContext(Context);
    const ProfileId = useContext(YourProfileId);
    const [emailidvld, setEmailidvld] = useState("");
    const [passwordvld, setPasswordvld] = useState("");
    const [usernamevld, setUsernamevld] = useState("");
    const [firstnamevld, setFirstnamevld] = useState("");
    const [lastnamevld, setLastnamevld] = useState("");
    const [cityvld, setCityvld] = useState("");
    const [addressvld, setAddressvld] = useState("");
    const [zipcodevld, setZipcodevld] = useState("");
    const [PhoneNumbervld, setphoneNumvervld] = useState("");
    const [userDetails, setUserDetails] = useState([])
    const token = localStorage.getItem("UserTokenDetails");
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(false);


    useEffect(() => {
        if ((id !== 0 && id !== undefined) || (ProfileId !== 0 && ProfileId !== undefined)) {
            setOff(true);
            setOn(false);
            if (id !== 0 && id !== undefined) {
                axios.get(("http://localhost:40073/api/User/Get/" + id),
                    { headers: { "Authorization": `Bearer ${token}` } }
                )
                    .then(res => { setUserDetails(res.data.data) })
                    .catch(err => {
                        console.log(err)
                    })
            } else if (ProfileId !== 0 && ProfileId !== undefined) {
                axios.get(("http://localhost:40073/api/User/Get/" + ProfileId),
                    { headers: { "Authorization": `Bearer ${token}` } }
                )
                    .then(res => { setUserDetails(res.data.data) })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                alert("Error");
            }

        } else {
            setEmailidvld('');
            setUsernamevld('');
            setPasswordvld('');
            setFirstnamevld('');
            setLastnamevld('');
            setAddressvld('');
            setCityvld('');
            setZipcodevld('');
            setphoneNumvervld('');
        }

    }, [id, token])
    useEffect(() => {
        if (userDetails !== null && userDetails.id !== 0) {
            setEmailidvld(userDetails.email);
            setUsernamevld(userDetails.username);
            setPasswordvld(userDetails.password);
            setFirstnamevld(userDetails.firstname);
            setLastnamevld(userDetails.lastname);
            setAddressvld(userDetails.address);
            setCityvld(userDetails.city);
            setZipcodevld(userDetails.zipcode);
            setphoneNumvervld(userDetails.phoneNumber);

        } else {
            setEmailidvld('');
            setUsernamevld('');
            setPasswordvld('');
            setFirstnamevld('');
            setLastnamevld('');
            setAddressvld('');
            setCityvld('');
            setZipcodevld('');
            setphoneNumvervld('')

        }
    }, [userDetails])

    const UserDetailsSubmit = () => {

        if (!emailidvld === " ") {
            alert('Enter E-mailID')
            return false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailidvld)) {
            alert('Enter Valid E-Mail(@.)')
            return false;
        }

        else if (passwordvld === " ") {
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
        // else if (lastnamevld === '') {
        //     alert("Enter LastName");
        //     return false;
        // }
        else if (addressvld === " ") {
            alert("Enter Address");
            return false;
        }
        else if (cityvld === '') {
            alert("Select City");
            return false;
        }

        else if (zipcodevld === " ") {
            alert("Enter Zipcode");
            return false;
        }
        else if (PhoneNumbervld === " ") {
            alert("Enter Phone Number");
            return false;
        }
        GotoUser();
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
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => { JSON.stringify(response) })
            .catch(error => {
                console.log(error)
            })
    }
    const GotoUser = () => {
        navigate("/ZeroDotOne/UserDetails")
    }
    const UserDetailsUpdate = () => {
        if (!emailidvld) {
            alert('Enter E-mailID')
            return false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailidvld)) {
            alert('Enter Valid E-Mail(@.)')
            return false;
        }

        else if (passwordvld === " ") {
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
        // else if (lastnamevld === '') {
        //     alert("Enter LastName");
        //     return false;
        // }
        else if (addressvld === '') {
            alert("Enter Address");
            return false;
        }
        else if (cityvld === '') {
            alert("Select City");
            return false;
        }

        else if (zipcodevld === " ") {
            alert("Enter Zipcode");
            return false;
        }
        else if (PhoneNumbervld === " ") {
            alert("Enter Phone Number");
            return false;
        }
        axios.put("http://localhost:40073/api/User/Update", {
            "id": userDetails.id,
            "email": emailidvld,
            "username": usernamevld,
            "password": passwordvld,
            "firstname": firstnamevld,
            "lastname": lastnamevld,
            "address": addressvld,
            "city": cityvld,
            "zipcode": zipcodevld,
            "phoneNumber": PhoneNumbervld
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => { JSON.stringify(response) })
            .catch(error => {
                console.log(error)
            })
        window.location.reload();
    };
    const BackBtn = () => {
        navigate("/ZeroDotOne/UserDetails")

    }

    return (
        <div>
            {on ?
                <HeaderPage />
                : ''}
            <section>
                <h1> Add User </h1>
            </section>
            <div className="container-fluid login-2">
                <div className="container">
                    <div className="login-form">
                        <div className="row align-items-center">
                            <div className="col-md-2">
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="login-box"></div>
                            <form>
                                <div className="form-group">
                                    <label>Email <span className="errorMsg">*</span></label>
                                    <input type="text" value={emailidvld} onChange={(e) => setEmailidvld(e.target.value)} placeholder="Enter your Email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Password <span className="errorMsg">*</span></label>
                                    <input type="Password" onChange={(e) => setPasswordvld(e.target.value)} value={passwordvld} placeholder="Enter your Password" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>UserName <span className="errorMsg">*</span></label>
                                    <input type="text" onChange={(e) => setUsernamevld(e.target.value)} value={usernamevld} placeholder="Enter your Name" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>FirstName <span className="errorMsg">*</span></label>
                                    <input type="text" onChange={(e) => setFirstnamevld(e.target.value)} value={firstnamevld} placeholder="Enter your FirstName" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>LastName</label>
                                    <input type="text" onChange={(e) => setLastnamevld(e.target.value)} value={lastnamevld} placeholder="Enter your LastName" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Address <span className="errorMsg">*</span></label>
                                    <input type="text" onChange={(e) => setAddressvld(e.target.value)} value={addressvld} placeholder="Enter your Address" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>City <span className="errorMsg">*</span></label>
                                    <select id="city" onChange={(e) => setCityvld(e.target.value)} value={cityvld} className="form-control">
                                        <option value="Select your city">Select your City </option>
                                        <option value="Bangalore">Bangalore</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Mysore">Mysore</option>
                                        <option value="Coimbatore">Coimbatore</option>
                                        <option value=" Hyderabad">Hydrabad</option>
                                        <option value=" Salem">Salem</option>
                                        <option value=" Tanjavur">Tanjavur</option>
                                        <option value=" Kanniyakumari">Kanniyakumari</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>ZipCode </label>
                                    <input type="text" onChange={(e) => setZipcodevld(e.target.value)} value={zipcodevld} maxLength="6" placeholder="Enter your ZipCode" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>PhoneNumber <span className="errorMsg">*</span></label>
                                    <input type="text" onChange={(e) => setphoneNumvervld(e.target.value)} value={PhoneNumbervld} maxLength="10" placeholder="Enter your PhoneNumber" className="form-control" />
                                </div>

                                <input type="button" value="Back" className="btn btn-primary" onClick={() => BackBtn()}></input>{"   "}


                                {on ?
                                    <input type="button" value="Submit" className="btn btn-primary" onClick={() => { UserDetailsSubmit() }}></input>

                                    : ''}
                                {off ?
                                    <input type="button" value="Update" className="btn btn-primary" onClick={() => { UserDetailsUpdate() }} ></input>
                                    : ''}

                                <Col md="2"> </Col>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default UserAdded;