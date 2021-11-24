

const Datatable =({UserDataTable,i})=>(
    <tr>
        <td>{i+1}</td>
        <td>{UserDataTable.email}</td>
        <td>{UserDataTable.password}</td>
        <td>{UserDataTable.username}</td>
        <td>{UserDataTable.firstname}</td>
        <td>{UserDataTable.lastname}</td>
        <td>{UserDataTable.city}</td>
        <td>{UserDataTable.address}</td>
        <td>{UserDataTable.zipcode}</td>
        <td>{UserDataTable.phoneNumber}</td>
        <td><a href="#">Edit</a></td>
        <td><a href="#">Delete</a></td>
    </tr>
)
export default Datatable;