import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Row, Col } from "reactstrap";
import UserAdded from "./UserAdded";
import HeaderPage from "./ZeroDotOne/HeaderPage";
import swal from 'sweetalert';
import SidePage from "./ZeroDotOne/SidePage";
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
        if (window.confirm('Sure want to delete this User?')) {

            axios.delete(("http://localhost:40073/api/User/Delete/" + id),
                { headers: { "Authorization": `Bearer ${token}` } }
            )
                .then(res => {
                    getallUserDetails();
                    swal({
                        title: "Done!",
                        text: "User is Deleted into Database",
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
                <Col md="3"><SidePage /></Col>
                <Col md='8'>
                    <Context.Provider value={userEditID}>
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
                                                    <Button onClick={() => { UserDetailsEdit(UserDataTable.id) }}>Edit</Button>{'  '}
                                                    <Button onClick={() => { UserDetailsDelete(UserDataTable.id) }} backgroundColor='#3fffff' >Delete</Button></td>
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