import React from "react";
import { useState } from "react";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";

const Update = ({ setupdate, id, title, rating, price, discount }) => {
  const [updatevalue, setupdatevalue] = useState({
    Rating: "",
    Price: "",
    Discount: "",
    Title: "",
  });
  const handleupdatevalue = (e) => {
    setupdatevalue((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };
  const UpdateID = async (req, res) => {
    const { Rating, Price, Discount, Title } = updatevalue;
    try {
      const response = await axios.put(`http://localhost:8000/product/${id}`, {
        rating: Rating ? Rating : rating,
        price: Price ? Price : price,
        discount: Discount ? Discount : discount,
        title: Title ? Title : title,
      });
      const success = response.status === 200;
      if (success) {
        window.location.reload(false);
      }
    } catch (error) {
      alert("unable to update");
    }
  };
  const handleupdate = (e) => {
    e.preventDefault();
    UpdateID();
  };
  return (
    <div className="updatedetail">
      <span>Product ID:{id}</span>
      <p>
        <AiFillCloseCircle className="close" onClick={() => setupdate(false)} />
      </p>
      <div className="update">
        <div className="top">
          <div className="Rating">
            <label htmlFor="Rating">Rating</label>
            <input
              type="number"
              name="Rating"
              placeholder={rating}
              value={updatevalue.Rating}
              onChange={handleupdatevalue}
              min={1}
              max={5}
              id="Rating"
            />
          </div>
          <div className="Price">
            <label htmlFor="Price">price</label>
            <input
              type="number"
              name="Price"
              placeholder={price}
              value={updatevalue.Price}
              onChange={handleupdatevalue}
              min={0}
              id="Price"
            />
          </div>
          <div className="Discount">
            <label htmlFor="Discount">Discount</label>
            <input
              type="number"
              name="Discount"
              value={updatevalue.Discount}
              onChange={handleupdatevalue}
              min={0}
              id="Discount"
              placeholder={discount}
            />
          </div>
        </div>
        <div className="Title">
          <label htmlFor="Title">Product Title</label>
          <textarea
            name="Title"
            placeholder={title}
            value={updatevalue.Title}
            onChange={handleupdatevalue}
            id="Title"
            maxLength={20}
            cols="30"
            rows="10"
          />
        </div>
      </div>
      <button className="upd" onClick={handleupdate}>
        Update
      </button>
    </div>
  );
};

export default Update;
