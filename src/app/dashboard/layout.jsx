import React from "react";
import DashHeader from "./_components/DashHeader";
import { ResumeInfoProvider } from "@/context/ResumeInfoContext";

function DashboardLayout({ children }) {
  return (
    <div>
      <ResumeInfoProvider>
        <div className="mx-5 md:mx-20 lg:mx-36">
          <DashHeader />
          {children}
        </div>
      </ResumeInfoProvider>
    </div>
  );
}

export default DashboardLayout;
