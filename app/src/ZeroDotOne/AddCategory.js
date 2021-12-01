import { Button, Form, FormGroup, Label, Input, Col, Row, CardHeader } from 'reactstrap';
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Context } from './CategoryDetails';
import { useNavigate } from 'react-router';

const AddCategory = () => {
    const [addCategory, setAddCategory] = useState('');
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
                    <p>{addCategory}</p>
                    <Button style={{ background: "#0c13fd" }}> Submit </Button>
                </Col>
            </Row>
        </div>
    )
}
export default AddCategory;
