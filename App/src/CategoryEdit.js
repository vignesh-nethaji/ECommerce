import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, CardHeader } from 'reactstrap';
import axios from "axios";
import {useNavigate} from 'react-router-dom';



const CategoryEdit = () => {

    const navigate = useNavigate();

    var [Name, setName] = useState("");
    

    const [categoryDetails, setCategoryDetails]= useState([])
    const id = localStorage.getItem("CatrgoryEditID");
    const token = localStorage.getItem("CategoryTokenDetails");

    useEffect(()=>{
        axios.get(("http://localhost:40073/api/Category/Get/"+id),
        { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then(res => {setCategoryDetails(res.data.data)})
    },[token,id])
    
    useEffect(()=>{
        if(categoryDetails!==null){
            setName(categoryDetails.Name);  
        }else{
            setName('');
            
        }
    },[categoryDetails,token,id])
   
    const Onsubmit_Function = () => {

        if(categoryDetails === null){
            if (Name==='') {
                alert('please add category')
            }else{
                navigate('/ZeroDotOne/CategoryDetails')
            }
     axios.post("http://localhost:40073/api/Category/Add", {
            "Id":0,
            "Name": Name,

             })
             .then((response) => { JSON.stringify(response)})
             .catch(error => {
                console.log(error);
              });
        }else if(categoryDetails.id === id){

            axios.put("http://localhost:40073/api/Category/Update/"+categoryDetails.id, {
                "Id": categoryDetails.Id,
                "Name": Name,
               
            })
            .then((response) => { JSON.stringify(response)})
            .catch(error => {
            console.log(error);
            });
            localStorage.setItem("CategoryEditID",0);
        }else{
            alert("hiii")
        }
    }
    
    return (
        <div>
            <Row>
                <Col md="3"></Col>
                <Col md="6">
                    <CardHeader>
                        <Form>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input type="Name" name="Name" placeholder="Category  Name" value={Name} onChange={(e) => setName(e.currentTarget.value)}/>
                                <FormText >Please add category</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Button href="/ZeroDotOne/CategoryDetails">Back</Button>{"  "}
                                <Button onClick={()=>Onsubmit_Function()}>Submit</Button>
                                
                            </FormGroup>
                        </Form>
                    </CardHeader>
                </Col>
                <Col md="3"></Col>
            </Row>
        </div>

    )
    }

export default CategoryEdit;