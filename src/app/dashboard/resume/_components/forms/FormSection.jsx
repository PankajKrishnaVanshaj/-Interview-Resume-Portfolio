import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import ThemeColor from "../ThemeColor";
import PersonalDetail from "./PersonalDetail";
import Summery from "./Summery";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";

const FormSection = () => {
  const { resumeId } = useParams();
  const router = useRouter();
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);

  const handleNextClick = () => {
    if (activeFormIndex < 6) {
      setActiveFormIndex(activeFormIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (activeFormIndex > 1) {
      setActiveFormIndex(activeFormIndex - 1);
    }
  };

  const handleFormCompletion = () => {
    router.push(`/dashboard/resume/${resumeId}/view`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link href={"/dashboard/resume"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button size="sm" onClick={handlePrevClick}>
              <ArrowLeft />
            </Button>
          )}
          {activeFormIndex < 6 ? (
            <Button
              disabled={!enableNext}
              className="flex gap-2"
              size="sm"
              onClick={handleNextClick}
            >
              <ArrowRight />
            </Button>
          ) : (
            <Button size="sm" onClick={handleFormCompletion}>
              View Resume
            </Button>
          )}
        </div>
      </div>

      {/* Render form sections based on activeFormIndex */}
      {activeFormIndex === 1 && (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      )}
      {activeFormIndex === 2 && (
        <Summery enabledNext={(v) => setEnableNext(v)} />
      )}
      {activeFormIndex === 3 && <Experience />}
      {activeFormIndex === 4 && <Education />}
      {activeFormIndex === 5 && <Skills />}
    </div>
  );
};

export default FormSection;
