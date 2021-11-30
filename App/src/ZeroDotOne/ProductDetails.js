import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
 //import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import React from "react";
import CreateProduct from "./CreateProduct";


export const Context = React.createContext();

const ProductDetails = () => {

    const token = localStorage.getItem("UserTokenDetails")
    const [productDetails, setproductDtls] = useState([])
    const [editProductDtls, setEditproductDtls] = useState([])
    const [deleteProductDtls, setDelproductDtls] = useState([])

    const [on, setOnVal] = useState(true);
    const [off, setOffVal] = useState(false);

    const [productId, setSingproductDtls] = useState([])


    //const navigate = useNavigate();

    const GetProductDtls = () => {
        axios.get(("http://localhost:40073/api/Product/GetAll"),
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then(res => { setproductDtls(res.data.data) })
    }
    useEffect(() => {
        GetProductDtls();
    }, [token])
    console.log(productDetails);
    /////////////////////////////////////////////////////////////////////////////////////////
    const EditProductDtls = (id) => {

        setSingproductDtls(id);
        setOnVal(false);
        setOffVal(true);

        // axios.get(("http://localhost:40073/api/Product/Get/" + id),
        //     { headers: { "Authorization": `Bearer ${token}` } }
        // )
        //     .then(res => { setEditproductDtls(res.data.data) })

        // navigate('/ZeroDotOne/CreateProduct')
        //     localStorage.setItem("ProductEditID",id)    
    }
    console.log(productId);
    console.log(editProductDtls);

    ////////////////////////////////////////////////////////////////////////////////////////

    const DeleteProductDtls = (id) => {
        if (window.confirm('Do You Want To Delete This Product?')) {

            axios.delete(("http://localhost:40073/api/Product/Delete/" + id),
                { headers: { "Authorization": `Bearer ${token}` } }
            )
                .then(res => { setDelproductDtls(res.data.data) })

                .then(res => {
                    var toastMixin = Swal.mixin({
                        toast: true,
                        icon: 'success',
                        title: 'General Title',
                        animation: false,
                        position: 'top-right',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });

                    //document.querySelector(".second").addEventListener('click', function(){
                    toastMixin.fire({
                        animation: true,
                        title: 'Product Deleted Successfully'
                    });
                    GetProductDtls();
                })

            //});
            console.log(deleteProductDtls);
        } else {

            console.log('Thing was not saved to the database.');
        }
    }
    // const sdergfsy=()=>{
    //     if (editProductDtls !== null) {
    //         alert(editProductDtls.id);
    //     }
    // }

    // console.log(editProductDtls);
    return (
        <div>
            <Context.Provider value={productId}>
                {on ?
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>CateId</th>
                                <th>Edit</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {productDetails.map((items, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{items.id}</td>
                                    <td>{items.title}</td>
                                    <td>{items.price}</td>
                                    <td>{items.description}</td>
                                    <td>{items.image}</td>
                                    <td>{items.categoryId}</td>
                                    <td><Button id="btnEdit" value={items.id} onClick={(e) => EditProductDtls(items)}>Edit</Button></td>
                                    <td><Button id="btnDelete" value={items.id} onClick={() => DeleteProductDtls(items.id)}>Delete</Button></td>

                                </tr>
                            )}
                        </tbody>
                    </Table>
                    : ''}
                {off ?
                    <CreateProduct />
                    : ''}
            </Context.Provider>
        </div>

    )
}

export default ProductDetails;