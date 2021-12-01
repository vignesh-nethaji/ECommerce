import { useEffect, useState } from "react/cjs/react.development";
import { CardHeader } from "reactstrap";
import axios from "axios";
const SidePage = () => {
    const [category, setCategory] = useState([]);
    const [on, setOn] = useState(false);
    const token = localStorage.getItem("UserTokenDetails");

    useEffect(() => {
        axios.get(("http://localhost:40073/api/Category/GetAll"),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then(res => { setCategory(res.data.data) })
    }, [token])

    const SelectCategory = () => {
        setOn(true)
    }

    const CategoryName = (id) => {
        localStorage.setItem("CategoryIds", id)

    }

    return (
        <div>
            <CardHeader onClick={() => SelectCategory()}>
                <h3> Category </h3>
                {on ?
                    category.map((item, i) =>
                        <p key={i} onClick={() => CategoryName(item.id)}>{item.name}</p>
                    )
                    : ''}

            </CardHeader>
        </div>

    )
}
export default SidePage;
