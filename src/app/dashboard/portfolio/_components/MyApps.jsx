"use client";
import React, { useState } from "react";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const dummyApps = [
  {
    _id: "1",
    url: "https://blogify.pankri.com/",
    svg: "/pankri.png",
    name: "PK Blogify",
    category: "Blog",
    stack: [
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Express.js",
      "MongoDB",
      "Node.js",
    ],
    description:
      "PK Blogify is a blog website featuring comments, category filtration, and follow/unfollow as well as like/dislike functionalities.",
  },
];

const itemsPerPage = 1; // Number of items per page

const MyApps = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(dummyApps.length / itemsPerPage);

  // Get current items to display
  const currentItems = dummyApps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Utility function to truncate text
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="p-6 rounded-lg shadow-md shadow-primary w-full">
      <div>
        <div className="flex items-center justify-center text-2xl md:text-3xl font-extrabold text-gray-800">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 px-2 rounded-lg tracking-[2px]">Projects</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <p className="text-sm md:text-base lg:text-lg">
          Explore my portfolio of Web and App Development projects, showcasing
          my expertise as a skilled Developer and Freelancer.{" "}
        </p>
      </div>
      <hr />
      <div className="mt-2 list-none">
        {currentItems.map((app) => (
          <div key={app._id} className="mb-5">
            {/* img title cat section */}
            <div className="flex justify-between items-center">
              <div className="mr-4">
                <div className="text-md md:text-xl lg:text-2xl font-bold ">
                  <Link href={app.url}>{truncateText(app.name, 50)}</Link>
                </div>
                <p className="gap-2 rounded-full shadow-sm shadow-primary py-1 px-4 w-fit text-xs md:text-sm lg:text-base">
                  {app.category}
                </p>
              </div>
              {/* Placeholder for Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center">
                  <Link href={app.url}>
                    {app.svg ? (
                      <Image
                        src={app.svg}
                        alt={app.name}
                        className="w-24 h-24 object-cover"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <CameraIcon className="w-12 h-12 text-gray-500" />
                    )}
                  </Link>
                </div>
              </div>
            </div>

            <hr className="m-2" />

            {/* Tech Stack and Description Section */}
            <div>
              <div className="flex flex-wrap gap-2">
                {app.stack.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full shadow-sm shadow-primary py-1 px-4 w-fit text-xs md:text-sm lg:text-base font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="rounded-lg shadow-sm shadow-primary py-1 px-4 mt-2 text-xs md:text-sm lg:text-base">
                {truncateText(app.description, 250)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mx-1 rounded-lg ${
            currentPage === 1 ? "bg-gray-300" : "bg-primary text-white"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded-full ${
              currentPage === index + 1
                ? "bg-primary text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 mx-1 rounded-lg ${
            currentPage === totalPages ? "bg-gray-300" : "bg-primary text-white"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyApps;
