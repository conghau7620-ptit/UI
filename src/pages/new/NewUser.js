import React, { useState } from "react";

import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { createUser } from "../../api/userAPI";
import "./style.scss";

const NewUser = () => {
    const [file, setFile] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState(3);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleCreateUser = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", file);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("roleId", roleId);
        formData.append("name", name);
        formData.append("address", address);
        formData.append("email", email);
        formData.append("phone", phone);

        try {
            await createUser(formData);
            console.log("success");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New User</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form
                            onSubmit={handleCreateUser}
                            encType="multipart/form-data"
                        >
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image:{" "}
                                    <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            <div className="formInput">
                                <label>UserName</label>
                                <input
                                    type="text"
                                    placeholder="john_doe"
                                    required
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>

                            <div className="formInput">
                                <label>Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div className="formInput">
                                <label>Access Level</label>
                                <select
                                    onChange={(e) => setRoleId(e.target.value)}
                                    value={roleId}
                                >
                                    <option value="1">Admin</option>
                                    <option value="2">Staff</option>
                                    <option value="3">Customer</option>
                                </select>
                            </div>

                            <div className="formInput">
                                <label>Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="formInput">
                                <label>Address</label>
                                <input
                                    type="text"
                                    placeholder="Elton St. 216 NewYork"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="formInput">
                                <label>Email</label>
                                <input
                                    type="mail"
                                    placeholder="john_doe@gmail.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="formInput">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    placeholder="+1 234 567 89"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <button>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewUser;
