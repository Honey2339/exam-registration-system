"use client";

import React, { useEffect, useState } from "react";
import ExamsCard from "./ExamsCard";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

function Exams() {
  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    const username = Cookies.get("username");
    if (!username) {
      router.push("/");
    }
    const res = axios
      .post("http://localhost:5000/api/getexam", { username })
      .then((res) => {
        setData(res.data.allExams);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=" min-h-screen bg-blue-500 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 ml-20">
        Upcoming Exams:
      </h1>
      <div className=" ml-20 mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data &&
          data.map((data) => (
            <ExamsCard
              title={data.title}
              description={data.description}
              price={data.price}
              isRegistered={data.isRegistered}
            />
          ))}
      </div>
    </div>
  );
}

export default Exams;
