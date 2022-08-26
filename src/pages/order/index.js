import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { getAllOrder } from "../../api/orderApi";
import CollapseTable from "./CollapseTable";
const Order = () => {
    const [rows, setRows] = useState([]);

    const getOrderList = async () => {
        try {
            const response = await getAllOrder();
            setRows(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getOrderList();
    }, []);
    return (
        <div className="list-product">
            <Sidebar />
            <div className="list-product-container">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">
                        <p>Đơn Hàng</p>
                    </div>
                    <CollapseTable rowsData={rows} getList={getOrderList} />
                </div>
            </div>
        </div>
    );
};

export default Order;
