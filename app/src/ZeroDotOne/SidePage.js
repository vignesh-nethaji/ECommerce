import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";

const SidePage = (props) => {
    const [category, setCategory] = useState([]);
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
        <div style={{ height: "100%" }}>
            <ProSidebar>
                <Menu iconShape="square">
                    <SubMenu title="Categorys" icon={<MdCategory />}>
                        {category.map((item, i) =>
                            <MenuItem key={i}>{item.name}</MenuItem>
                        )}
                    </SubMenu>
                </Menu>
            </ProSidebar>;
        </div>

    )
}
export default SidePage;
