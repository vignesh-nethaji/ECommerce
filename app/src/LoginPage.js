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
            setErrorMessageuser("Please Enter a UserName!");
            return false;
        } else {
            setErrorMessageuser('')
        }



        if (passWordVld.trim() === "") {
            setErrorMessagePsd("Please Enter a Password!");
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
                setErrorMessagePsd("please enter the correct password");
                setErrorMessageuser("please enter the correct username");
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
                                    <img src="Shop.webp" className="back-img" title="login" alt="welcome image" />
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
                                            <input type="text" onChange={(e) => UserNamevld(e)} value={userNameVld} placeholder="Enter your name" className="form-control" />
                                            <div className="error" > {errorMessage} </div><br /><br />
                                            <input type="password" onChange={(e) => PassWordvld(e)} value={passWordVld} placeholder="Enter your password" className="form-control" />
                                            <div className="error" > {errorMessagePsd} </div> <br /><br />
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
