"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Header() {
  const path = usePathname();
  const { status, data } = useSession();
  const [infoVisible, setInfoVisible] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    setInfoVisible(false);
    window.location.href = "/";
  };

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm rounded-xl">
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
      </div>
      <div className="hidden md:flex gap-6">
        <Link href={"/"}>
          <p
            className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path == "/" && "text-primary font-bold"}
            `}
          >
            Home
          </p>
        </Link>
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
        <Link href={"/questions"}>
          <p
            className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path == "/questions" && "text-primary font-bold"}
            `}
          >
            Questions
          </p>
        </Link>
        <Link href={"/contact-us"}>
          <p
            className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path == "/contact-us" && "text-primary font-bold"}
            `}
          >
            Contact us
          </p>
        </Link>
        <Link href={"/#how-it-works"}>
          <p
            className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path == "/how-it-works" && "text-primary font-bold"}
            `}
          >
            How it Works?
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
                      <li className="text-gray-600">{data?.user?.username}</li>
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
}

export default Header;
