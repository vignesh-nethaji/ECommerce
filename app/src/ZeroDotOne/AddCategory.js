import { Button, Form, FormGroup, Label, Input, Col, Row, CardHeader } from 'reactstrap';
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Context } from './CategoryDetails';
import { useNavigate } from 'react-router';

const AddCategory = () => {
    const navigate = useNavigate()

    const id = useContext(Context);
    console.log(id)

    const [categoryName, setCategoryName] = useState("");

    const [categoryDetails, setCategoryDetails] = useState([])
    // const [addCategory, setAddCategory] = useState([])
    const token = localStorage.getItem("UserTokenDetails");


    useEffect(() => {
        if (id !== 0 && id !== undefined) {
            axios.get(("http://localhost:40073/api/Category/Get/" + id),
                { headers: { "Authorization": `Bearer ${token}` } }
            )
                .then(res => { setCategoryDetails(res.data.data) })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setCategoryName('');
        }
    }, [id, token])

    console.log(categoryDetails);

    useEffect(() => {
        if (categoryDetails !== null && categoryDetails.id !== 0) {
            setCategoryName(categoryDetails.name);
        } else {
            setCategoryName('')
        }

    }, [categoryDetails])

    const Onsubmit_Function = () => {

        if (categoryDetails !== null && id !== undefined) {

            if (categoryName === '') {
                alert("Please Add category");
                return false;
            } else {
                axios.put("http://localhost:40073/api/Category/Update", {
                    "id": categoryDetails.id,
                    "name": categoryName
                }, { headers: { "Authorization": `Bearer ${token}` } })
                    .then((res) => { JSON.stringify(res) })
                    .catch(Error => {
                        console.log(Error)
                    })
                navigate("/ZeroDotOne/CategoryDetails");
            }
        } else {

            if (categoryName === '') {
                alert("Please Add category");
                return false;
            } else {
                axios.post("http://localhost:40073/api/Category/Add", {
                    "id": 0,
                    "name": categoryName
                })
                    .then((res) => { JSON.stringify(res) })
                    .catch(Error => {
                        console.log(Error)
                    })

            }

        }
    }

    return (
        <div>
            <Row>
                <Col md="12">
                    <CardHeader>
                        <Form>
                            <FormGroup>

                                <Label><h3>AddCategory</h3></Label>
                                <Input type="text" name="text" placeholder="AddCategory" value={categoryName} onChange={(e) => { setCategoryName(e.currentTarget.value) }} />
                            </FormGroup>
                        </Form>
                    </CardHeader>
                    <Button onClick={() => Onsubmit_Function()}>Submit</Button>
                </Col>
            </Row>
        </div>

    )
}
export default AddCategory;
