import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import avatar from '../src/assets/avatar/avatar.png'
import './app.css'
import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

const ViewAll = () => {

    const [image, setImage] = useState([]);

    const navigate = useNavigate();

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState(false);

    const [loading, setLoading] = useState(true);

    const URL = "https://multer-student-1.onrender.com";
    const getData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(URL);
            setImage(res.data.student);

        } catch (error) {
            setMessage(true);
            setErrorMsg(error.message);
            setMessageType("error");

            setTimeout(() => {
            setMessage(false);
            }, 3000);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            {message && (
                <div className={`toast-msg ${messageType}`}>
                    <div className="progress-bar"></div>
                    <span className="icon">
                        {messageType === 'success' ? <AiOutlineCheckCircle size={24} /> : <AiOutlineWarning size={24} />}
                    </span>
                    <p>{messageType === 'success' ? successMsg : errorMsg}</p>
                    <button className="close-btn" onClick={() => setMessage(false)}>
                        <IoClose size={22} />
                    </button>
                </div>
            )}

            <div className="add-data">
                <h1>Student Info Hub: A Multer Learning Experience</h1>
                <button onClick={()=>navigate('/add')}>
                    <FaPlus /> <span className='add-txt'>Add Data</span>
                </button>
            </div>

            {loading && <h2>Loading student data...</h2>}
            {!loading && image.length === 0 && <h1>No Student Data Available</h1>}

            <div className="image-gallery" >
                {image.map((val, key) => (
                    <div key={key} className="image-card" onClick={() => navigate(`/view/${val._id}`)}>
                        <img src={val.image? `https://multer-student-1.onrender.com/uploads/${val.image}` : avatar} 
                        alt={val.name} className="profiles" />
                        <h4>{val.name}</h4>
                        <p>{val.course}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ViewAll