import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './View.css'; // Custom CSS for View
import { useNavigate, useParams } from 'react-router-dom';
import avatar from '../src/assets/avatar/avatar.png';
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const View = () => {
  const [student, setStudents] = useState({
    age: '',
    cgpa: '',
    college: '',
    course: '',
    image: '',
    name: '',
  });

  const [editing, setEditing] = useState(false);

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState(false);

  const { id } = useParams();

  const Navigate = useNavigate();

  const URL = "https://multer-student-1.onrender.com";
  const Profile_URL = "https://multer-student-1.onrender.com/delete-profile";

  const fetchStudents = async () => {
    try {
      const res = await axios.get(URL);
      console.log(res.data.student);
      const students = res.data.student;

      for (let stud of students) {
        if (stud._id == id) {
          setStudents({
            age: stud.age,
            cgpa: stud.cgpa,
            college: stud.college,
            course: stud.course,
            image: stud.image,
            name: stud.name,
          });
        }
      }

    } catch (error) {
        setMessage(true);
        setErrorMsg(error.message);
        setMessageType("error");

        setTimeout(() => {
          setMessage(false);
        }, 3000);
    }
  };

  const deleteFunc = async(e) => {
    e.preventDefault();
    try {
        await axios.delete(`${URL}/${id}`);

        Navigate('/');
    } catch (error) {
        setMessage(true);
        setErrorMsg(error.message);
        setMessageType("error");

        setTimeout(() => {
          setMessage(false);
        }, 3000);
    }
  }

  const updation = async(e) => {
    e.preventDefault();
    try {
        await axios.put(`${URL}/${id}`, student);

        setMessage(true);
        setSuccessMsg("Data Updated Successfully");
        setMessageType("success");

        setTimeout(() => {
          setMessage(false);
        }, 3000);

        setEditing(false);
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
      setStudents(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const deleteProfile = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.delete(`${Profile_URL}/${id}`);
        console.log(res);

        setMessage(true);
        setSuccessMsg("Profile Pic Deleted Successfully");
        setMessageType("success");

        setTimeout(() => {
          setMessage(false);
          window.location.reload();
        }, 3000);
    } catch (error) {
        setMessage(true);
        setErrorMsg(error.message);
        setMessageType("error");

        setTimeout(() => {
          setMessage(false);
        }, 3000);
    }
  }

  const uploadPic = async () => {
    try {
        if (!student.image || !(student.image instanceof File)) {
          setMessage(true);
          setErrorMsg("Please Select the Image Firstly");
          setMessageType("error");

          setTimeout(() => {
            setMessage(false);
          }, 3000);
          return;
        }

        const formData = new FormData();
        formData.append('image', student.image);

        const res = await axios.put(`${URL}/${id}/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })

        setMessage(true);
        setSuccessMsg("Profile pic Uploaded Successfully");
        setMessageType("success");

        setTimeout(() => {
          setMessage(false);
          window.location.reload();
        }, 3000);
    } catch (error) {
        setMessage(true);
        setErrorMsg(error.message);
        setMessageType("error");

        setTimeout(() => {
          setMessage(false);
        }, 3000);
    }
  }

  const cancel = () => {
    setEditing(false);
    Navigate('/');
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="view-container">
      <h2>Student Profiles</h2>
      { 
        !editing &&
        <div className="card-grid">
        <div className="student-card">
          <img
            src={student.image? `https://multer-student-1.onrender.com/uploads/${student.image}` : avatar}
            alt={student.name}
            className="student-image"
          />
          <div className="student-info">
            <h3>{student.name}</h3>
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>CGPA:</strong> {student.cgpa}</p>
            <p><strong>College:</strong> {student.college}</p>
          </div>
          <div>
            <button onClick={()=>setEditing(true)}>Edit</button>
            <button onClick={()=>Navigate(-1)}>Back</button>
          </div>
        </div>
      </div> }

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

      {
        editing && 
        <div className="card-grid">
          <div className="student-card">
            <img
              src={student.image? `https://multer-student-1.onrender.com/uploads/${student.image}` : avatar}
              alt={student.name}
              className="student-image"
            />
            <div className="profile-sub-div">
              <button onClick={deleteProfile}>Delete Profile</button>
              <button className="upload-btn" onClick={uploadPic}>Upload Profile</button>
            </div>
            <input type="file" name="image" 
              onChange={(e) =>setStudents({ ...student, image: e.target.files[0] })} />

            <div className="student-info editing-info">
              <div className="flex-fields">
                <div className="form-fields">
                  <label>Name: </label>
                  <input type="text" name="name" value={student.name || ''} onChange={handleChange} required />
                </div>
                <div className="form-fields">
                  <label>Age: </label>
                  <input type="text" name="age" value={student.age || ''} onChange={handleChange} required />
                </div>
              </div>
              <div className="flex-fields">
                <div className="form-fields">
                  <label>Course: </label>
                  <input type="text" name="course" value={student.course || ''} onChange={handleChange} required />
                </div>
                <div className="form-fields">
                  <label>CGPA: </label>
                  <input type="text" name="cgpa" value={student.cgpa || ''} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-fields">
                <label>College: </label>
                <input type="text" name="college" value={student.college || ''} onChange={handleChange} required />
              </div>
            </div>
            <div className="editing-btns">
              <button onClick={cancel}>Cancel</button>
              <button onClick={updation}>Update</button>
              <button onClick={deleteFunc}>Delete</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default View;
