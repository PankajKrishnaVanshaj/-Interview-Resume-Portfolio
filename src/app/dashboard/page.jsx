import InterviewList from "./interview/_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl text-primary">Dashboard</h2>
      <h2 className="text-gray-500">
        Start your AI Mockup Interview and Create Resume
      </h2>

      <div className="my-10 ">
        <InterviewList />
      </div>
    </div>
  );
};

export default Dashboard;
