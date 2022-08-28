import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import EditModal from "../../components/editModal";

import {
    getAllBrand,
    changeStatusBrand,
    createBrand,
    getOneBrandById,
    changeBrand,
} from "../../api/brandApi";
import { brandColumn } from "../../dataTableSource";
import AddModal from "../../components/addModal";

function Brand() {
    const [editRowData, setEditRowData] = useState();
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const getBrandDetail = async () => {
        try {
            const response = await getAllBrand();
            setData(response.data.brands);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBrandDetail();
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
            getBrandDetail();
        }
    }, [searchValue]);

    const handleAcive = async (id) => {
        try {
            await changeStatusBrand({ id, active: true });
            const response = await getAllBrand();
            setData(response.data.brands);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnactive = async (id) => {
        try {
            await changeStatusBrand({ id, active: false });
            const response = await getAllBrand();
            setData(response.data.brands);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddBrand = async (name, active) => {
        try {
            const response = await createBrand({ name, active });
            setIsOpen(false);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditBrand = async (data) => {
        try {
            await changeBrand(data);
            const response = await getAllBrand();
            setData(response.data.brands);
        } catch (err) {
            console.log(err);
        }
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Hành Động",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div
                            className="viewButton"
                            onClick={async () => {
                                setIsEditOpen(true);
                                const response = await getOneBrandById(
                                    params.row.id
                                );
                                setEditRowData(response.data);
                            }}
                        >
                            Sửa
                        </div>
                        {params.row.active ? (
                            <div
                                className="deleteButton"
                                onClick={() => handleUnactive(params.row.id)}
                            >
                                Tắt Hoạt Động
                            </div>
                        ) : (
                            <div
                                className="activeButton"
                                onClick={() => handleAcive(params.row.id)}
                            >
                                Bật Hoạt Động
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
                                placeholder="Tìm Kiếm..."
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                        <button
                            className="link"
                            onClick={() => setIsOpen(true)}
                        >
                            Tạo Mới
                        </button>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={data}
                        columns={brandColumn.concat(actionColumn)}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </div>
            </div>
            <AddModal
                title="Thương Hiệu"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleAdd={handleAddBrand}
            />
            <EditModal
                title="Thương Hiệu"
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
                onHandleEdit={handleEditBrand}
                editRowData={editRowData}
            />
        </div>
    );
}

export default Brand;
