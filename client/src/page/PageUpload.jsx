import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Modal from 'react-modal';
import '../modalStyles.scss'

const socket = io('http://localhost:8800');

const PageUpload = () => {
    const [category, setCat] = useState([]);
    const [name, setName] = useState([]);
    const [file, setFile] = useState([]);
    const [isOpenModalErr, setIsOpenModalErr] = useState(false);
    const [isOpenModalDone, setIsOpenModalDone] = useState(false);

    const closeModalErr = () => {
        setIsOpenModalErr(false);
    };

    const closeModalDone = () => {
        setName('');
        setCat('');
        setFile('');
        setIsOpenModalDone(false);
    };



    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("http://localhost:8800/api/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();
        if (category.length === 0 || name.length === 0 || file.length === 0) {
            setIsOpenModalErr(true)
        } else {
            try {
                await axios.post(`http://localhost:8800/api/imgs`, {
                    name,
                    category,
                    img: file ? imgUrl : "",
                });
                socket.emit('newImage', { message: 'Hello from the client' });
                setIsOpenModalDone(true);
            } catch (error) {
                console.log(error)
            }
        }
    };
    
    const customStylesModalErr = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '330px',
            padding: '20px',
            backgroundColor: 'beige',
            borderRadius: '8px',
        },
    };

    const customStylesModalDone = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '330px',
            padding: '20px',
            backgroundColor: 'lightgreen',
            borderRadius: '8px',
        },
    };

    return (
        <div className='PageUpload'>
            <div className='PageUpload_box'>
                <div className='PageUpload_box_tile'>
                    Upload Image
                </div>
                <div className='PageUpload_box_item'>
                    <div className='PageUpload_box_label'>
                        Name image:
                    </div>
                    <input
                        className='PageUpload_box_input'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='PageUpload_box_item'>
                    <div className='PageUpload_box_label'>
                        Cagotery:
                    </div>
                    <div className='PageUpload_box_cagotery'>
                        <input
                            type="radio"
                            checked={category === "people"}
                            name="people"
                            value="people"
                            id="people"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="People">People</label>
                    </div>
                    <div className='PageUpload_box_cagotery'>
                        <input type="radio"
                            checked={category === "animal"}
                            name="animal"
                            value="animal"
                            id="animal"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="Animal">Animal</label>
                    </div>
                    <div className='PageUpload_box_cagotery'>
                        <input type="radio"
                            checked={category === "nature"}
                            name="nature"
                            value="nature"
                            id="nature"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="Nature">Nature</label>
                    </div>
                    <div className='PageUpload_box_cagotery'>
                        <input type="radio"
                            checked={category === "technology"}
                            name="technology"
                            value="technology"
                            id="technology"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="Technology">Technology</label>
                    </div>
                    <div className='PageUpload_box_cagotery'>
                        <input type="radio"
                            checked={category === "transport"}
                            name="transport"
                            value="transport"
                            id="transport"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="Transport">Transport</label>
                    </div>
                </div>
                <div className='PageUpload_box_item'>
                    <div className='PageUpload_box_upload'>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            name=""
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label className="PageUpload_box_upload_file" htmlFor="file">
                            Upload Image
                        </label>
                        <div className="PageUpload_box_upload_file_nameFile">
                            {file.name}
                        </div>
                    </div>
                </div>
                <div className='PageUpload_box_item_button'>
                    <button onClick={handleClick}>Add Image</button>
                </div>
            </div>
            <Modal
                isOpen={isOpenModalErr}
                onRequestClose={closeModalErr}
                style={customStylesModalErr}
            >
                <div className='Modal'>
                    <button className='Modal_button' onClick={closeModalErr}>X</button>
                    <div className='Modal_text_err'>write name, choose category, upload photo before adding</div>
                </div>
            </Modal>
            <Modal
                isOpen={isOpenModalDone}
                onRequestClose={closeModalDone}
                style={customStylesModalDone}
            >
                <div className='Modal'>
                    <button className='Modal_button' onClick={closeModalDone}>X</button>
                    <div className='Modal_text_done'>Image has been added</div>
                </div>
            </Modal>
        </div>
    )
}

export default PageUpload
