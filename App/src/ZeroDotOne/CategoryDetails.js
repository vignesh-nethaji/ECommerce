import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Row, Col } from "reactstrap";
import AddCategory from "./AddCategory";
import swal from "sweetalert";
import HeaderPage from "./HeaderPage";
import SidePage from "./SidePage";
export const Context = React.createContext();

const CategoryDetails = () => {
    const token = localStorage.getItem("UserTokenDetails")
    const [categoryDetails, setCategoryDetails] = useState([])
    const [categoryEditID, setCategoryEditID] = useState(0);
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(false);
    const getallCategoryDetails = () => {
        axios.get(("http://localhost:40073/api/Category/GetAll"),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then(res => { setCategoryDetails(res.data.data) })
    }

    useEffect(() => {
        getallCategoryDetails();
    }, [token])

    const CategoryDetailsEdit = (id) => {
        setCategoryEditID(id);
        setOff(true);
        setOn(false);
    }
    const CategoryDetailsDelete = (id) => {
        if (window.confirm(' a category ')) {
            axios.delete(("http://localhost:40073/api/Category/Delete/" + id),
                { headers: { "Authorization": `Bearer ${token}` } }
            )
                .then(res => {
                    getallCategoryDetails();
                    swal({
                        title: "Done",
                        text: "*category Name is deleted*",
                        icon: "success",
                        timer: 2000,
                        button: false
                    })
                    this.setState({ redirect: this.state.redirect === false });
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }
    return (
        <div>
            <HeaderPage />

            <Row>
                <Col md="3" > <SidePage /></Col>
                <Col md="9" >
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
                                                <Button onClick={() => { CategoryDetailsDelete(UserDataTable.id) }}> Delete</Button>
                                            </td></tr>
                                    )}
                                </tbody>
                            </Table>
                            : ''}
                        {off ?
                            <AddCategory />
                            : ''}
                    </Context.Provider>
                </Col></Row>

        </div >
    )
}

export default CategoryDetails;