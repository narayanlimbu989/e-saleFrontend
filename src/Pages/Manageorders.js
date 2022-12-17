import React from "react";
import Fackorder from "./Fackorder";

const Manageorders = () => {
  return (
    <div className="manageproduct">
      <div className="top">
        <div className="left">
          <h2>Order & Reviews Product</h2>
        </div>
        <div className="right">
          <h4>Total Order: {Fackorder.length}</h4>
        </div>
      </div>
      <div className="down">
        <table>
          <tr>
            <th>Order ID</th>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Delivery Address</th>
            <th>Costumer Email</th>
            <th>Costumer phone</th>
            <th>Payment method</th>
          </tr>
          {Fackorder.map((order) => {
            return (
              <tr>
                <td>5678gguu78</td>
                <td>
                  <img className="sm" src="./image/key3.webp" alt="img" />
                </td>
                <td>2</td>
                <td>Rs 4000</td>
                <td>kadhaghari-4,kathmandu</td>
                <td>limbu@gmail.com</td>
                <td>+977 9818463950</td>
                <td>E-sewa</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Manageorders;
