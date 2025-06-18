import React from 'react'
import './App.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

const Form = () => {
    
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    course: '',
    cgpa: '',
    college: '',
    image: null,
  });

  const navigate = useNavigate();

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState(false);

  const URL = "http://localhost:3000";
  const submit = async () => {
    try {
      const res = await axios.post(URL, userData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      // alert("Data Added Successfully");
      setMessage(true);
      setSuccessMsg("Data Added Successfully");
      setMessageType("success");

      setTimeout(() => {
        setMessage(false);
        navigate('/');
      }, 3000);

      setUserData({
        name: '',
        age: '',
        course: '',
        cgpa: '',
        college: '',
        image: null,
      })
      
    } catch (error) {
        setMessage(true);
        setErrorMsg(error.message);
        setMessageType("error");

        setTimeout(() => {
          setMessage(false);
        }, 3000);
    }
  }


  const handleChange = (e) => {
    setUserData(prev => ({...prev, [e.target.name]: e.target.value}));
  }
  const handleChange2 = (e) => {
    setUserData(prev => ({...prev, [e.target.name]: e.target.files[0]}));
  }
  
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

        <div className="container">
          <div className="box">
            <label>Name: </label>
            <input type="text" name='name' onChange={handleChange} value={userData.name} />
          </div>
          <div className="box">
            <label>Age: </label>
            <input type="number" name='age' onChange={handleChange} value={userData.age} />
          </div>
          <div className="box">
            <label>Course: </label>
            <input type="text" name='course' onChange={handleChange} value={userData.course} />
          </div>
          <div className="box">
            <label>CGPA: </label>
            <input type="number" name='cgpa' onChange={handleChange} value={userData.cgpa} />
          </div>
          <div className="box">
            <label>College: </label>
            <input type="text" name='college' onChange={handleChange} value={userData.college} />
          </div>
          <div className="box">
            <label>Profile: </label>
            <input type="file" name='image' onChange={handleChange2}  />
          </div>

          <button onClick={submit} className='add-btn'>Submit</button>
        </div>
    </>
  )
}

export default Form
