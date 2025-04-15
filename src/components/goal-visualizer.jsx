"use client";
import React from "react";



export default function Index() {
  return ("use client";

function MainComponent({
  goals = [],
  onPrioritize = () => {},
  onUpdateGoal = () => {},
  onAddGoal = () => {},
}) {
  const [draggingId, setDraggingId] = React.useState(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newGoal, setNewGoal] = React.useState({
    name: "",
    target: "",
    initialDeposit: "",
    deadline: "",
  });

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target && newGoal.deadline) {
      onAddGoal({
        id: Date.now(),
        name: newGoal.name,
        current: parseFloat(newGoal.initialDeposit || 0),
        target: parseFloat(newGoal.target),
        deadline: newGoal.deadline,
      });
      setNewGoal({ name: "", target: "", initialDeposit: "", deadline: "" });
      setShowAddModal(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <a
          href="/"
          className="flex items-center text-[#094d8d] hover:text-[#073d71] transition-colors"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Dashboard
        </a>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#f47420] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          Add New Goal
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Goal Visualizer</h1>
      <p className="text-gray-600 mb-8">Drag to reorder your priorities</p>

      <div className="space-y-4">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100;
          const monthsLeft = Math.max(
            1,
            Math.ceil(
              (new Date(goal.deadline) - new Date()) /
                (1000 * 60 * 60 * 24 * 30)
            )
          );
          return (
            <div
              key={goal.id}
              draggable
              onDragStart={() => setDraggingId(goal.id)}
              onDragEnd={() => setDraggingId(null)}
              onDragOver={(e) => {
                e.preventDefault();
                if (draggingId && draggingId !== goal.id) {
                  const newGoals = [...goals];
                  const dragIndex = goals.findIndex((g) => g.id === draggingId);
                  const dropIndex = goals.findIndex((g) => g.id === goal.id);
                  [newGoals[dragIndex], newGoals[dropIndex]] = [
                    newGoals[dropIndex],
                    newGoals[dragIndex],
                  ];
                  onPrioritize(newGoals);
                }
              }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-[#094d8d] text-white rounded-full flex items-center justify-center font-medium">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{goal.name}</h3>
                <div className="ml-auto text-right">
                  <div className="text-gray-600">
                    Target: ${goal.target.toLocaleString()}
                  </div>
                  <div className="text-[#094d8d] font-medium">
                    Current: ${goal.current.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#094d8d] rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-600">Monthly Need</div>
                  <div className="text-xl font-semibold">
                    ${((goal.target - goal.current) / monthsLeft).toFixed(2)}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-600">Months Left</div>
                  <div className="text-xl font-semibold">{monthsLeft}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Add contribution"
                  className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#094d8d] focus:border-transparent"
                  onChange={(e) => {
                    if (e.target.value) {
                      onUpdateGoal(goal.id, Number(e.target.value));
                      e.target.value = "";
                    }
                  }}
                />
                <button className="bg-[#f47420] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors">
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Add New Goal</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Goal Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#094d8d] focus:border-transparent"
                  placeholder="e.g., Emergency Fund"
                  value={newGoal.name}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Target Amount ($)
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#094d8d] focus:border-transparent"
                  placeholder="e.g., 10000"
                  value={newGoal.target}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, target: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Initial Deposit ($)
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#094d8d] focus:border-transparent"
                  placeholder="e.g., 500"
                  value={newGoal.initialDeposit}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, initialDeposit: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional: Start with an initial contribution
                </p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#094d8d] focus:border-transparent"
                  value={newGoal.deadline}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, deadline: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGoal}
                  className="bg-[#f47420] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors font-medium"
                  disabled={
                    !newGoal.name || !newGoal.target || !newGoal.deadline
                  }
                >
                  Add Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StoryComponent() {
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
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto">
        <MainComponent
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
      </div>
    </div>
  );
});
}