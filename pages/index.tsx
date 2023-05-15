import React, { useEffect } from "react";
import TodoForm from "../components/TodoForm";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <TodoForm />
    </div>
  );
};

export default HomePage;
