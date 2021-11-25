import axios from "axios";
import { useEffect, useState } from "react"; 
import Datatable from "./DataTable";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
  

const UserDetails =() =>{

    const navigate = useNavigate();
    const token = localStorage.getItem("UserTokenDetails")
    const [userDetails, setUserDetails] = useState([])

   useEffect(()=>{
    axios.get(("http://localhost:40073/api/User/GetAll"),
    { headers: {"Authorization" : `Bearer ${token}`} }
    )
    .then(res => {setUserDetails(res.data.data)})
   },[token])
   console.log(userDetails); 
   
   const AddUser =()=>{
    navigate("/ZeroDotOne/AddUser")
}
    return(
        <div>
             <Button href="/ZeroDotOne/AddUser">Add User</Button>
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
                {userDetails.map((items,i)=>
                    <Datatable UserDataTable={items} i={i} key={items.id}/>
                )}
                </tbody>
            </Table>
        </div>
    )
}
export default UserDetails;