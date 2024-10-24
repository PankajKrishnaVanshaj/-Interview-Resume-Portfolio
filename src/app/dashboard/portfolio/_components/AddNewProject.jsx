import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";

const AddNewProject = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectUrl, setProjectUrl] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [techStackInput, setTechStackInput] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImg, setProjectImg] = useState(null);
  const [category, setCategory] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("projectUrl", projectUrl);
      formData.append("techStack", techStack.join(","));
      formData.append("projectTitle", projectTitle);
      formData.append("projectDescription", projectDescription);
      formData.append("category", category);
      formData.append("projectImg", projectImg);

      const response = await axios.post("/api/portfolio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Inserted ID:", response.data);
      if (response.data.success) {
        setOpenDialog(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTechStack = () => {
    if (techStackInput.trim()) {
      setTechStack([...techStack, techStackInput.trim()]);
      setTechStackInput("");
    }
  };

  const removeTechStack = (index) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your Project
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add details about your Project</h2>

                  <div className="mt-7 my-3">
                    <label>Project Url</label>
                    <Input
                      placeholder="Enter project URL"
                      required
                      value={projectUrl}
                      onChange={(event) => setProjectUrl(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Project Tech Stack</label>
                    <div className="flex items-center">
                      <Input
                        placeholder="Ex. React, Angular, NodeJs, MySql etc"
                        value={techStackInput}
                        onChange={(event) =>
                          setTechStackInput(event.target.value)
                        }
                      />
                      <Button
                        type="button"
                        onClick={addTechStack}
                        className="ml-2"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {techStack.map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-200 px-2 py-1 rounded"
                        >
                          <span>{tech}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTechStack(index)}
                            className="ml-2"
                          >
                            &times;
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="my-3">
                    <label>Project Title</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      value={projectTitle}
                      onChange={(event) => setProjectTitle(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Project Description (In Short)</label>
                    <Textarea
                      placeholder="Enter project description"
                      required
                      value={projectDescription}
                      onChange={(event) =>
                        setProjectDescription(event.target.value)
                      }
                    />
                  </div>
                  <div className="my-3">
                    <label>Project Img & Category</label>
                    <div className="flex justify-center items-center gap-3">
                      <input
                        type="file"
                        onChange={(event) =>
                          setProjectImg(event.target.files[0])
                        }
                      />
                      <Input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Project
                      </>
                    ) : (
                      "Add Project"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewProject;
