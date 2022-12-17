import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import Update from "./Update";

const Manageproduct = () => {
  const [update, setupdate] = useState(false);
  const [productID, setproductID] = useState();
  const [productprice, setproductprice] = useState();
  const [productstock, setproductstock] = useState();
  const [productdiscount, setproductdiscount] = useState();
  const [prodtitle, setprodtitle] = useState("");
  const [product, setproduct] = useState([]);

  console.log(productID);
  console.log(prodtitle);
  const Getproduct = async () => {
    try {
      const response = await axios.get("http://localhost:8000/product/list");
      const Totalproduct = response.data;
      setproduct(Totalproduct);
    } catch (error) {
      console.log("can't fetch data");
    }
  };
  useEffect(() => {
    Getproduct();
  }, []);

  const handleproductid = (id, title, rating, price, discount) => {
    setupdate(true);
    setproductID(id);
    setprodtitle(title);
    setproductdiscount(discount);
    setproductprice(price);
    setproductstock(rating);
  };
  const handledelete=async(id)=>{
    try {
      const response=await axios.delete(`http://localhost:8000/product/${id}`)
      const success=response.status===200
      if(success){
        alert("successfully Deleted Product.")
        window.location.reload(false);

      }
    } catch (error) {
      console.log("unable to delete item")
    }

  }

  return (
    <div className="manageproduct">
      <div className="top">
        <div className="left">
          <h2>Manage & Update Product</h2>
        </div>
        <div className="right">
          <h4>Total product: {product.length}</h4>
        </div>
      </div>
      <div className="down">
        <table>
          <tr>
            <th>Product ID</th>
            <th>product Image</th>
            <th>Product Title</th>
            <th>Rating</th>
            <th>Product Price</th>
            <th>Discount Rate</th>
            <th>
              <AiFillDelete />
            </th>
            <th>
              <FiEdit />
            </th>
          </tr>
          {product.map((detail) => {
            const { _id, Pimage, title, rating, price, discount } = detail;

            return (
              <tr key={_id}>
                <td>{_id}</td>
                <td>
                  <img className="sm" src={Pimage.secure_url} alt="" />
                </td>
                <td className="smr">{title}</td>
                <td>{rating}</td>
                <td>Rs {price}</td>
                <td>{discount}%</td>
                <td>
                  <AiFillDelete className={update ? "disable" : "DE"} onClick={()=>handledelete(detail._id)}/>
                </td>
                <td>
                  <FiEdit
                    className={update ? "disable" : "DE"}
                    onClick={() =>
                      handleproductid(
                        detail._id,
                        detail.title,
                        detail.rating,
                        detail.price,
                        detail.discount
                      )
                    }
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {update && (
        <div className="updatearea">
          <Update
            setupdate={setupdate}
            id={productID}
            title={prodtitle}
            rating={productstock}
            discount={productdiscount}
            price={productprice}
          />
        </div>
      )}
    </div>
  );
};

export default Manageproduct;
