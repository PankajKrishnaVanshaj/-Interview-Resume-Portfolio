"use client";

import React, { createContext, useState } from "react";

// Create the context
export const ResumeInfoContext = createContext(null);

// Create the provider component
export const ResumeInfoProvider = ({ children }) => {
  const [resumeInfo, setResumeInfo] = useState(null);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};
