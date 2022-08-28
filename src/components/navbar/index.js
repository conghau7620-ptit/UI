import React, { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import AuthContext from "../../context/authProvider";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import "./style.scss";

const Navbar = () => {
    const { dispatch } = useContext(DarkModeContext);
    const { auth } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="wrapper">
                <div>
                    {/* <input type="text" placeholder="Search..." />
                    <SearchOutlinedIcon /> */}
                </div>
                <div className="items">
                    <div className="item">
                        <img
                            src={
                                auth.imageUrl ||
                                "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            }
                            alt=""
                            className="avatar"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
