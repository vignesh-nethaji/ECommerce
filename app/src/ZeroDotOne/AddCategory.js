import { Button, Form, FormGroup, Label, Input, Col, Row, CardHeader } from 'reactstrap';
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Context } from './CategoryDetails';
import { useNavigate } from 'react-router';
import HeaderPage from "./HeaderPage";
import { BsWindowSidebar } from 'react-icons/bs';


const AddCategory = () => {
    const navigate = useNavigate()
    const id = useContext(Context);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDetails, setCategoryDetails] = useState([])
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(false);
    const token = localStorage.getItem("UserTokenDetails");

    useEffect(() => {
        if (id !== 0 && id !== undefined) {
            setOn(false);
            setOff(true);
            axios.get(("http://localhost:40073/api/Category/Get/" + id),
                { headers: { "Authorization": `Bearer ${token}` } }
            )
                .then(res => { setCategoryDetails(res.data.data) })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            setCategoryName('');
        }
    }, [id, token])
    useEffect(() => {
        if (categoryDetails !== null && categoryDetails.id !== 0) {
            setCategoryName(categoryDetails.name);
        } else {
            setCategoryName('')
        }
    }, [categoryDetails])

    const CategoryDetailsSubmit = () => {
        if (categoryName === '' || categoryName === undefined || categoryName === null) {
            alert("Please Add category");
            return false;
        } else if (/[^A-Za-z]/.test(categoryName)) {
            alert("Enter valid CategoryName");
            return false;
        }

        else {
            axios.post("http://localhost:40073/api/Category/Add", {
                "id": 0,
                "name": categoryName
            })
                .then((res) => { JSON.stringify(res) })
                .catch(Error => {
                    console.log(Error)
                })
            navigate("/ZeroDotOne/CategoryDetails");
        }
    }
    const CategoryDetailsUpdate = () => {

        if (categoryName === '' || categoryName === undefined || categoryName === null) {
            alert("Please Add category");
            return false;
        } else if (/[^A-Za-z]/.test(categoryName)) {
            alert("Enter valid CategoryName");
            return false;
        }
        else {
            axios.put("http://localhost:40073/api/Category/Update", {
                "id": categoryDetails.id,
                "name": categoryName
            }, { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => { JSON.stringify(res) })
                .catch(Error => {
                    console.log(Error)
                })
            window.location.reload();
        }
    }
    const CategoryDetailsBack = () => {
        navigate("/ZeroDotOne/CategoryDetails");
        window.location.reload();
    }
    return (
        <div>

            {on ?
                <HeaderPage />
                : ''}
            <section>
                <h2> Add Category </h2>
            </section>
            <div className="container-fluid login-4">
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

                                    <input type="text" value={categoryName} onChange={(e) => { setCategoryName(e.currentTarget.value) }} placeholder="Add Category" className="form-control" />
                                </div>


                                <input type="button" value="Back" className="btn btn-primary" onClick={() => { CategoryDetailsBack() }}></input>{" "}


                                {on ?
                                    <input type="button" value="Submit" className="btn btn-primary" onClick={() => { CategoryDetailsSubmit() }}></input>

                                    : ''}
                                {off ?
                                    <input type="button" value="Update" className="btn btn-primary" onClick={() => { CategoryDetailsUpdate() }} ></input>
                                    : ''}

                                <Col md="2"> </Col>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default AddCategory;
