"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Camera,
  Facebook,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  ReceiptText,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const UserInfo = () => {
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    github: "",
    resume: "",
    avatar: "",
    number: "",
    secondemail: "",
    skills: [{ img: "", name: "" }],
  });

  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = (event, name) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (e, index = null) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected or file is invalid");
      return;
    }

    if (index === null) {
      // Handle avatar upload logic if needed
    } else {
      const updatedSkills = [...formData.skills];
      updatedSkills[index].img = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        skills: updatedSkills,
      }));
    }
  };

  const submitFormData = async () => {
    try {
      const response = await axios.put("/api/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Handle response and errors
    } catch (error) {
      console.error("Error updating user information:", error);
      // Handle error
    }
  };

  const addSkill = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, { img: "", name: "" }],
    }));
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));
  };

  const renderSocialInput = (icon, placeholder, name) => {
    return (
      selectedOption === name && (
        <div className="mt-2">
          <label className="input input-bordered flex items-center gap-2">
            {icon}
            <input
              type="text"
              className="input input-bordered w-full rounded-md px-3 py-2 m-5 focus:ring-2 focus:ring-primary focus:outline-none transition duration-300"
              placeholder={placeholder}
              onChange={(event) => handleInputChange(event, name)}
              value={formData[name]}
              required
            />
          </label>
        </div>
      )
    );
  };

  const renderSkillForm = () => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {formData.skills.map((skill, index) => (
          <div key={index} className="flex gap-2 items-center">
            <label htmlFor={`skill-file-input-${index}`}>
              {skill.img ? (
                <Image
                  src={skill.img}
                  alt="Skill"
                  className="w-12 h-12 rounded-full"
                  width={100}
                  height={100}
                />
              ) : (
                <Camera className="p-3 w-12 h-12 bg-gray-300 rounded-full cursor-pointer transition duration-300 hover:bg-gray-400" />
              )}
            </label>
            <input
              type="file"
              id={`skill-file-input-${index}`}
              accept="image/*"
              onChange={(e) => handleFileUpload(e, index)}
              style={{ display: "none" }}
              required
            />
            <input
              type="text"
              placeholder="Skill Name"
              className="input input-bordered w-full rounded-md px-3 py-2 m-5 focus:ring-2 focus:ring-primary focus:outline-none transition duration-300"
              value={skill.name}
              onChange={(e) => {
                const updatedSkills = [...formData.skills];
                updatedSkills[index].name = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  skills: updatedSkills,
                }));
              }}
              required
            />
            <Button onClick={() => removeSkill(index)}>Remove</Button>
          </div>
        ))}
        <Button onClick={addSkill}>Add Skill</Button>
      </div>
    );
  };

  return (
    <div className="p-7 rounded-lg bg-secondary my-7 shadow-lg">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex gap-2 items-center mb-4">
          <label htmlFor="file-input">
            {formData.avatar ? (
              <Image
                src={formData.avatar}
                alt="Avatar"
                className="rounded-xl object-cover "
                width={100}
                height={100}
              />
            ) : (
              <Camera className="p-3 w-12 h-12 bg-gray-300 rounded-full cursor-pointer transition duration-300 hover:bg-gray-400" />
            )}
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={(e) => handleFileUpload(e)}
              style={{ display: "none" }}
              required
            />
          </label>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition duration-300"
            onChange={(event) => handleInputChange(event, "username")}
            value={formData.username}
            required
          />
          <input
            type="email"
            placeholder="Portfolio Email"
            className="input input-bordered w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition duration-300"
            onChange={(event) => handleInputChange(event, "secondemail")}
            value={formData.secondemail}
            required
          />
          <input
            type="text"
            placeholder="Number"
            className="input input-bordered w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition duration-300"
            onChange={(event) => handleInputChange(event, "number")}
            value={formData.number}
            required
          />
        </div>

        <textarea
          placeholder="Tell about yourself"
          className="textarea textarea-bordered w-full mb-6 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition duration-300"
          onChange={(event) => handleInputChange(event, "bio")}
          value={formData.bio}
          rows={3}
          required
        ></textarea>
        <div>
          <div className="flex flex-wrap gap-3 mb-4 justify-center items-center">
            {[
              {
                icon: <GraduationCap />,
                name: "skills",
                color: "text-green-500",
              },
              { icon: <Github />, name: "github", color: "text-black" },
              { icon: <Linkedin />, name: "linkedin", color: "text-blue-500" },
              { icon: <Facebook />, name: "facebook", color: "text-blue-500" },
              { icon: <Twitter />, name: "twitter", color: "text-blue-400" },
              {
                icon: <Instagram />,
                name: "instagram",
                color: "text-pink-500",
              },
              {
                icon: <ReceiptText />,
                name: "resume",
                color: "text-green-500",
              },
            ].map(({ icon, name, color }) => (
              <div
                key={name}
                className={`h-14 flex justify-center items-center w-14 p-3 rounded-full ${color} bg-white hover:bg-gray-300 cursor-pointer transition duration-300 ${
                  selectedOption === name ? "bg-gray-300" : ""
                }`}
                onClick={() =>
                  setSelectedOption((prev) => (prev === name ? null : name))
                }
              >
                {icon}
              </div>
            ))}
          </div>
          {renderSocialInput(<Instagram />, "Instagram URL", "instagram")}
          {renderSocialInput(<Facebook />, "Facebook URL", "facebook")}
          {renderSocialInput(<Twitter />, "Twitter URL", "twitter")}
          {renderSocialInput(<Github />, "Github URL", "github")}
          {renderSocialInput(<ReceiptText />, "Resume URL", "resume")}
          {renderSocialInput(<Linkedin />, "Linkedin URL", "linkedin")}
          {selectedOption === "skills" && renderSkillForm()}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 my-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
          onClick={submitFormData}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UserInfo;
