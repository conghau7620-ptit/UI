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
        width: 230,
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
        width: 230,
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 230,
    },
    {
        field: "active",
        headerName: "Active",
        width: 160,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.active}`}>
                    {params.row.active ? "Yes" : "No"}
                </div>
            );
        },
    },
];
