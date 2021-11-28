import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import UserAdded from "./UserAdded";

export const Context = React.createContext();

const UserDetails = () => {
    const token = localStorage.getItem("UserTokenDetails")
    const [userDetails, setUserDetails] = useState([])
    const [userEditID, setUserEditID] = useState(0);
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(false);

    useEffect(() => {
        axios.get(("http://localhost:40073/api/User/GetAll"),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then(res => { setUserDetails(res.data.data) })
    }, [token])
    console.log(userDetails);

    const UserDetailsEdit = (id) => {
        setUserEditID(id);
        setOff(true);
        setOn(false);
    }
    return (
        <div>
            <Context.Provider value={userEditID}>
                <Button href="/ZeroDotOne/AddUser">Add User</Button>
                {on ?
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Id</th>
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
                            {userDetails.map((UserDataTable, i) =>
                                // <Datatable UserDataTable={items} i={i} key={items.id} />
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{UserDataTable.id}</td>
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
                                        <Button href="#">Delete</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    : ''}
                {off ?
                    <UserAdded />
                    : ''}
            </Context.Provider>
        </div>
    )
}
export default UserDetails;