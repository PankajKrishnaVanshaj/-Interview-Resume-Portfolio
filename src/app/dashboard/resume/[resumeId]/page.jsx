"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Lightbulb } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ResumeId = ({ params }) => {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    console.log(params.resumeId);
    getResumeDetails();
  }, []);

  /**
   * Used to get Resume details by MockId/Resume Id
   */
  const getResumeDetails = async () => {
    try {
      const response = await axios.get(`/api/resume`, {
        params: { id: params.resumeId },
      });
      setResumeData(response.data.data);
      console.log(resumeData);
    } catch (error) {
      console.error("Error fetching Resume details:", error);
    }
  };
  console.log(resumeData);

  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl text-primary">
        Let&lsquo;s Get Started
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 ">
          <div className="flex flex-col p-5 rounded-lg border gap-5 capitalize">
            <h2 className="text-lg">
              <strong>Resume Title:</strong> {resumeData?.title}
            </h2>
            <h2 className="text-lg">
              <strong>Created At:</strong>{" "}
              {moment(resumeData?.createdAt).format("DD/MM/YYYY")}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INTERVIEW_INFORMATION}
            </h2>
          </div>
        </div>
        <div>
          <div className="flex justify-center items-center pb-10">
            <Image src="/cv.png" width={400} height={400} alt="" />
          </div>
          <div className="flex justify-between ">
            <Link href={`/dashboard/resume`}>
              <Button>Cancel </Button>
            </Link>
            <div className="grid grid-cols-2 ">
              <Link href={`/dashboard/resume/${params.resumeId}/edit`}>
                <Button>Edit </Button>
              </Link>
              <Link href={`/dashboard/resume/${params.resumeId}/view`}>
                <Button>View </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeId;
