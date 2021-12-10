import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { MdCategory } from "react-icons/md"

const SidePage = (props) => {
    const [category, setCategory] = useState([]);
    const token = localStorage.getItem("UserTokenDetails");

    useEffect(() => {
        axios.get(("http://localhost:40073/api/Category/GetAll"),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then(res => { setCategory(res.data.data) })
    }, [token])
    const CategoryName = (id) => {
        localStorage.setItem("CategoryIds", id)
        props.callback();
    }

    return (
        <div style={{ height: "100%" }}>
            <ProSidebar>
                <Menu iconShape="square">
                    <SubMenu title="Categorys" className="categoryicon" icon={<MdCategory />}>
                        <MenuItem onClick={() => CategoryName(0)}>All Product</MenuItem>
                        {category.map((item, i) =>
                            <MenuItem key={i} onClick={() => CategoryName(item.id)}>{item.name}</MenuItem>
                        )}
                    </SubMenu>
                </Menu>
            </ProSidebar>;
        </div>

    )
}
export default SidePage;
