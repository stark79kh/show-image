import React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

const PageDetailImage = () => {
    const [detail, setDetail] = useState({});
    const location = useLocation();

    const detailId = location.pathname.split("/")[2];
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/imgs/${detailId}`);
                setDetail(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [detailId]);

    console.log(detail)

    return (
        <div className='pageDetail'>
            <div className='pageDetail_row'>
                <div className='pageDetail_row_type'>
                    Name Image:
                </div>
                <div className='pageDetail_row_text'>
                    {detail[0]?.name}
                </div>
            </div>
            <div className='pageDetail_row'>
                <div className='pageDetail_row_type'>
                    Category:
                </div>
                <div className='pageDetail_row_text'>
                    {detail[0]?.category}
                </div>
            </div>
            <div className='pageDetail_img'>
                <img src={`/upload/${detail[0]?.img}`} alt={detail[0]?.name} />
            </div>
        </div>
    )
}

export default PageDetailImage
