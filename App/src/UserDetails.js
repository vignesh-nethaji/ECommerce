import axios from "axios";
import { useEffect, useState } from "react"; 
import Datatable from "./DataTable";
import { Table } from "reactstrap";
  

const UserDetails =() =>{

    const UserId = localStorage.getItem("UserIdDetails")
    const token = localStorage.getItem("UserTokenDetails")
    const [userDetails, setUserDetails] = useState([])

   useEffect(()=>{
    axios.get(("http://localhost:40073/api/User/GetAll"),
    { headers: {"Authorization" : `Bearer ${token}`} }
    )
    .then(res => {setUserDetails(res.data.data)})
   },[token])
   console.log(userDetails);
   console.log(UserId);  
    return(
        <div>
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