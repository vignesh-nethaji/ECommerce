import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const Datatable =({UserDataTable,i})=>{
    const navigate = useNavigate();

    const UserDetailsEdit=(id)=>{
        navigate('/ZeroDotOne/AddUser')
        localStorage.setItem("UserEditID",id)   
    }

    return(
        <>
                <tr>
                    <td>{i+1}</td>
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
                    <td><Button onClick={()=>{UserDetailsEdit(UserDataTable.id)}}>Edit</Button> 
                    <Button href="#">Delete</Button></td>
                </tr>
        </>
    )
}
export default Datatable;