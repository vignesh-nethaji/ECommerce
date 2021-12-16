import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Row, Col } from "reactstrap";
import AddCategory from "./AddCategory";
import Swal from "sweetalert2"
import HeaderPage from "./HeaderPage";
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
        if (window.confirm('Do You Want To Delete This Category?')) {

            axios.delete(("http://localhost:40073/api/Category/Delete/" + id),
                { headers: { "Authorization": `Bearer ${token}` } }
            )

                .then(res => {
                    getallCategoryDetails();
                    var toastMixin = Swal.mixin({
                        toast: true,
                        icon: 'success',
                        title: 'General Title',
                        animation: false,
                        position: 'top-right',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });

                    toastMixin.fire({
                        animation: true,
                        title: 'Category Deleted Successfully'
                    });

                })
        } else {

            return false;
        }

    }

    return (
        <div>
            <HeaderPage />

            <Context.Provider value={categoryEditID}>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">

                        <Button href="/ZeroDotOne/AddCategory">Add Category</Button>
                        {on ?
                            <table className="table table-striped" >
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Category Name</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoryDetails.map((UserDataTable, i) =>
                                        // <Datatable UserDataTable={items} i={i} key={items.id} />
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            {/* <td>{UserDataTable.id}</td> */}
                                            <td>{UserDataTable.name}</td>
                                            <td>
                                                <input type="button" value="Edit" className="btn btn-secondary" onClick={() => { CategoryDetailsEdit(UserDataTable.id) }}></input>
                                            </td>
                                            <td>
                                                <input type="button" value="Delete" className="btn btn-secondary" onClick={() => { CategoryDetailsDelete(UserDataTable.id) }}></input>



                                            </td></tr>
                                    )}
                                </tbody>
                            </table>
                            : ''}
                    </Col>
                    <Col md="6"></Col>
                </Row>
                {off ?
                    <AddCategory />
                    : ''}
            </Context.Provider>



        </div >
    )
}

export default CategoryDetails;