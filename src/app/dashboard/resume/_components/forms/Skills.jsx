import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

const formField = {
  name: "",
  rating: 0,
};

const Skills = ({ enabledNext }) => {
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // useEffect(() => {
  //   if (resumeInfo) {
  //     setSkillsList(resumeInfo.skills || []);
  //   }
  // }, [resumeInfo]);

  useEffect(() => {
    resumeInfo?.skills && setSkillsList(resumeInfo?.skills);
  }, []);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([...skillsList, { ...formField }]);
  };

  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `/api/resume/${resumeId}`,
        {
          skills: skillsList,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      console.log("Response:", data);

      if (data.success) {
        enabledNext(true);
        setResumeInfo([]);
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
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add Your top professional key skills</p>
        <form onSubmit={onSave}>
          {skillsList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Name</label>
                  <Input
                    className="w-full"
                    value={item.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={AddNewSkills}
                className="text-primary"
              >
                + Add More Skill
              </Button>
              <Button
                variant="outline"
                onClick={RemoveSkills}
                className="text-primary"
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
    </div>
  );
};

export default Skills;
