import { Button, Form, FormGroup, Label, Input,Col, Row, CardHeader } from 'reactstrap';
import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const AddCategory = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessageCategory] = useState("");
    var [addCategoryvld, setAddCategoryvld] = useState('');

    const Onsubmit_Function = () => {
        debugger;
        if(addCategoryvld===''){
            setErrorMessageCategory("please Enter the Category");
        }else{
            navigate('/ZeroDotOne/HomePage')
        }
        

        axios.post("http://localhost:40073/api/Category/Add", {
       "id=":0,
        "Name": addCategoryvld,
    })
    .then((response) => { JSON.stringify(response)})
    .catch(error => {
       console.log(error);
     });
}
    
    return (
        <div>
            <Row>  
                <Col md="12">
                    <CardHeader>
                        <Form>
                            <FormGroup>

                                <Label><h3>AddCategory</h3></Label>
                                <Input type="text" name="text" placeholder="AddCategory" value={addCategoryvld} onChange={(e)=>{setAddCategoryvld(e.currentTarget.value)}}  />
                                <div className="error">{errorMessage}</div>
                            </FormGroup>
                            </Form>
                            </CardHeader>
                            
                            <Button href="/ZeroDotOne/HomePage" style={{background:"#0c13fd"}}>Back</Button>{"  "}
                            <Button onClick={()=>Onsubmit_Function()} style={{background:"#0c13fd"}}> Submit </Button>
                            </Col>
                        
                            <Row md="5"></Row>
                           <Col md="5">
                            <Button>Edit</Button>
                       
                           
                         
                              
                            <Button>Delete</Button>
                            </Col>
                            </Row>

                            
        </div>
       
    )
    }
    export default AddCategory;
    