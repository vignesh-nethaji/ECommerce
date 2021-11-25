import { useEffect, useState } from "react";
import { Input, Button, CardHeader,Label,Row,Col } from "reactstrap";
import axios from "axios";
import HeaderPage from "./HeaderPage";
import SidePage from "./SidePage";

const CreateProduct = () => {
    const [Category, setCategory] = useState();
    useEffect(() => {
        axios.get("http://localhost:40073/api/Category/GetAll", {

        })
            .then((res) => (res.data.data))
            .then((res) => (console.log(res)))
            .then((res) => (setCategory(res)))

    }, [])
    return (

        <div>
            <div>
                <HeaderPage />
            </div>
            <Row>
                <Col md="3" > <SidePage /></Col>
                <Col md="9" >
            <CardHeader className="">
                <div >
                    <Label>Category</Label>
                    <select className="form-control">
                        {Category.map((catDetails,i)=>
                        <option key={i}>{catDetails.Name}</option>
                         )}
                    </select>
                    <br /><br />
                    <Label>Product Name</Label>
                    <Input className="form-control" /><br /><br />

                    <Label>Price</Label>
                    <Input className="form-control" /><br /><br />

                    <Label>Product Description</Label>
                    <Input className="form-control" /><br /><br />

                    <Button color="danger">Add Product</Button>
                </div>
                
            </CardHeader>
            </Col>
            </Row>
            
        </div>
    )
}
export default CreateProduct;