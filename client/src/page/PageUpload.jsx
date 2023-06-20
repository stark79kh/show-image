import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:8800');

const PageUpload = () => {
    const [category, setCat] = useState([]);
    const [name, setName] = useState([]);
    const [file, setFile] = useState([]);

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
        console.log(imgUrl)
        try {
            await axios.post(`http://localhost:8800/api/imgs`, {
                name,
                category,
                img: file ? imgUrl : "",
            });
            alert('added a new photo')
            socket.emit('event', { message: 'Hello from the client' });
        } catch (error) {
            console.log(error)
        }
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
        </div>
    )
}

export default PageUpload
