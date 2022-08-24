import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";

import CollapseTable from "./CollapseTable";
const Order = () => {
    return (
        <div className="list-product">
            <Sidebar />
            <div className="list-product-container">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">
                        <p>Đơn Hàng</p>
                    </div>
                    <CollapseTable />
                </div>
            </div>
        </div>
    );
};

export default Order;
