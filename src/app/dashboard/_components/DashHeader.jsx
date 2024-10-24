"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const DashHeader = () => {
  const path = usePathname();
  const { status, data } = useSession();
  const [infoVisible, setInfoVisible] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // sign out without redirect
    setInfoVisible(false); // close the user info modal if open
    window.location.href = "/"; // redirect manually to the homepage
  };

  return (
    <div className="flex py-2 px-5 items-center justify-between bg-secondary shadow-sm rounded-xl my-2">
      <Link href={"/"}>
        <div className="flex justify-center items-center gap-2">
          <Image
            src={"/jobhive.png"}
            alt="logo"
            width={50}
            height={50}
            // className="rounded-full"
          />
          <span className="font-extrabold text-2xl  bg-clip-text text-transparent bg-gradient-to-br from-pink-700 via-blue-400 to-orange-400">
            PK JobHive
          </span>
        </div>{" "}
      </Link>
      <div className="hidden md:flex gap-6">
        <Link href={"/dashboard"}>
          <p
            className={`hover:text-primary hover:font-bold transition-all
      cursor-pointer
      ${path == "/dashboard" && "text-primary font-bold"}
      `}
          >
            Dashboard
          </p>
        </Link>
        <Link href={"/dashboard/interview"}>
          <p
            className={`hover:text-primary hover:font-bold transition-all
      cursor-pointer
      ${path == "/dashboard/interview" && "text-primary font-bold"}
      `}
          >
            Interview
          </p>
        </Link>
        <Link href={"/dashboard/resume"}>
          <p
            className={`hover:text-primary hover:font-bold transition-all
      cursor-pointer
      ${path == "/dashboard/resume" && "text-primary font-bold"}
      `}
          >
            Resume
          </p>
        </Link>
        <Link href={"/dashboard/portfolio"}>
          <p
            className={`hover:text-primary hover:font-bold transition-all
      cursor-pointer
      ${path == "/dashboard/portfolio" && "text-primary font-bold"}
      `}
          >
            Portfolio
          </p>
        </Link>
        <Link href={"/dashboard/upgrade"}>
          <p
            className={`hover:text-primary hover:font-bold transition-all
      cursor-pointer
      ${path == "/dashboard/upgrade" && "text-primary font-bold"}
      `}
          >
            Upgrade
          </p>
        </Link>
      </div>
      {/* authentication */}
      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          <div className="block rounded-md text-sm font-medium text-white transition ">
            {status === "authenticated" && (
              <>
                <Image
                  className="rounded-full w-10 h-10 cursor-pointer"
                  src={data?.user?.image}
                  alt="logo"
                  width={60}
                  height={60}
                  onClick={() => setInfoVisible(!infoVisible)}
                />
                {infoVisible && (
                  <div className="absolute bg-gray-100 p-6 rounded-md shadow-md top-20 right-4">
                    <h2 className="text-xl font-semibold mb-4 text-gray-500">
                      User Information
                    </h2>
                    <ul className="space-y-2">
                      <li className="text-lg text-gray-600">
                        {data?.user?.name}
                      </li>
                      <li className="text-gray-600">{data?.user?.email}</li>
                      <li>
                        <button
                          onClick={() => {
                            handleSignOut();
                          }}
                          className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        >
                          Sign Out
                        </button>{" "}
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
