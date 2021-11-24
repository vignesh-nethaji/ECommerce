import { Button, Form, FormGroup, Label, Input,Col, Row, CardHeader } from 'reactstrap';
import React, { useState } from "react";
const AddCategory = () => {
    const [addCategory, setAddCategory]=useState('');
    return (
        <div>
            <Row>  
                <Col md="12">
                    <CardHeader>
                        <Form>
                            <FormGroup>

                                <Label><h3>AddCategory</h3></Label>
                                <Input type="text" name="text" placeholder="AddCategory" onChange={(e)=>{setAddCategory(e.currentTarget.value)}}  />
                            </FormGroup>
                            </Form>
                            </CardHeader>
                            <p>{addCategory}</p>
                            <Button style={{background:"#0c13fd"}}> Submit </Button>
                            </Col>
                            </Row>
        </div>
       
    )
    }
    export default AddCategory;
   