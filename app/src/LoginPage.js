import React, { useState } from "react";
import { Input, Button, CardHeader, Label, CardBody } from "reactstrap";

const LoginPage = () => {

    const [userNameVld, setUserNameVld] = useState()
    const [passWordVld, setPassWordVld] = useState()

    const UserNamevld = (e) => { setUserNameVld(e.targer.value) }

    const PassWordvld = (e) => { setPassWordVld(e.targer.value) }

    const Onsubmit_Function = () => { }
    return (
        <div>
            <CardHeader className="LoginPageHeader">
                <div >
                    <Label>User Name</Label>
                    <Input onChange={(e) => UserNamevld(e)} value={userNameVld} />
                    <br /><br />
                    <Label>PassWord</Label>
                    <Input onChange={(e) => PassWordvld(e)} value={passWordVld} /><br /><br />
                    <Button onClick={() => Onsubmit_Function()} href="/ZeroDotOne/HomePage" color="danger">Login</Button>
                </div>
                <CardBody className="mt-5">
                    New user <a href="/SignUpPage" alt="#">SignUp</a>
                </CardBody>
            </CardHeader>
        </div>
    )
}
export default LoginPage
