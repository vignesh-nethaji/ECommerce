import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import AddCategory from "./AddCategory";

export const Context = React.createContext();

const CategoryDetails = () => {
    const token = localStorage.getItem("UserTokenDetails")
    const [categoryDetails, setCategoryDetails] = useState([])
    const [categoryEditID, setCategoryEditID] = useState(0);
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(false);

    const getCategoryDetails = () => {
        axios.get(("http://localhost:40073/api/Category/GetAll"),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then(res => { setCategoryDetails(res.data.data) })
    }

    useEffect(() => {
        getCategoryDetails();
    }, [token])
    console.log(categoryDetails);

    const CategoryDetailsEdit = (id) => {
        setCategoryEditID(id);
        setOff(true);
        setOn(false);
    }
    const CategoryDetailsDelete = (id) => {

        axios.delete(("http://localhost:40073/api/Category/Delete/" + id),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .catch(error => {
                console.log(error);
            });
        getCategoryDetails()
    }
    return (
        <div>
            <Context.Provider value={categoryEditID}>
                <Button href="/ZeroDotOne/AddCategory">Add Category</Button>
                {on ?
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Id</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryDetails.map((UserDataTable, i) =>
                                // <Datatable UserDataTable={items} i={i} key={items.id} />
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{UserDataTable.id}</td>
                                    <td>{UserDataTable.name}</td>
                                    <td>
                                        <Button onClick={() => { CategoryDetailsEdit(UserDataTable.id) }}>Edit</Button>{'  '}
                                        <Button onClick={() => { CategoryDetailsDelete(UserDataTable.id) }}> Delete</Button>{'  '}
                                    </td></tr>

                            )}
                        </tbody>
                    </Table>
                    : ''}
                {off ?
                    <AddCategory />
                    : ''}
            </Context.Provider>
        </div>
    )
}
export default CategoryDetails;