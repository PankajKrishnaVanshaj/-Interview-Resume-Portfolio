"use client";
import React from "react";
import AddNewProject from "./_components/AddNewProject";
import ProjectList from "./_components/ProjectList";

const Portfolio = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl text-primary">My Projects</h2>
      <h2 className="text-gray-500">Add Your Project In Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        <AddNewProject />
        {/* Uncomment to include the AddNewProject component */}
      </div>

      {/* Uncomment to include the ProjectList component */}
      <ProjectList />
    </div>
  );
};

export default Portfolio;
