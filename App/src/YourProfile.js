import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import UserAdded from './UserAdded';
import HeaderPage from './ZeroDotOne/HeaderPage';

export const YourProfileId = React.createContext();

const YourProfile = () => {
    const token = localStorage.getItem("UserTokenDetails");
    const id = localStorage.getItem("UserIdDetails")
    const [userDetails, setUserDetails] = useState([])
    const [adminEditID, setAdminEditID] = useState(0);
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(false);

    const getallUserDetails = () => {
        axios.get(("http://localhost:40073/api/User/Get/" + id),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then(res => { setUserDetails(res.data.data) })
    }

    useEffect(() => {
        getallUserDetails();
    }, []);
    console.log(userDetails);
    const AdminDetailsEdit = (id) => {
        setAdminEditID(id);
        setOff(true);
        setOn(false);

    };

    return (
        <div>
            <YourProfileId.Provider value={adminEditID}>
                <HeaderPage />
                {on ? <div>
                    <div className="navbar-top">
                        <div className="title1">
                            <h1>Profile</h1>
                        </div>
                    </div>
                    <div className="sidenav">
                        <div className="profile">
                            <img src="/Img.png" alt="" width="100" height="100" />
                        </div>

                        <div className="sidenav-url">
                            <div className="url">
                                <h4 className="">{userDetails.username}</h4>
                                <hr align="center" />
                            </div>

                        </div>
                    </div>

                    <div className="main">
                        {/* <h2>IDENTITY</h2> */}
                        <div className="card">
                            <div className="card-body">
                                {/* <i className="fa fa-pen fa-xs edit"></i> */}
                                <FaUserEdit value={userDetails.id} onClick={() => { AdminDetailsEdit(userDetails.id) }} className="edit" />
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>UserName</td>
                                            <td>: </td>
                                            <td><h5 style={{ marginLeft: "8px", marginTop: "5px" }}>{userDetails.username}</h5></td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>:</td>
                                            <td><h5 style={{ marginLeft: "8px", marginTop: "5px" }}>{userDetails.email}</h5></td>
                                        </tr>
                                        <tr>
                                            <td>FirstName</td>
                                            <td>:</td>
                                            <td><h5 style={{ marginLeft: "8px", marginTop: "5px" }}>{userDetails.firstname}</h5></td>
                                        </tr>
                                        <tr>
                                            <td>LastName</td>
                                            <td>:</td>
                                            <td><h5 style={{ marginLeft: "8px", marginTop: "5px" }}>{userDetails.lastname}</h5></td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>:</td>
                                            <td><h5 style={{ marginLeft: "8px", marginTop: "5px" }}>{userDetails.address}</h5></td>
                                        </tr>
                                        <tr>
                                            <td>Country</td>
                                            <td>:</td>
                                            <td><h5 style={{ marginLeft: "8px", marginTop: "5px" }}>{userDetails.country}</h5></td>
                                        </tr>
                                        <tr>
                                            <td>Zipcode</td>
                                            <td>:</td>
                                            <td><h5 style={{ marginLeft: "8px", marginTop: "5px" }}>{userDetails.zipcode}</h5></td>
                                        </tr>
                                        <tr>
                                            <td>Phonenumber</td>
                                            <td>:</td>
                                            <td><h5 style={{ marginLeft: "8px", marginTop: "5px" }}>{userDetails.Phonenumber}</h5></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
                    : ''}
                {off ?
                    <div>

                        <UserAdded />
                    </div>
                    : ''}
            </YourProfileId.Provider>
        </div>

    )
}

export default YourProfile;
