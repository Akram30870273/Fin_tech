"use client";
import React from "react";

function MainComponent() {
  const [goals, setGoals] = React.useState([
    {
      id: 1,
      name: "Emergency Fund",
      current: 3000,
      target: 10000,
      deadline: "2025-12-31",
    },
    {
      id: 2,
      name: "Down Payment",
      current: 15000,
      target: 50000,
      deadline: "2026-06-30",
    },
    {
      id: 3,
      name: "Vacation Fund",
      current: 500,
      target: 3000,
      deadline: "2025-08-01",
    },
  ]);

  const handleAddGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              <i className="fas fa-landmark text-2xl text-[#094d8d]"></i>
              <span className="text-xl font-bold text-[#094d8d]">
                PNC Financial
              </span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 mt-20">
        <GoalVisualizer
          goals={goals}
          onPrioritize={setGoals}
          onAddGoal={handleAddGoal}
          onUpdateGoal={(id, amount) => {
            setGoals(
              goals.map((g) =>
                g.id === id
                  ? { ...g, current: Math.min(g.current + amount, g.target) }
                  : g
              )
            );
          }}
        />
      </main>
    </div>
  );
}

export default MainComponent;