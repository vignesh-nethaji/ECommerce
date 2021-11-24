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
    debugger;
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
    console.log(data);
    if (data.data.data !== null) {
    navigate("../ZeroDotOne/Homepage")
    }
    else {
    setErrorMessagePsd("please enter the correct password");
    setErrorMessageuser("please enter the correct username");
    }
    console.log(data);
    })
    .catch(error => {
    console.log(error);
    });

    }
    return (
    <div>
    <CardHeader className="LoginPageHeader">
    <div >
    <Label>User Name</Label>
    <Input type="text" onChange={(e) => UserNamevld(e)} value={userNameVld} />
    <div className="error" > {errorMessage} </div><br /><br />


    <Label>Password</Label>
    <Input type="password" onChange={(e) => PassWordvld(e)} value={passWordVld} />
    <div className="error" > {errorMessagePsd} </div> <br /><br />


    <Button onClick={() => Onsubmit_Function()} color="danger">Login</Button>
    </div>

    <CardBody className="mt-5">
    New user <a href="/SignUpPage" alt="#">SignUp</a>
    </CardBody>
    </CardHeader>
    </div>
    )
}
export default LoginPage
