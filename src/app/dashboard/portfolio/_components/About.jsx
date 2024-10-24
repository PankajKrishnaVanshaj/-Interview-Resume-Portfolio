"use client";

import { Button } from "@/components/ui/button";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  ScrollText,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

const About = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
        <div className="lg:w-1/2">
          {/* <p className="capitalize text-xl sm:text-2xl font-bold mb-5 text-gray-800 w-fit px-5 rounded-full bg-white shadow-primary shadow-inner">
            Username
          </p> */}
          <h1 className="w-fit pl-3 bg-white shadow-primary shadow-2xl rounded-xl overflow-x-hidden font-bold text-[1.3rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[0.1em] text-gray-800">
            <Typewriter
              words={["Hey, I'm", "Pankaj", " KrishnaVanshaj"]}
              loop={50}
              cursor
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>
          <div className="text-base sm:text-lg text-gray-600 mt-8 font-mono">
            <p>Email: pankajyadav91224@gmail.com</p>
            <p>Phone No: 6396-16-6396</p>
          </div>
          <div className="w-fit px-7 py-2 bg-white shadow-primary shadow-2xl rounded-[20px] flex gap-5 items-center mt-4 md:mt-8 lg:mt-10">
            <Link
              href="https://www.instagram.com/pankajkrishnavanshaj"
              target="_blank"
            >
              <Instagram className="text-pink-500 w-7 h-7" />
            </Link>
            <Link
              href="https://www.facebook.com/PankajKrishnaVanshaj/"
              target="_blank"
            >
              <Facebook className="text-blue-800 w-7 h-7" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/pankajkrishnavanshaj/"
              target="_blank"
            >
              <Linkedin className="text-sky-500 w-7 h-7" />
            </Link>
          </div>
          <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3">
            <Link
              href="https://github.com/PankajKrishnaVanshaj"
              target="_blank"
            >
              <Button className="rounded-[30px] flex items-center gap-2 flex-row">
                <span>
                  <Github />
                </span>
                <span>Github</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              className="rounded-full shadow-md shadow-primary"
            >
              <Share2 />
            </Button>
            <Link href="#">
              <Button className="rounded-[30px] flex items-center gap-2 flex-row">
                <span>
                  <ScrollText />
                </span>
                <span>Resume</span>
              </Button>
            </Link>
          </div>
        </div>
        {/* Image side */}
        <div className="mt-8 lg:mt-0 lg:ml-8">
          <div className="flex justify-center items-center">
            <Image
              src="/pankaj-krishnavanshaj.png"
              alt="Pankaj KrishnaVanshaj's avatar"
              className="rounded-xl border-4 border-white shadow-primary shadow-2xl"
              width={250}
              height={250}
            />
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="mt-12">
        <div className="flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 px-2 rounded-lg tracking-[0.1em]">
            ABOUT US
          </span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="text-lg sm:text-xl bg-white shadow-primary shadow-2xl px-4 py-2 mt-5 rounded-xl text-gray-700 leading-relaxed">
          <p>
            Hi, I’m{" "}
            <span className="font-bold text-blue-500">
              Pankaj KrishnaVanshaj
            </span>
            , or just <span className="font-bold text-blue-500">PK</span>. I’m
            about to graduate with a degree in{" "}
            <strong>Software Engineering</strong> from{" "}
            <strong>CSJM University, Kanpur</strong>.
          </p>
          <p className="font-mono mt-2">
            As a passionate <strong>Web/App Developer</strong> and experienced{" "}
            <strong>Freelancer</strong>, I focus on delivering high-quality,
            timely solutions. Outside of work, I love watching movies,
            binge-watching series, and exploring video games.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
