"use client";
import React from "react";

function MainComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [aiTip, setAiTip] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAITip, setShowAITip] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const aiAdvisorRef = useRef(null);
  const chartData = [
    { name: "Jan", pv: 2400, uv: 4000 },
    { name: "Feb", pv: 1398, uv: 3000 },
    { name: "Mar", pv: 9800, uv: 2000 },
    { name: "Apr", pv: 3908, uv: 2780 },
    { name: "May", pv: 4800, uv: 1890 },
    { name: "Jun", pv: 3800, uv: 2390 },
    { name: "Jul", pv: 4300, uv: 3490 },
  ];
  const [userData, setUserData] = useState({
    balance: 5280.42,
    monthlyBudget: 3000,
    budgetUsed: 1850,
    creditScore: 780,
    spendingTrends: [
      { month: "Jan", amount: 2100 },
      { month: "Feb", amount: 1950 },
      { month: "Mar", amount: 1850 },
      { month: "Apr", amount: 2200 },
      { month: "May", amount: 1850 },
    ],
    goals: [
      { name: "Emergency Fund", current: 3000, target: 5000 },
      { name: "New Car", current: 2500, target: 15000 },
    ],
    achievements: [
      { name: "Budget Master", completed: true },
      { name: "Savings Expert", completed: false },
    ],
    courses: [
      { name: "Investing Basics", progress: 60 },
      { name: "Budgeting 101", progress: 100 },
      { name: "Credit Scores", progress: 30 },
    ],
  });
  const getNextInsight = async () => {
    setShowAITip(false);
    setAiLoading(true);
    try {
      const response = await fetch(
        "/integrations/anthropic-claude-sonnet-3-5/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `Based on this financial data, provide a single, specific financial tip or insight:
              Balance: ${userData.balance}
              Monthly Budget: ${userData.monthlyBudget}
              Budget Used: ${userData.budgetUsed}
              Credit Score: ${userData.creditScore}
              Goals: ${userData.goals
                .map((g) => `${g.name} (${g.current}/${g.target})`)
                .join(", ")}
              Recent Spending: ${userData.spendingTrends
                .slice(-3)
                .map((s) => `${s.month}: ${s.amount}`)
                .join(", ")}`,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get AI insight");
      }

      const data = await response.json();
      const newTip = data.choices[0].message.content;

      setTimeout(() => {
        setAiTip(newTip);
        setShowAITip(true);
        setAiLoading(false);
      }, 300);
    } catch (err) {
      console.error(err);
      setAiTip(
        "I'm having trouble analyzing your data right now. Please try again later."
      );
      setShowAITip(true);
      setAiLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        aiAdvisorRef.current &&
        !aiAdvisorRef.current.contains(event.target)
      ) {
        setShowAITip(false);
        setTimeout(() => setShowAITip(true), 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getFicoRating = (score) => {
    if (score >= 800) return "Exceptional";
    if (score >= 740) return "Very Good";
    if (score >= 670) return "Good";
    if (score >= 580) return "Fair";
    return "Poor";
  };
  const calculateFicoProgress = (score) => {
    return ((score - 300) / (850 - 300)) * 100;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#f47420] text-white px-6 py-2 rounded-md hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 text-lg">
            Loading Financial Dashboard...
          </p>
          <div className="mt-4 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#f47420] animate-progressFill"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header
        style={{ backgroundColor: "#094d8d" }}
        className="text-white fixed top-0 left-0 right-0 w-full z-10"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <a href="/" className="flex items-center space-x-2">
                <i className="fas fa-landmark text-2xl"></i>
                <span className="text-xl font-bold font-inter">
                  PNC Financial
                </span>
              </a>

              <nav className="hidden md:flex items-center space-x-6">
                <a
                  href="/"
                  className="hover:text-gray-300 transition-colors font-inter"
                >
                  Dashboard
                </a>

                <a
                  href="/learning-center"
                  className="hover:text-gray-300 transition-colors font-inter"
                >
                  Learn
                </a>

                <a
                  href="/goal-visualizer"
                  className="hover:text-gray-300 transition-colors font-inter"
                >
                  Goals
                </a>

                <a
                  href="/profile"
                  className="hover:text-gray-300 transition-colors font-inter"
                >
                  Profile
                </a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-blue-800 rounded-full transition-colors"
              >
                <i className="fas fa-bell"></i>

                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-blue-800 rounded-full transition-colors"
              >
                <i
                  className={`fas ${
                    mobileMenuOpen ? "fa-times" : "fa-bars"
                  } text-xl`}
                ></i>
              </button>
            </div>
          </div>

          {showNotifications && (
            <div className="absolute right-4 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
              <div className="p-4">
                <h3 className="text-gray-900 font-bold mb-4 font-inter">
                  Notifications
                </h3>

                {notifications.length === 0 ? (
                  <p className="text-gray-600 font-inter">
                    No new notifications
                  </p>
                ) : (
                  <div className="space-y-2">
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 rounded"
                      >
                        <p className="text-gray-900 font-inter">
                          {notification}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-2">
                <a
                  href="/"
                  className="hover:bg-blue-800 px-4 py-2 rounded font-inter"
                >
                  Dashboard
                </a>

                <a
                  href="/learning-center"
                  className="hover:bg-blue-800 px-4 py-2 rounded font-inter"
                >
                  Learn
                </a>

                <a
                  href="/goal-visualizer"
                  className="hover:bg-blue-800 px-4 py-2 rounded font-inter"
                >
                  Goals
                </a>

                <a
                  href="/profile"
                  className="hover:bg-blue-800 px-4 py-2 rounded font-inter"
                >
                  Profile
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 mt-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 font-inter">
                Balance
              </h3>
              <div className="w-10 h-10 rounded-full bg-[#094d8d]/10 flex items-center justify-center">
                <i className="fas fa-wallet text-[#094d8d]"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 font-inter mb-4">
              ${userData.balance.toLocaleString()}
            </p>
            <div className="mt-auto">
              <a
                href="/statements"
                className="text-sm text-[#094d8d] hover:text-[#094d8d]/70 transition-colors font-inter flex items-center gap-2"
              >
                View Statements
                <i className="fas fa-arrow-right text-xs"></i>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 font-inter">
                Credit Score
              </h3>
              <div className="w-10 h-10 rounded-full bg-[#094d8d]/10 flex items-center justify-center">
                <i className="fas fa-chart-line text-[#094d8d]"></i>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <p className="text-3xl font-bold text-gray-900 font-inter">
                  {userData.creditScore}
                </p>
                <span className="text-sm font-semibold bg-[#094d8d]/10 text-[#094d8d] px-3 py-1 rounded-full font-inter">
                  {getFicoRating(userData.creditScore)}
                </span>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 font-inter">
                  Poor
                </span>
                <span className="text-xs font-semibold text-gray-500 font-inter">
                  Exceptional
                </span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                <div
                  style={{
                    width: `${calculateFicoProgress(userData.creditScore)}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#094d8d] to-[#f47420] transition-all duration-500"
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">300</span>
                <span className="text-xs text-gray-400">850</span>
              </div>
            </div>
          </div>

          <div
            ref={aiAdvisorRef}
            className="bg-gradient-to-br from-[#094d8d] to-[#094d8d]/90 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white font-inter">
                AI Financial Analysis
              </h3>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <i className="fas fa-robot text-white"></i>
              </div>
            </div>

            <div className="h-[180px] mb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
              {aiLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              ) : (
                <p
                  className={`text-white/90 transition-opacity duration-300 ${
                    showAITip ? "opacity-100" : "opacity-0"
                  } font-inter`}
                >
                  {aiTip}
                </p>
              )}
            </div>

            <button
              onClick={getNextInsight}
              disabled={aiLoading}
              className="w-full bg-white text-[#094d8d] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white/90 transition-colors font-inter disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {aiLoading ? (
                <>
                  <span className="animate-pulse">Analyzing...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-sync-alt"></i>
                  <span>Get New Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="mt-6">
          <></>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-inter">
            Learning Progress
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {userData.courses.map((course, index) => (
              <a
                href="/learning-center"
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900 font-inter">
                    {course.name}
                  </h3>

                  <span className="text-sm text-gray-700 font-inter">
                    {course.progress}%
                  </span>
                </div>

                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{
                        width: `${course.progress}%`,
                        backgroundColor: "#f47420",
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                    ></div>
                  </div>
                </div>

                {course.progress === 100 && (
                  <div className="mt-4 flex items-center text-gray-700">
                    <i className="fas fa-medal mr-2"></i>

                    <span className="text-sm font-inter">
                      Course Completed!
                    </span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-inter">
              Financial Goals
            </h2>

            {userData.goals.map((goal, index) => (
              <div
                key={index}
                className="mb-4 cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() =>
                  setSelectedGoal(selectedGoal === index ? null : index)
                }
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-inter">{goal.name}</span>

                  <span className="text-sm text-gray-700 font-inter">
                    ${goal.current} / ${goal.target}
                  </span>
                </div>

                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{
                        width: `${(goal.current / goal.target) * 100}%`,
                        backgroundColor: "#f47420",
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                    ></div>
                  </div>
                </div>

                {selectedGoal === index && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg animate-fadeIn">
                    <p className="text-sm text-gray-700 mb-2 font-inter">
                      Progress: {Math.round((goal.current / goal.target) * 100)}
                      %
                    </p>

                    <p className="text-sm text-gray-700 font-inter">
                      Remaining: ${goal.target - goal.current}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-inter">
              Achievements
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {userData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transform transition-all hover:scale-105 ${
                    achievement.completed
                      ? "border-gray-900"
                      : "border-gray-200"
                  }`}
                >
                  <i
                    className={`fas fa-trophy mb-2 ${
                      achievement.completed
                        ? "text-gray-900 animate-pulse"
                        : "text-gray-400"
                    }`}
                  ></i>

                  <p
                    className={`text-sm ${
                      achievement.completed ? "text-gray-900" : "text-gray-500"
                    } font-inter`}
                  >
                    {achievement.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center items-center gap-6">
          <a
            href="/quiz"
            className="group relative px-8 py-3 rounded-full bg-[#f47420] text-white font-inter transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] flex items-center gap-2"
          >
            <i className="fas fa-pencil-alt"></i>
            <span>Take a Quiz</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </a>

          <a
            href="/learning-center"
            className="group relative px-8 py-3 rounded-full bg-[#f47420] text-white font-inter transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] flex items-center gap-2"
          >
            <i className="fas fa-book"></i>
            <span>View All Courses</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </a>

          <a
            href="/goal-visualizer"
            className="group relative px-8 py-3 rounded-full bg-[#f47420] text-white font-inter transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] flex items-center gap-2"
          >
            <i className="fas fa-flag"></i>
            <span>Set New Goal</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </a>
        </div>
      </main>

      <style jsx global>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 1s infinite;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        body {
          background-color: white;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;