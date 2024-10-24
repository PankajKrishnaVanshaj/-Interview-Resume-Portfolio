import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { chatSession } from "@/utils/GeminiAIModal";
import { Brain, LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

const Summery = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.summery || "");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
    }
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    try {
      const result = await chatSession.sendMessage(PROMPT);
      let responseText = await result.response.text();

      // Clean the response text
      responseText = responseText
        .replace("```json", "")
        .replace("```", "")
        .trim();

      // Log the cleaned response text to debug any issues
      console.log("Cleaned response text:", responseText);

      // Parse the response text as JSON
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        console.error("Response text:", responseText);
        setLoading(false);
        return;
      }

      setAiGenerateSummeryList(parsedResponse);
    } catch (error) {
      console.error("Error generating summary:", error);
    }
    setLoading(false);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `/api/resume/${params.resumeId}`,
        resumeInfo
      );

      const data = response.data;
      console.log("Inserted ID:", data);

      if (data.success) {
        enabledNext(true);
      } else {
        console.log("ERROR:", data.error);
      }
    } catch (error) {
      console.error("Axios Error:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              variant="outline"
              onClick={() => GenerateSummeryFromAI()}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery}
            defaultValue={summery ? summery : resumeInfo?.summery}
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summery;
