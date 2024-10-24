"use client";

import FormSection from "../../_components/forms/FormSection";
import ResumePreview from "../../_components/preview/ResumePreview";

const ResumeEdit = ({ params }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-10 gap-10">
      {/* Form Section  */}
      <FormSection />
      {/* Preview Section  */}
      <ResumePreview />
    </div>
  );
};

export default ResumeEdit;
