import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Loader2Icon, MoreVertical } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const ResumeItemCard = ({ resume, refreshData }) => {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete("/api/resume", { data: { id: resume._id } });
      refreshData();
      setOpenAlert(false);
    } catch (error) {
      console.error("Failed to delete resume:", error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div
        className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4"
        style={{ borderColor: resume?.themeColor }}
      >
        <div className="flex items-center justify-center h-[180px] ">
          <Image src="/cv.png" width={80} height={80} alt="" />
        </div>
      </div>
      <div
        className="border p-3 flex justify-between text-white rounded-b-lg shadow-lg"
        style={{ background: resume?.themeColor }}
      >
        <h2
          className="text-sm text-primary cursor-pointer"
          onClick={() => router.push(`/dashboard/resume/${resume._id}`)}
        >
          {resume.title}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer text-primary" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/dashboard/resume/${resume._id}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/dashboard/resume/${resume._id}/view`)
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/dashboard/resume/${resume._id}/view`)
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeItemCard;
