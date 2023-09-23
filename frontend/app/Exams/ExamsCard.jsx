"use client";

import axios from "axios";
import Cookies from "js-cookie";
import React from "react";

function ExamsCard(props) {
  const handleRegister = (title, description, price) => {
    const username = Cookies.get("username");
    const res = axios
      .post("http://localhost:5000/api/user/register", {
        username,
        title,
        description,
        price,
      })
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg mb-4">
      <div className="px-6 py-4">
        <div className="font-bold text-black text-2xl mt-2 mb-6">
          {props.title}
        </div>
        <p className="text-gray-600 text-sm mb-4">{props.description}</p>
        <div className="flex justify-between">
          <p className="text-gray-600 text-sm">
            Start Date to Register:{" "}
            <span className="text-black">2023-09-15</span>
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">
            Last Date: <span className="text-black">2023-09-30</span>
          </p>
        </div>
        <p className="text-gray-600 text-sm mb-0">
          Entry Fee <span className="text-black">Rs : {props.price}</span>
        </p>
      </div>
      <div className="px-6 py-4">
        {props.isRegistered ? (
          <button className="bg-orange-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
            Registered
          </button>
        ) : (
          <button
            onClick={() => {
              handleRegister(props.title, props.description, props.price);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
}

export default ExamsCard;
