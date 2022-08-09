import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../dataTableSource";
import { Link } from "react-router-dom";
import { getAllUser, updateUser } from "../../api/userAPI";

import "./style.scss";

const Datatable = () => {
    const [data, setData] = useState([]);

    const handleUnActive = async (id) => {
        const user = data.find((user) => user.id === id);
        delete user["imageUrl"];
        await updateUser({ ...user, active: false });
        const response = await getAllUser();
        setData(response.data);
    };

    const handleActive = async (id) => {
        const user = data.find((user) => user.id === id);
        delete user["imageUrl"];
        await updateUser({ ...user, active: true });
        const response = await getAllUser();
        setData(response.data);
    };

    useEffect(() => {
        const getAllUserData = async () => {
            const response = await getAllUser();
            console.log(response.data);
            setData(response.data);
        };
        getAllUserData();
    }, []);

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link
                            to={`/users/${params.row.id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="viewButton">View</div>
                        </Link>
                        {params.row.active ? (
                            <div
                                className="deleteButton"
                                onClick={() => handleUnActive(params.row.id)}
                            >
                                Unactive
                            </div>
                        ) : (
                            <div
                                className="activeButton"
                                onClick={() => handleActive(params.row.id)}
                            >
                                Active
                            </div>
                        )}
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New User
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default Datatable;