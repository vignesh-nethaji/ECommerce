const CategoryTable =({CategoryTable,i})=>(
    <tr>
        <td>{i+1}</td>
        <td>{CategoryTable.id}</td>
        <td>{CategoryTable.name}</td>       
        <td><a href="#">Edit</a></td>
        <td><a href="#">Delete</a></td>
    </tr>
)
export default CategoryTable;