import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import { toast } from "react-toastify";
const Home = () => {
  //Hold data from mysql
  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };
  //Fetch data from backend
  useEffect(() => {
    loadData();
  }, []);
  const deleteContact = (id) => {
    if (window.confirm("Wanna remove this contact??")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Contact removed successfully");
      setTimeout(() => {
        loadData();
      }, 1000);
    }
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/addContact">
        <button className="btn btn-contact">Add contact</button>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Mobile</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>
                <Link to={`/update/${item.id}`}>
                  <button className="btn btn-edit">Edit </button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteContact(item.id)}
                >
                  Delete
                </button>
                <Link to={`/view/${item.id}`}>
                  <button className="btn btn-view">View </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
