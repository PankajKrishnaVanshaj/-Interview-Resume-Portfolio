"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Lightbulb, WebcamIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";

const InterviewId = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    getInterviewDetails();
  }, []);

  /**
   * Used to get interview details by MockId/Interview Id
   */
  const getInterviewDetails = async () => {
    try {
      const response = await axios.get(`/api/mockinterview`, {
        params: { id: params.interviewId },
      });
      setInterviewData(response.data.data);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl text-primary">
        Let&lsquo;s Get Started
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 ">
          <div className="flex flex-col p-5 rounded-lg border gap-5 capitalize">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>{" "}
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>{" "}
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong>{" "}
              {interviewData?.jobExperience}
            </h2>
            <h2 className="text-lg">
              <strong>Created At:</strong>{" "}
              {moment(interviewData?.createdAt).format("DD/MM/YYYY")}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                className="w-full font-bold"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewId;
