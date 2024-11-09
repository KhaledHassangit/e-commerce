import Loading from "@components/feedback/Loading/Loading";
import SectionTitle from "@components/common/SectionTitle/SectionTitle";
import ProductDetails from "@components/eCommerce/ProductDetails/ProductDetails";
import { Table, Modal } from "react-bootstrap"
import useOrders from "@hooks/UseOrders";

const Orders = () => {
    const {
        loading,
        error,
        orderList,
        showModal,
        selectedProduct,
        viewDetailsHandler,
        closeModalHandler,
    } = useOrders();

    return (
        <>
            <Modal show={showModal} onHide={closeModalHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Products Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct.map((el) => (
                        <ProductDetails
                            key={el.id}
                            title={el.title}
                            img={el.img}
                            price={el.price}
                            quantity={el.quanitiy}
                            direction="column"
                            style={{ marginBottom: "10px" }}
                        />
                    ))}
                </Modal.Body>
            </Modal>

            <SectionTitle title="My Order" />
            <Loading status={loading} error={error} type="table">
                <Table>
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Items</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map((el) => (
                            <tr key={el.id}>
                                <td>#{el.id}</td>
                                <td>
                                    {el.items.length} item(s)
                                    {" / "}
                                    <span
                                        onClick={() => viewDetailsHandler(el.id)}
                                        style={{ textDecoration: "underline", cursor: "pointer" }}
                                    >
                                        Product Details
                                    </span>
                                </td>
                                <td>{el.subtotal.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Loading>
        </>
    )
}

export default Orders
