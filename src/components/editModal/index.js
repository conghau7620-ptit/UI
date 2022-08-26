import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import "./style.scss";
function AddModal({ title, isOpen, setIsOpen, onHandleEdit, editRowData }) {
    const [name, setName] = useState("");

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2 id="parent-modal-title">Sửa {title}</h2>
                <form>
                    <div className="formInput">
                        <label>Tên</label>
                        <input
                            type="text"
                            required
                            value={name}
                            placeholder={editRowData?.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onHandleEdit({
                                id: editRowData.id,
                                name: name || editRowData?.name,
                                active: editRowData?.active,
                            });
                            setIsOpen(false);
                            setName("");
                        }}
                    >
                        Gửi
                    </button>
                </form>
            </Box>
        </Modal>
    );
}

export default AddModal;
