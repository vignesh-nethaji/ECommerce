import { useEffect, useState } from "react/cjs/react.development";
import { Button, CardHeader } from "reactstrap";

const SidePage = () => {

const [category, setCategory]=useState([]);
const [on , setOn] = useState(false)
    useEffect(()=>{
        fetch("http://localhost:40073/api/Category/GetAll")
        .then((response) => response.json())
        .then((data) => setCategory(data.data));
    },[])
    console.log(category)
    const SelectCategory =()=>{
        setOn(true)
    }
    const CategoryName =(id)=>{
        localStorage.setItem("CategoryIds", id)
        
    }   
return (
    <div>
        <CardHeader>
       <h3 onClick={()=>SelectCategory()}> Category <Button href="/ZeroDotOne/AddCategory">+</Button> </h3>
      {on ? 
       category.map((item)=>
           <p onClick={()=>CategoryName(item.id)}>{item.name}</p>
       )
       :''}
       </CardHeader>
    </div>
   
)
}
export default SidePage;
