"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";

// const ITEMS_PER_PAGE = 11;

const InterviewList = () => {
  const path = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(11);
  const { data } = useSession();
  const createdBy = data?.user?.email;

  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    const GetInterviewList = async () => {
      try {
        const response = await axios.get(`/api/mockinterview`);
        const sortedInterviewList = response.data.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setInterviewList(sortedInterviewList);
      } catch (error) {
        console.error("Error fetching history from database:", error);
      }
    };

    if (createdBy) {
      GetInterviewList();
    }
  }, [createdBy]);

  useEffect(() => {
    if (path === "/dashboard") {
      setItemsPerPage(5);
    }
  }, [path]);

  const totalPages = Math.ceil(interviewList.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = interviewList.slice(startIndex, endIndex);

  console.log(interviewList);

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList?.length > 0
          ? currentItems.map((interview, index) => (
              <InterviewItemCard interview={interview} key={index} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                className="h-[100px] w-full bg-gray-200 animate-pulse rounded-lg "
                key={index}
              ></div>
            ))}

        <div>
          {path === "/dashboard" ? (
            <Link
              href={"/dashboard/interview"}
              className="flex justify-end items-end font-medium p-10"
            >
              More....
            </Link>
          ) : (
            <div>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewList;
