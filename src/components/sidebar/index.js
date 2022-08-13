import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import BadgeIcon from "@mui/icons-material/Badge";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import AuthContext from "../../context/authProvider";
import { removeItem } from "../../common/storage/local";
import { useNavigate } from "react-router-dom";

import "./style.scss";
const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeItem("TOKEN");
        return navigate("/login");
    };
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Cong Hau Shop</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <DashboardIcon className="icon" />
                        <span>Dashboard</span>
                    </li>
                    <p className="title">LISTS</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>User</span>
                        </li>
                    </Link>
                    {auth?.roleId === 1 ? (
                        <Link to="/staff" style={{ textDecoration: "none" }}>
                            <li>
                                <PersonOutlineIcon className="icon" />
                                <span>Staff</span>
                            </li>
                        </Link>
                    ) : null}
                    <Link to="/products" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span>Products</span>
                        </li>
                    </Link>
                    <Link to="/type" style={{ textDecoration: "none" }}>
                        <li>
                            <CategoryIcon className="icon" />
                            <span>Type</span>
                        </li>
                    </Link>
                    <Link to="/brand" style={{ textDecoration: "none" }}>
                        <li>
                            <BadgeIcon className="icon" />
                            <span>Brand</span>
                        </li>
                    </Link>
                    <p className="title">USEFUL</p>
                    <li>
                        <InsertChartIcon className="icon" />
                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsNoneIcon className="icon" />
                        <span>Notifications</span>
                    </li>
                    <p className="title">SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className="icon" />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon className="icon" />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className="icon" />
                        <span>Settings</span>
                    </li>
                    <p className="title">USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Profile</span>
                    </li>
                    <li>
                        <ExitToAppIcon className="icon" />
                        <span onClick={handleLogout}>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div
                    className="colorOption"
                    onClick={() => dispatch({ type: "LIGHT" })}
                ></div>
                <div
                    className="colorOption"
                    onClick={() => dispatch({ type: "DARK" })}
                ></div>
            </div>
        </div>
    );
};

export default Sidebar;
