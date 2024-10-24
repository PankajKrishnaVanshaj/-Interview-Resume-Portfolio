import Header from "@/components/Header";

const Questions = () => {
  const questionsList = [
    {
      question: "How does PK JobHive work?",
      answer:
        "PK JobHive is an AI-powered platform designed to simulate realistic interview experiences with a virtual interviewer. It provides comprehensive interview simulations, personalized feedback, and a wealth of resources to help you improve your interview skills.",
    },
    {
      question:
        "Is PK JobHive suitable for both beginners and experienced interviewees?",
      answer:
        "Absolutely! PK JobHive caters to individuals at all experience levels. Whether you are a beginner aiming to build confidence or a seasoned interviewee looking to polish your skills, our platform offers tailored resources and practice sessions to meet your specific needs.",
    },
    {
      question:
        "What sets PK JobHive apart from other interview preparation platforms?",
      answer:
        "PK JobHive distinguishes itself through its AI-powered virtual interviewer, personalized feedback, and extensive resources. Our platform offers realistic interview simulations, a tailored question bank, and instant feedback, creating an immersive and effective preparation experience that sets it apart from other platforms.",
    },
    {
      question: "How does the real-time feedback feature work?",
      answer:
        "During practice interviews, the AI interviewer provides immediate feedback on your responses, identifying areas for improvement and offering suggestions to enhance your performance. This feature allows you to make real-time adjustments, ensuring a more effective practice experience.",
    },
    {
      question: "What resources are available on the platform?",
      answer:
        "PK JobHive offers a variety of resources, including interview tips, sample answers, and comprehensive guides. These resources are designed to help you understand best practices, prepare thoroughly, and improve your overall interview skills.",
    },
    {
      question: "How can I track my progress and improvement on PK JobHive?",
      answer:
        "PK JobHive provides detailed analytics and performance metrics to track your progress. You can review your interview session history, analyze your strengths and areas for improvement, and monitor your growth over time to gauge your readiness for actual interviews.",
    },
  ];

  return (
    <>
      <div className="mx-5 md:mx-20 lg:mx-36 mt-3">
        <Header />
        <div className="mt-10">
          <div className="flex flex-col justify-center text-center">
            <h2 className="text-3xl font-extrabold text-primary">
              Everything you need to know
            </h2>
            <p className="text-gray-500">
              Here are the most frequently asked questions about PK JobHive.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {questionsList.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white border rounded-lg shadow-md cursor-pointer hover:scale-105 duration-300"
              >
                <h2 className="text-xl font-bold mb-2 ">{item.question}</h2>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
