import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { getStaffById, updateAvatar, updateProfile } from "../../api/staffApi";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const accessLevel = [
    {
        value: 1,
        name: "Quản Lý",
    },
    {
        value: 2,
        name: "Nhân Viên",
    },
];

const EditStaff = () => {
    const { staffId } = useParams();
    const navigate = useNavigate();
    const [staffDetails, setStaffDetails] = useState();
    const [file, setFile] = useState("");
    const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [roleId, setRoleId] = useState("");

    useEffect(() => {
        const getStaffDetails = async () => {
            try {
                const response = await getStaffById(staffId);
                setStaffDetails(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getStaffDetails();
    }, [staffId, file]);

    useEffect(() => {
        (async () => {
            if (file) {
                try {
                    const formData = new FormData();
                    formData.append("file", file);
                    await updateAvatar(formData, {
                        userId: staffDetails?.id,
                        name: staffDetails?.name,
                    });
                    setFile("");
                } catch (err) {
                    console.log(err);
                }
            }
        })();
    }, [file]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const updateData = {
            id: staffDetails?.id,
            username: username || staffDetails?.username,
            password: staffDetails?.password,
            name: name || staffDetails?.name,
            address: address || staffDetails?.address,
            email: email || staffDetails?.email,
            phone: phone || staffDetails?.phone,
            createdDate: staffDetails?.createdDate,
            roleId: roleId || staffDetails?.roleId,
            active: staffDetails?.active,
        };
        try {
            await updateProfile(updateData);
            setUsername("");
            setName("");
            setAddress("");
            setEmail("");
            setPhone("");
            setRoleId("");
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    };

    console.log(staffDetails);

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : staffDetails?.imageUrl
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form encType="multipart/form-data">
                            <div className="formInput">
                                <label htmlFor="file">
                                    Hình ảnh:{" "}
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
                                <label>Tên Đăng Nhập</label>
                                <input
                                    type="text"
                                    placeholder="john_doe"
                                    required
                                    defaultValue={staffDetails?.username}
                                    // value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>

                            <div className="formInput">
                                <label>Access Level</label>
                                <select
                                    onChange={(e) =>
                                        setRoleId(Number(e.target.value))
                                    }
                                >
                                    {accessLevel.map(({ value, name }) => (
                                        <option
                                            value={value}
                                            selected={
                                                staffDetails?.roleId === value
                                            }
                                        >
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="formInput">
                                <label>Tên</label>
                                <input
                                    type="text"
                                    required
                                    defaultValue={staffDetails?.name}
                                    // value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="formInput">
                                <label>Địa Chỉ</label>
                                <input
                                    type="text"
                                    placeholder="Elton St. 216 NewYork"
                                    required
                                    defaultValue={staffDetails?.address}
                                    // value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="formInput">
                                <label>Email</label>
                                <input
                                    type="mail"
                                    placeholder="john_doe@gmail.com"
                                    required
                                    defaultValue={staffDetails?.email}
                                    // value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="formInput">
                                <label>Số Điện Thoại</label>
                                <input
                                    type="text"
                                    placeholder="+1 234 567 89"
                                    required
                                    defaultValue={staffDetails?.phone}
                                    // value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <button onClick={(e) => handleUpdateProfile(e)}>
                                Cập Nhật
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditStaff;
