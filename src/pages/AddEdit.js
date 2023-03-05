import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  mobile: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, mobile } = state;
  const navigate = useNavigate;
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    if (!name || !email || !mobile) {
      toast.error("Please provide the value to each entry block");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            name,
            email,
            mobile,
          })
          .then(() => {
            setState({ name: "", email: "", mobile: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Added Successfully");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            name,
            email,
            mobile,
          })
          .then(() => {
            setState({ name: "", email: "", mobile: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Updated Successfully");
      }

      // navigate("/");
      setTimeout(() => {
        navigate("/");
      }, 100);
      // const post = () => {
      //   navigate("/");
      // };
    }
    e.preventDefault();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          id="name"
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your Email..."
          value={email || ""}
          id="email"
          onChange={handleInputChange}
        />

        <label htmlFor="moblie">Mobile No.</label>
        <input
          type="number"
          name="mobile"
          placeholder="Your Mobile Number..."
          value={mobile || ""}
          id="mobile"
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
