import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import moment from "moment";
import axios from "axios";
import React from "react";
import Image from "next/image";

function ProjectItemCard({ project }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/api/portfolio`, {
          data: { id: project?._id },
        });
        if (response.data.success) {
          console.log("Project deleted successfully");
          window.location.reload(); // Refresh the page
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  // Utility function to truncate text
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="border shadow-sm rounded-lg p-6 bg-white flex flex-col space-y-4">
      <div>
        <h2 className="font-bold text-primary text-lg mb-1">
          {truncateText(project?.title, 50)}
        </h2>
        <hr className="my-2" />
      </div>

      <div className="flex ">
        <div className="m-2  flex-shrink-0 ">
          <Image
            src={project?.banner.replace("./public", "")}
            alt="Project Banner"
            width={300}
            height={300}
            className="object-cover rounded-lg w-20 h-20 "
          />
        </div>
        <div className="">
          <p className="text-sm text-gray-600 mb-4">
            {truncateText(project?.desc, 200)}
          </p>
        </div>
      </div>

      <hr className="my-2" />
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">
          Created At: {moment(project.createdAt).format("DD/MM/YYYY")}
        </p>
        <Button
          variant="outline"
          onClick={handleDelete}
          className="flex items-center gap-1"
        >
          <Trash2 />
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ProjectItemCard;
