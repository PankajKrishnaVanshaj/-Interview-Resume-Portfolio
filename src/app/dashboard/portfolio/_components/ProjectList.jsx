"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
import ProjectItemCard from "./ProjectItemCard";

const ProjectList = () => {
  const path = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(11);
  const [projectList, setProjectList] = useState([]);
  const { data } = useSession();
  const createdBy = data?.user?.email;

  useEffect(() => {
    const GetProjectList = async () => {
      try {
        const response = await axios.get(`/api/portfolio`);
        console.log("dddddddddd", response.data);

        const sortedProjectList = response.data.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setProjectList(sortedProjectList);
      } catch (error) {
        console.error("Error fetching history from database:", error);
      }
    };

    if (createdBy) {
      GetProjectList();
    }
  }, [createdBy]);

  useEffect(() => {
    if (path === "/dashboard") {
      setItemsPerPage(5);
    }
  }, [path]);

  const totalPages = Math.ceil(projectList.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = projectList.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 my-3">
        {projectList?.length > 0
          ? currentItems.map((project, index) => (
              <ProjectItemCard project={project} key={index} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                className="h-[100px] w-full bg-gray-200 animate-pulse rounded-lg "
                key={index}
              ></div>
            ))}
      </div>
      <div>
        {path === "/dashboard" ? (
          <Link
            href={"/dashboard/projects"}
            className="flex justify-end items-end font-medium p-10"
          >
            More....
          </Link>
        ) : (
          <div className="flex justify-center items-center gap-5 mt-5">
            <Button
              className="hover:scale-110"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronsLeft />
            </Button>
            {currentPage}
            <Button
              className="hover:scale-110"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
