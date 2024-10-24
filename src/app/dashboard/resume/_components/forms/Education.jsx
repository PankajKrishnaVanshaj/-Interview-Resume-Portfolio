import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const Education = ({ enabledNext }) => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  useEffect(() => {
    if (resumeInfo) {
      setEducationalList(resumeInfo.education || []);
    }
  }, []);

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `/api/resume/${params.resumeId}`,
        {
          education: educationalList,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      console.log("Response:", data);

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
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>

      <form onSubmit={onSave}>
        <div>
          {educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div className="col-span-2">
                  <label>University Name</label>
                  <Input
                    name="universityName"
                    onChange={(e) => handleChange(e, index)}
                    value={item.universityName || ""}
                  />
                </div>
                <div>
                  <label>Degree</label>
                  <Input
                    name="degree"
                    onChange={(e) => handleChange(e, index)}
                    value={item.degree || ""}
                  />
                </div>
                <div>
                  <label>Major</label>
                  <Input
                    name="major"
                    onChange={(e) => handleChange(e, index)}
                    value={item.major || ""}
                  />
                </div>
                <div>
                  <label>Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(e) => handleChange(e, index)}
                    value={item.startDate || ""}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(e) => handleChange(e, index)}
                    value={item.endDate || ""}
                  />
                </div>
                <div className="col-span-2">
                  <label>Description</label>
                  <Textarea
                    name="description"
                    onChange={(e) => handleChange(e, index)}
                    value={item.description || ""}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewEducation}
              className="text-primary"
              type="button"
            >
              + Add More Education
            </Button>
            <Button
              variant="outline"
              onClick={RemoveEducation}
              className="text-primary"
              type="button"
            >
              - Remove
            </Button>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Education;
