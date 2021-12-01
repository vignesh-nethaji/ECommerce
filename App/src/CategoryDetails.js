import axios from "axios";
import { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";

const CategoryDetails = () => {

    let navigate = useNavigate();

    const token = localStorage.getItem("UserTokenDetails")
    const [categoryDetails, setCategoryDetails] = useState([])

    useEffect(() => {
        axios.get(("http://localhost:40073/api/Category/GetAll"),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then(res => { setCategoryDetails(res.data.data) })
    }, [token])

    const AddCategory = () => {
        navigate("/ZeroDotOne/AddCategory")
    }

    return (
        <div>
            <Button onClick={() => AddCategory()}> Add Category </Button>
            <Table responsive>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryDetails.map((items, i) =>
                        <CategoryTable CategoryTable={items} i={i} key={items.id} />
                    )}
                </tbody>
            </Table>
        </div>
    )
}
export default CategoryDetails;