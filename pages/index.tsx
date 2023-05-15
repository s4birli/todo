import React, { useEffect } from "react";
import TodoForm from "../components/TodoForm";
import { scheduleCronJob } from "../lib/hooks/cronJobs";

const HomePage: React.FC = () => {
  useEffect(() => {
    scheduleCronJob();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <TodoForm />
    </div>
  );
};

export default HomePage;
