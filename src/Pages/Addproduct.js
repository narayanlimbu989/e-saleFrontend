import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
const noimage = "./image/noimage.png";

const Addproduct = () => {
  const [picture, setpicture] = useState("");
  const [detail, setdetail] = useState({
    pimage: picture,
    ptitle: "",
    About: "",
    price: "",
    rating: "",
    discount: "",
    category: "",
  });
  const linkto = useNavigate();
  const handleproduct = (e) => {
    setdetail((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const handleproductimage = (e) => {
    const file = e.target.files[0];
    transformfile(file);
  };
  const transformfile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setpicture(reader.result);
      };
    } else {
      setpicture(noimage);
    }
  };

  const handleaddproduct = async (e) => {
    e.preventDefault();
    const { ptitle, About, price, rating, discount, category } = detail;
    if (ptitle && About && price && rating && discount && category) {
      const response = await axios.post("http://localhost:8000/product/add", {
        Pimage: picture,
        title: detail.ptitle,
        about: detail.About,
        rating: detail.rating,
        price: detail.price,
        discount: detail.discount,
        category: detail.category,
      });

      const success = response.status === 200;
      if (success) {
        alert("successfully Added product");
        linkto("/manageproduct");
      } else {
        alert("some Issue come while Adding product");
      }
    } else {
      alert("must fill all data");
    }
  };
  return (
    <div className="addproduct">
      <div className="addimage">
        <h1>Product Images</h1>
        <div className="images">
          <div className="image">
            {picture.length !== 0 ? (
              <img accept="image/png, image/jpeg" src={picture} alt="img1" />
            ) : (
              <img src={noimage} alt="img1" />
            )}
            <input
              type="file"
              onChange={handleproductimage}
              id="img1"
              style={{ display: "none" }}
            />
            <label htmlFor="img1">
              <FaCloudUploadAlt className="uploadbtn" />
            </label>
          </div>
        </div>
      </div>

      <div className="form">
        <h1>Product Details</h1>

        <div className="topform">
          <div className="left">
            <label htmlFor="ptitle">Product Title</label>
            <textarea
              id="ptitle"
              name="ptitle"
              value={detail.ptitle}
              onChange={handleproduct}
              maxLength={20}
              placeholder="Max latter 100"
              cols="30"
              rows="10"
            />
          </div>
          <div className="right">
            <label htmlFor="About">About Product</label>
            <textarea
              id="About"
              name="About"
              value={detail.About}
              onChange={handleproduct}
              cols="30"
              rows="10"
            />
          </div>
        </div>

        <div className="downform">
          <div className="price">
            <label htmlFor="price">Set price</label>
            <input
              type="number"
              name="price"
              value={detail.price}
              onChange={handleproduct}
              id="price"
              placeholder="Rs"
            />
          </div>

          <div className="discount">
            <label htmlFor="discount">Set Discount Rate</label>
            <input
              type="number"
              name="discount"
              min={0}
              max={90}
              value={detail.discount}
              onChange={handleproduct}
              id="discount"
              placeholder="below 100"
            />
          </div>

          <div className="rating">
            <label htmlFor="rating">Rating </label>
            <input
              type="number"
              name="rating"
              value={detail.rating}
              onChange={handleproduct}
              id="rating"
              min={1}
              max={5}
            />
          </div>

          <div className="category">
            <label htmlFor="cato">category</label>
            <select
              name="category"
              value={detail.category}
              onChange={handleproduct}
            >
              <option value="">select product category</option>
              <option value="Books">Books</option>
              <option value="Beauty & personal care">
                Beauty & personal care
              </option>
              <option value="Girl's Fashion">Girl's Fashion</option>
              <option value="Boy's Fashion">Boy's Fashion</option>
              <option value="Toys and Game">Toys and Game</option>
              <option value="Computer & Laptops">Computer & Laptops</option>
              <option value="Home & kitchen">Home & kitchen</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Food Related">Food Related</option>
            </select>
          </div>
        </div>
      </div>
      <div className="postbtn">
        <button onClick={handleaddproduct}>post item</button>
      </div>
    </div>
  );
};

export default Addproduct;
