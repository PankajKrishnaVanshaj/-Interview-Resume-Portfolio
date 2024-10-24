"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { RWebShare } from "react-web-share";
import ResumePreview from "../../_components/preview/ResumePreview";
import axios from "axios"; // Import axios

const ResumeView = ({ params }) => {
  const [resumeInfo, setResumeInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch resume info when component mounts
    const fetchResumeInfo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/resume?id=${params.resumeId}`);
        if (response.data.success) {
          setResumeInfo(response.data.data);
        } else {
          console.error("Failed to fetch resume info:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching resume info:", error);
      }
      setLoading(false);
    };

    fetchResumeInfo();
  }, [params.resumeId]);

  const HandleDownload = () => {
    window.print();
  };

  return (
    <div className="">
      <div id="no-print">
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generates Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and share a unique resume
            URL with your friends and family.
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>

            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume. Please open the URL to see it.",
                url: `http://localhost:3000/dashboard/resume/${params.resumeId}/view`,
                title: `${resumeInfo.firstName} ${resumeInfo.lastName}'s resume`,
              }}
              onClick={() => console.log("Shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview resumeInfo={resumeInfo} />
        </div>
      </div>
    </div>
  );
};

export default ResumeView;
