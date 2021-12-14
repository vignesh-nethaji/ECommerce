import { useEffect, useState } from "react/cjs/react.development";
import { Row, Col } from "reactstrap";
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
                    <Row>
                        <Col md="1"><MdCategory style={{ width: "30px", height: "30px", marginLeft: "5px" }} /></Col>
                        <Col md="11"><h3 style={{ marginLeft: "15px" }}>Category</h3></Col>
                    </Row>
                    <table className="table table-striped" style={{ color: "#f8f9fa" }}>
                        <MenuItem onClick={() => CategoryName(0)}>All Product</MenuItem>
                        {category.map((item, i) =>
                            <MenuItem key={i} onClick={() => CategoryName(item.id)}>{item.name}</MenuItem>
                        )}
                    </table>
                </Menu>
            </ProSidebar>;


        </div>

    )
}
export default SidePage;
