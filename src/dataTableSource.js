export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "name",
        headerName: "Name",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="cellImg"
                        src={
                            params.row.imageUrl ||
                            "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        }
                        alt="avatar"
                    />
                    {params.row.name}
                </div>
            );
        },
    },
    {
        field: "roleId",
        headerName: "Access Level",
        width: 150,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.roleId}`}>
                    {params.row.roleId === 1
                        ? "Admin"
                        : params.row.roleId === 2
                        ? "Staff"
                        : "Customer"}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },
    {
        field: "address",
        headerName: "Address",
        width: 300,
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 200,
    },
    {
        field: "active",
        headerName: "Active",
        width: 100,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.active}`}>
                    {params.row.active ? "Yes" : "No"}
                </div>
            );
        },
    },
];

export const typeColumn = [
    { field: "id", headerName: "ID", width: 70 },

    {
        field: "name",
        headerName: "Name",
        width: 100,
    },

    {
        field: "active",
        headerName: "Active",
        width: 100,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.active}`}>
                    {params.row.active ? "Yes" : "No"}
                </div>
            );
        },
    },
];

export const brandColumn = [
    { field: "id", headerName: "ID", width: 70 },

    {
        field: "name",
        headerName: "Name",
        width: 100,
    },

    {
        field: "active",
        headerName: "Active",
        width: 100,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.active}`}>
                    {params.row.active ? "Yes" : "No"}
                </div>
            );
        },
    },
];

export const productsColumn = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "name",
        headerName: "Name",
        width: 300,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="cellImg"
                        src={
                            params.row.imageUrls[0] ||
                            "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        }
                        alt="avatar"
                    />
                    {params.row.name}
                </div>
            );
        },
    },
    {
        field: "description",
        headerName: "Description",
        width: 500,
    },

    {
        field: "price",
        headerName: "Price",
        width: 200,
        renderCell: (params) => {
            return (
                <div>
                    {params.row.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                    })}
                </div>
            );
        },
    },
    {
        field: "quantity",
        headerName: "Quantity",
        width: 100,
    },
    {
        field: "discount",
        headerName: "Discount",
        width: 100,
    },
    {
        field: "type",
        headerName: "Type",
        width: 100,
    },
    {
        field: "brand",
        headerName: "Brand",
        width: 100,
    },

    {
        field: "active",
        headerName: "Active",
        width: 100,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.active}`}>
                    {params.row.active ? "Yes" : "No"}
                </div>
            );
        },
    },
];
