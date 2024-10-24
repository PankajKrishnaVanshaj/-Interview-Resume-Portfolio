import { useContext } from "react";
import EducationalPreview from "./EducationalPreview";
import ExperiencePreview from "./ExperiencePreview";
import PersonalDetailPreview from "./PersonalDetailPreview";
import SkillsPreview from "./SkillsPreview";
import SummeryPreview from "./SummeryPreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const ResumePreview = ({ resumeInfo: propResumeInfo }) => {
  const contextResumeInfo = useContext(ResumeInfoContext);
  const resumeInfo = propResumeInfo || contextResumeInfo.resumeInfo;

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Summary */}
      <SummeryPreview resumeInfo={resumeInfo} />
      {/* Professional Experience */}
      {resumeInfo?.experience?.length > 0 && (
        <ExperiencePreview resumeInfo={resumeInfo} />
      )}
      {/* Educational */}
      {resumeInfo?.education?.length > 0 && (
        <EducationalPreview resumeInfo={resumeInfo} />
      )}
      {/* Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <SkillsPreview resumeInfo={resumeInfo} />
      )}
    </div>
  );
};

export default ResumePreview;
