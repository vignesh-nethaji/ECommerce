
const CartDetailsPage = () => {
    const orders = [localStorage.getItem("OrdersProducts")];
    console.log(orders)
    return (
        <div>
            {orders.map((items) => (
                <div>
                    <p>{items.id}</p>
                </div>
            ))}
        </div>
    )
}

export default CartDetailsPage;