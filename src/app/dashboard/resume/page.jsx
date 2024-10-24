"use client";
import React, { useEffect, useState } from "react";
import AddResume from "./_components/AddResume";
import ResumeItemCard from "./_components/ResumeItemCard";
import { useSession } from "next-auth/react";
import axios from "axios";

const Resume = () => {
  const { data } = useSession();
  const createdBy = data?.user?.email;
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (createdBy) {
      GetResumesList();
    }
  }, [createdBy]);

  const GetResumesList = async () => {
    try {
      const response = await axios.get(`/api/resume`);
      const sortedResumeList = response.data.data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setResumeList(sortedResumeList);
    } catch (error) {
      console.error("Error fetching history from database:", error);
    }
  };

  console.log(resumeList);
  return (
    <div className="p-10 ">
      <h2 className="font-bold text-3xl text-primary">My Resume</h2>
      <h2 className="text-gray-500">
        Start Creating AI resume to your next Job role
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10 ">
        <AddResume />
        {resumeList.length > 0
          ? resumeList.map((resume, index) => (
              <ResumeItemCard
                resume={resume}
                key={index}
                refreshData={GetResumesList}
              />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
                key={index}
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Resume;
