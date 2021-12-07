import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'reactstrap';
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
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
                {on ?
                    <div>
                        <Button onClick={() => { AdminDetailsEdit(userDetails.id) }}><FiEdit2 />{'  '} Edit</Button>
                        <Row>
                            <Col md="4">
                                <FaUserCircle style={{ width: "200px", height: "200px" }} className='yourProfileImg' />
                            </Col>
                            <Col md="8">

                                <h5 className="mt-3"> <BsDot /> Email Id:{' '}{userDetails.email}</h5>
                                <h5 className="mt-3"> <BsDot /> Username: {' '}{userDetails.username}</h5>
                                <h5 className="mt-3">  <BsDot />FirstName: {' '}{userDetails.firstname}</h5>
                                <h5 className="mt-3">  <BsDot />LastName: {' '}{userDetails.lastname}</h5>
                                <h5 className="mt-3">  <BsDot />City: {' '}{userDetails.city}</h5>
                                <h5 className="mt-3">  <BsDot />Address: {' '}{userDetails.address}</h5>
                                <h5 className="mt-3">  <BsDot />ZipCode: {' '}{userDetails.zipcode}</h5>
                                <h5 className="mt-3" >  <BsDot />Phone Number:{' '}{userDetails.phoneNumber}</h5>
                            </Col>
                        </Row>
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