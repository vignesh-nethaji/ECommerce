import React, { useState } from "react";
import { Input, Button, CardHeader, Label, CardBody } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ initialValue, ...rest }) => {
    const [errorMessage, setErrorMessageuser] = useState("");
    const [errorMessagePsd, setErrorMessagePsd] = useState("");
    let navigate = useNavigate();

    const [userNameVld, setUserNameVld] = useState(initialValue || "")
    const [passWordVld, setPassWordVld] = useState(initialValue || "")

    const UserNamevld = (e) => { setUserNameVld(e.currentTarget.value) }

    const PassWordvld = (e) => { setPassWordVld(e.currentTarget.value) }

    const Onsubmit_Function = () => {

        if (userNameVld.trim() === "") {
            setErrorMessageuser("Please Enter UserName !");
            return false;
        } else {
            setErrorMessageuser('')
        }



        if (passWordVld.trim() === "") {
            setErrorMessagePsd("Please Enter Password !");
            return false;
        } else {
            setErrorMessagePsd('')
        }

        axios.post("http://localhost:40073/api/Account/Login", {
            "username": userNameVld,
            "password": passWordVld

        }).then((data) => {
            if (data.data.data !== null) {
                window.location.replace("/ZeroDotOne/Homepage")
                
            }
            else {
                setErrorMessagePsd("Invalid Password");
                setErrorMessageuser("Invalid Username");
            }
            localStorage.setItem("UserIdDetails", data.data.data.id)
            localStorage.setItem("UserTokenDetails", data.data.data.token)
            localStorage.setItem("UserName", data.data.data.username)
        })
            .catch(error => {
                console.log(error);
            });

    }
    return (
        <div>
            <div className="container-fluid login-1">
                <div className="container">
                    <div className="login-form">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="img-box">
                                    <div className="loader"></div>
                                    <img src="Shoping.webp" className="back-img" title="login" alt="welcome image" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="login-box">
                                    <form>
                                        <div className="form-group">
                                            <h4 className="login-title">Welcome back</h4>
                                            <p className="login-p">Please login to your account.</p>
                                        </div>
                                        <div className="form-group">
                                        <label>UserName <span className="errorMsg">*</span></label>
                                            <input type="text" onChange={(e) => UserNamevld(e)} value={userNameVld} placeholder="Enter UserName" className="form-control" />
                                            <div className="errorMsg" > {errorMessage} </div><br />
                                            <label>Password <span className="errorMsg">*</span></label>
                                            <input type="password" onChange={(e) => PassWordvld(e)} value={passWordVld} placeholder="Enter Password" className="form-control" />
                                            <div className="errorMsg" > {errorMessagePsd} </div> <br />
                                        </div>
                                        <div className="input-group check-field">
                                            <div>
                                                <input type="checkbox" id="test" name="test" value="" />
                                                <label htmlFor="test"> Remember Me</label><br />
                                            </div>
                                            <a href="#" className="forgot">Forgot password?</a>
                                        </div>
                                        <div className="form-group text-center">
                                            <input type="button" value="Login" className="btn btn-primary" onClick={() => Onsubmit_Function()}></input>
                                            <p className="mb-0"> <a href="/SignUpPage">New User? Sign Up</a></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage
