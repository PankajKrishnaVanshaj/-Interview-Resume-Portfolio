import { CameraIcon } from "lucide-react";
import React from "react";
import Image from "next/image";

const dummySkills = [
  {
    _id: "5",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    title: "HTML",
  },
  {
    _id: "4",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    title: "CSS",
  },
  {
    _id: "1",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    title: "JavaScript",
  },
  {
    _id: "6",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    title: "TypeScript",
  },
  {
    _id: "7",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    title: "Python",
  },
  {
    _id: "2",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    title: "React",
  },
  {
    _id: "12",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    title: "Next.js",
  },
  {
    _id: "13",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    title: "React Native",
  },
  {
    _id: "3",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    title: "Node.js",
  },
  {
    _id: "8",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    title: "Express.js",
  },
  {
    _id: "9",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    title: "MongoDB",
  },
  {
    _id: "10",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    title: "Tailwind CSS",
  },

  {
    _id: "11",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    title: "Django",
  },
];

const Skills = () => {
  return (
    <div className="p-6 rounded-lg shadow-md shadow-primary w-full">
      <div className="">
        <div className="flex items-center justify-center text-2xl md:text-3xl font-extrabold text-gray-800">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 px-2 rounded-lg tracking-[2px]">Skills</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <p className="text-sm md:text-base lg:text-lg">
          I work as a Web and App Developer, as well as a Freelancer.{" "}
        </p>
      </div>
      <hr />
      <div className="mt-5 flex flex-wrap gap-2 ">
        {dummySkills.map((skill) => (
          <div
            key={skill._id}
            className="w-fit rounded-full capitalize flex gap-2 justify-center items-center my-2"
          >
            <div className="rounded-full shadow-inner shadow-primary p-2 ">
              {skill.svg ? (
                <Image
                  src={skill.svg}
                  alt={skill.title}
                  width={24}
                  height={24}
                />
              ) : (
                <CameraIcon className="w-6 h-6 text-gray-500" />
              )}
            </div>
            <div className="rounded-full shadow-md shadow-primary py-1 px-4 text-md md:text-xl font-extrabold font-mono tracking-wide">
              {skill.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
