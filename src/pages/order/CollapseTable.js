import React, { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import AuthContext from "../../context/authProvider";
import { changeStatusOrder } from "../../api/orderApi";

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <TableRow {...otherProps}>
                <TableCell padding="checkbox">
                    <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? (
                            <KeyboardArrowUp />
                        ) : (
                            <KeyboardArrowDown />
                        )}
                    </IconButton>
                </TableCell>
                {children}
            </TableRow>
            {isExpanded && <>{expandComponent}</>}
        </>
    );
};

export default function CollapseTable({ rowsData, getList }) {
    const { auth } = useContext(AuthContext);
    return (
        <Paper>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" />
                        <TableCell align="center">Ngày</TableCell>
                        <TableCell align="center">Tên Khách Hàng</TableCell>
                        <TableCell align="center">Địa Chỉ</TableCell>
                        <TableCell align="center">Số Điện Thoại</TableCell>
                        <TableCell align="center">Tổng Đơn Hàng</TableCell>
                        <TableCell align="center">Tên Nhân Viên</TableCell>
                        <TableCell align="center">Trạng Thái</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {rows.map(row => (
              <React.Fragment key={row.name}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <IconButton>
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              </React.Fragment>
            ))} */}
                    {rowsData.map((row) => (
                        <ExpandableTableRow
                            key={row.id}
                            expandComponent={
                                <>
                                    {row.orderDetailsResponses.map(
                                        ({ productName, quantity, amount }) => (
                                            <TableRow key={productName}>
                                                <TableCell padding="checkbox" />

                                                <TableCell colSpan={3}>
                                                    {`Tên Sản Phẩm: ${productName}`}
                                                </TableCell>
                                                <TableCell colSpan={2}>
                                                    {`Số Lượng: ${quantity}`}
                                                </TableCell>
                                                <TableCell colSpan={2}>
                                                    {`Tổng: ${amount.toLocaleString(
                                                        "it-IT",
                                                        {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }
                                                    )}`}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </>
                            }
                        >
                            {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                            <TableCell align="center">
                                {new Date(row.createdDate).toLocaleDateString(
                                    "en-GB"
                                )}
                            </TableCell>
                            <TableCell align="center">
                                {row.customerName}
                            </TableCell>
                            <TableCell align="center">
                                {row.orderAddress}
                            </TableCell>
                            <TableCell align="center">
                                {row.orderPhone}
                            </TableCell>
                            <TableCell align="center">
                                {row.total.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </TableCell>
                            <TableCell align="center">
                                {row.staffName}
                            </TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">
                                <div className="cellAction">
                                    {row.status === "đang xử lý" ? (
                                        <div
                                            className="activeButton"
                                            onClick={async () => {
                                                try {
                                                    await changeStatusOrder({
                                                        id: row.id,
                                                        status: 2,
                                                        staffId: auth.id,
                                                    });
                                                    await getList();
                                                } catch (err) {
                                                    console.log(err);
                                                }
                                            }}
                                        >
                                            Giao Hàng
                                        </div>
                                    ) : null}
                                    {row.status === "đang giao" ? (
                                        <div
                                            className="activeButton"
                                            onClick={async () => {
                                                try {
                                                    await changeStatusOrder({
                                                        id: row.id,
                                                        status: 3,
                                                        staffId: auth.id,
                                                    });
                                                    await getList();
                                                } catch (err) {
                                                    console.log(err);
                                                }
                                            }}
                                        >
                                            Hoàn Thành
                                        </div>
                                    ) : null}
                                    {row.status === "đang xử lý" ? (
                                        <div
                                            className="deleteButton"
                                            onClick={async () => {
                                                try {
                                                    await changeStatusOrder({
                                                        id: row.id,
                                                        status: 4,
                                                        staffId: auth.id,
                                                    });
                                                    await getList();
                                                } catch (err) {
                                                    console.log(err);
                                                }
                                            }}
                                        >
                                            Hủy Hàng
                                        </div>
                                    ) : null}
                                </div>
                            </TableCell>
                        </ExpandableTableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
