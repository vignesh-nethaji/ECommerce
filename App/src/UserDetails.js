import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Row, Col } from "reactstrap";
import UserAdded from "./UserAdded";
import Swal from 'sweetalert2';
import SidePage from "./ZeroDotOne/SidePage";
import { IoMdArrowRoundBack } from "react-icons/io";
import HeaderPage from "./ZeroDotOne/HeaderPage";
export const Context = React.createContext();

const UserDetails = () => {
    const token = localStorage.getItem("UserTokenDetails")
    const [userDetails, setUserDetails] = useState([])
    const [userEditID, setUserEditID] = useState(0);
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(false);

    const getallUserDetails = () => {
        axios.get(("http://localhost:40073/api/User/GetAll"),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then(res => { setUserDetails(res.data.data) })

    }

    useEffect(() => {
        getallUserDetails();
    }, [token]);
    const UserDetailsEdit = (id) => {
        setUserEditID(id);
        setOff(true);
        setOn(false);
    };
    const UserDetailsDelete = (id) => {
        if (window.confirm('Do You Want To Delete this User?')) {

            axios.delete(("http://localhost:40073/api/User/Delete/" + id),
                { headers: { "Authorization": `Bearer ${token}` } }
            )
                .then(res => {
                    getallUserDetails();
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
                        title: 'User Deleted Successfully'
                    });
                })
        } else {

            return false;
        }
    }
    return (
        <div>
            <HeaderPage />
            <Row>
                {/* <Col md="3"><SidePage /></Col> */}
                <Col md='12'>
                    <Context.Provider value={userEditID}>
                        <Button href="/ZeroDotOne/HomePage"><IoMdArrowRoundBack /></Button>{"   "}

                        <Button href="/ZeroDotOne/AddUser">Add User</Button>
                        {on ?
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Email Id</th>
                                        <th>Password</th>
                                        <th>User Name</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>City</th>
                                        <th>Address</th>
                                        <th>Zip Code</th>
                                        <th>Phone Number</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails.map((UserDataTable, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{UserDataTable.email}</td>
                                                <td>{UserDataTable.password}</td>
                                                <td>{UserDataTable.username}</td>
                                                <td>{UserDataTable.firstname}</td>
                                                <td>{UserDataTable.lastname}</td>
                                                <td>{UserDataTable.city}</td>
                                                <td>{UserDataTable.address}</td>
                                                <td>{UserDataTable.zipcode}</td>
                                                <td>{UserDataTable.phoneNumber}</td>
                                                <td>
                                                    <Button onClick={() => { UserDetailsEdit(UserDataTable.id) }}>Edit</Button>{'  '}</td>
                                                <td><Button onClick={() => { UserDetailsDelete(UserDataTable.id) }}>Delete</Button></td>
                                            </tr>
                                        )
                                    }
                                        // <Datatable UserDataTable={items} i={i} key={items.id} />

                                    )}
                                </tbody>
                            </Table>
                            : ''}
                        {off ?
                            <UserAdded />
                            : ''}
                    </Context.Provider>
                </Col>
            </Row>
        </div >
    )
}
export default UserDetails;