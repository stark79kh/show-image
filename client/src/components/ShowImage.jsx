import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:8800');

const ShowImage = (props) => {
    const getUrl = 'http://localhost:8800/api/imgs';
    const category = props.category;
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const containerRef = useRef(null);

    const fetchData = useCallback(async () => {
        if (!hasMoreData) return; // Do not fetch if there is no more data
        setLoading(true);
        try {
            const response = await axios.get(
                `${getUrl}${category === 'all' ? `?page=${page}` : `?page=${page}&category=${category}`}`
            );
                const jsonData = response.data;
            if (jsonData.length === 0) {
                setHasMoreData(false); // Update the flag if there is no more data
            } else {
                setData((prevData) => [...prevData, ...jsonData]);
                setPage((prevPage) => prevPage + 1);
            }
                setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
        }
    }, [getUrl, category, page, hasMoreData]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const handleIntersect = (entries) => {
        const [entry] = entries;
            if (entry.isIntersecting && !loading) {
                fetchData();
            }
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        const containerElement = containerRef.current;
        if (containerElement) {
            observer.observe(containerElement);
        }

        return () => {
            if (containerElement) {
                observer.unobserve(containerElement);
            }
        };
    }, [fetchData, loading]);

    useEffect(() => {
        socket.on('newImage', (data) => {
            setData((prevData) => [data, ...prevData]);
        });
        return () => {
            socket.off('newImage');
        };
    }, []); 
    
    return (
        <div className='ShowIMG' ref={containerRef}>
            <div className='ShowIMG_box'>
                {data.map((item) => (
                    <a href={`/Detail/${item.id}`} className='ShowIMG_box_item' key={item.id}>
                        <img src={`/upload/${item.img}`} alt={item.name} />
                    </a>
                ))}
                {!hasMoreData && <div>No more data</div>}
                {loading && <div>Loading...</div>}
            </div>
        </div>
    );
};

export default ShowImage;