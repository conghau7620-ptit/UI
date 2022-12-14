import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { typeColumn } from "../../dataTableSource";
import {
    getAllType,
    getOneTypeById,
    changeStatusType,
    createType,
    changeType,
} from "../../api/typeApi";
import AddModal from "../../components/addModal";
import EditModal from "../../components/editModal";

function Type() {
    const [editRowData, setEditRowData] = useState();
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const getTypeData = async () => {
        try {
            const response = await getAllType();
            setData(response.data.types);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTypeData();
    }, [isOpen]);

    useEffect(() => {
        if (searchValue) {
            const newData = data.filter((data) =>
                data.name
                    .toLowerCase()
                    .split(" ")
                    .join("")
                    .includes(
                        searchValue.toLowerCase().trim().split(" ").join("")
                    )
            );
            setData(newData);
        } else {
            getTypeData();
        }
    }, [searchValue]);

    const handleAcive = async (id) => {
        try {
            await changeStatusType({ id, active: true });
            const response = await getAllType();
            setData(response.data.types);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnactive = async (id) => {
        try {
            await changeStatusType({ id, active: false });
            const response = await getAllType();
            setData(response.data.types);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddType = async (name, active) => {
        try {
            const response = await createType({ name, active });
            setIsOpen(false);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditType = async (data) => {
        try {
            await changeType(data);
            const response = await getAllType();
            setData(response.data.types);
        } catch (err) {
            console.log(err);
        }
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "H??nh ?????ng",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div
                            className="viewButton"
                            onClick={async () => {
                                setIsEditOpen(true);
                                const response = await getOneTypeById(
                                    params.row.id
                                );
                                setEditRowData(response.data);
                            }}
                        >
                            S???a
                        </div>
                        {params.row.active ? (
                            <div
                                className="deleteButton"
                                onClick={() => handleUnactive(params.row.id)}
                            >
                                T???t Ho???t ?????ng
                            </div>
                        ) : (
                            <div
                                className="activeButton"
                                onClick={() => handleAcive(params.row.id)}
                            >
                                B???t Ho???t ?????ng
                            </div>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">
                        <div>
                            <input
                                type="text"
                                placeholder="T??m Ki???m..."
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                        <button
                            className="link"
                            onClick={() => setIsOpen(true)}
                        >
                            T???o M???i
                        </button>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={data}
                        columns={typeColumn.concat(actionColumn)}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </div>
            </div>
            <AddModal
                title="Danh M???c"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleAdd={handleAddType}
            />
            <EditModal
                title="Danh M???c"
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
                onHandleEdit={handleEditType}
                editRowData={editRowData}
            />
        </div>
    );
}

export default Type;
