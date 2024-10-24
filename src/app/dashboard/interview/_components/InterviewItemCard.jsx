import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash2 } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?._id);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview?._id + "/feedback");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/api/mockinterview`, {
          data: { id: interview?._id },
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

  return (
    <div className="border shadow-sm rounded-lg p-3 capitalize">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At: {moment(interview.createdAt).format("DD/MM/YYYY")}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <Button size="sm" className="w-full" onClick={onFeedbackPress}>
          Feedback
        </Button>
        <Button variant="outline" onClick={handleDelete}>
          <Trash2 />
        </Button>
        <Button size="sm" className="w-full" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
