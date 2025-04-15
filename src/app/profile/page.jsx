"use client";
import React from "react";

import { useHandleStreamResponse } from "../utilities/runtime-helpers";

("use client");

function MainComponent() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [userProfile, setUserProfile] = React.useState({
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    joinDate: "January 2025",
    avatar: "/api/placeholder/400/400",
    stats: {
      coursesCompleted: 8,
      quizzesTaken: 12,
      averageScore: 85,
      totalLearningHours: 24,
      financialScore: 780,
    },
    achievements: [
      {
        id: 1,
        name: "Budget Master",
        date: "Feb 15, 2025",
        icon: "chart-pie",
        description: "Completed all budgeting courses",
        badge: "🏆",
      },
      {
        id: 2,
        name: "Investment Guru",
        date: "Mar 1, 2025",
        icon: "chart-line",
        description: "Achieved perfect score in investment quiz",
        badge: "📈",
      },
      {
        id: 3,
        name: "Savings Expert",
        date: "Mar 10, 2025",
        icon: "piggy-bank",
        description: "Reached first savings goal",
        badge: "💰",
      },
    ],
    recentActivity: [
      {
        id: 1,
        type: "course",
        name: "Investment Basics",
        date: "Mar 15, 2025",
        progress: 100,
      },
      {
        id: 2,
        type: "quiz",
        name: "Credit Score Quiz",
        date: "Mar 12, 2025",
        score: 90,
      },
      {
        id: 3,
        type: "course",
        name: "Retirement Planning",
        date: "Mar 8, 2025",
        progress: 75,
      },
    ],
    spendingTrends: {
      categories: ["Groceries", "Dining", "Transport", "Shopping"],
      amounts: [450, 320, 200, 180],
    },
    financialGoals: [
      "Save for retirement",
      "Build emergency fund",
      "Invest in stocks",
    ],
    riskTolerance: "Moderate",
    investmentExperience: "Intermediate",
    currentSavings: 12450.75,
    monthlyIncome: 5000,
  });
  const [expandedSections, setExpandedSections] = React.useState({
    achievements: true,
    recentActivity: true,
    bankStatement: true,
    financialInsights: true,
  });
  const [aiAnalysis, setAiAnalysis] = React.useState("");
  const [isLoadingAI, setIsLoadingAI] = React.useState(false);
  const [streamingMessage, setStreamingMessage] = React.useState("");
  const handleFinish = React.useCallback((message) => {
    setAiAnalysis(message);
    setStreamingMessage("");
  }, []);
  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: handleFinish,
  });
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };
  const generateAIAnalysis = async () => {
    setIsLoadingAI(true);
    try {
      const response = await fetch(
        "/integrations/anthropic-claude-sonnet-3-5/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content:
                  "You are a financial advisor AI. Analyze the user's financial data and provide personalized insights and recommendations.",
              },
              {
                role: "user",
                content: `Based on this user's profile and financial goals, provide personalized financial advice:
              Goals: ${userProfile.financialGoals.join(", ")}
              Risk Tolerance: ${userProfile.riskTolerance}
              Investment Experience: ${userProfile.investmentExperience}
              Current Savings: ${userProfile.currentSavings}
              Monthly Income: ${userProfile.monthlyIncome}
              Monthly Expenses: $3,250.25
              Spending Categories:
              - Groceries: $450
              - Dining: $320
              - Transport: $200
              - Shopping: $180
              FICO Score: ${userProfile.stats.financialScore}`,
              },
            ],
            stream: true,
          }),
        }
      );
      handleStreamResponse(response);
    } catch (error) {
      console.error("Error generating financial analysis:", error);
      setAiAnalysis(
        "Unable to generate financial analysis at this time. Please try again later."
      );
    } finally {
      setIsLoadingAI(false);
    }
  };

  React.useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile data");
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="text-red-600 text-lg">{error}</div>
          <button
            onClick={() => window.location.reload()}
            style={{ backgroundColor: "#f47420" }}
            className="mt-4 text-white px-6 py-2 rounded-md hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <div className="h-32 w-32 rounded-full bg-gray-100 animate-pulse mb-6" />
          </div>
          <div className="h-20 bg-gray-100 rounded-lg animate-pulse mb-6" />
          <div className="grid gap-6 md:grid-cols-4 mb-6">
            {[...Array.from({ length: 4 })].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array.from({ length: 4 })].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const spendingData = userProfile.spendingTrends.categories.map(
    (category, index) => ({
      name: category,
      value: userProfile.spendingTrends.amounts[index],
    })
  );
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 transition-transform hover:scale-105 duration-300">
            <img
              src={userProfile.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 transition-colors hover:text-blue-600">
              {userProfile.name}
            </h1>
            <p className="text-gray-600 mb-2">{userProfile.email}</p>
            <p className="text-sm text-gray-500">
              Member since {userProfile.joinDate}
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <a
                href="/"
                style={{ backgroundColor: "#094d8d" }}
                className="hover:opacity-90 text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2"
              >
                <i className="fas fa-home"></i>
                <span>Dashboard</span>
              </a>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition-all duration-300">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-book-open text-blue-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {userProfile.stats.coursesCompleted}
              </h3>
              <p className="text-sm text-gray-600">Courses Completed</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-credit-card text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {userProfile.stats.financialScore}
              </h3>
              <p className="text-sm text-gray-600">FICO Score</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-award text-yellow-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {userProfile.stats.averageScore}%
              </h3>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-clock text-purple-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {userProfile.stats.totalLearningHours}
              </h3>
              <p className="text-sm text-gray-600">Learning Hours</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div
              className="p-6 cursor-pointer flex items-center justify-between border-b border-gray-100"
              onClick={() => toggleSection("achievements")}
            >
              <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
              {expandedSections.achievements ? (
                <i className="fas fa-chevron-up text-gray-500"></i>
              ) : (
                <i className="fas fa-chevron-down text-gray-500"></i>
              )}
            </div>
            {expandedSections.achievements && (
              <div className="p-6 space-y-4">
                {userProfile.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl shadow-md"
                      style={{ backgroundColor: "#094d8d" }}
                    >
                      <span>{achievement.badge}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div
              className="p-6 cursor-pointer flex items-center justify-between border-b border-gray-100"
              onClick={() => toggleSection("recentActivity")}
            >
              <h2 className="text-xl font-bold text-gray-900">
                Recent Activity
              </h2>
              {expandedSections.recentActivity ? (
                <i className="fas fa-chevron-up text-gray-500"></i>
              ) : (
                <i className="fas fa-chevron-down text-gray-500"></i>
              )}
            </div>
            {expandedSections.recentActivity && (
              <div className="p-6 space-y-4">
                {userProfile.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-gray-900">
                        {activity.name}
                      </h3>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        {activity.date}
                      </span>
                    </div>
                    {activity.type === "course" && (
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                          <div
                            style={{
                              width: `${activity.progress}%`,
                              backgroundColor:
                                activity.progress === 100
                                  ? "#4CAF50"
                                  : "#094d8d",
                            }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 mt-2 inline-block">
                          {activity.progress}% Complete
                        </span>
                      </div>
                    )}
                    {activity.type === "quiz" && (
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                          <div
                            style={{
                              width: `${activity.score}%`,
                              backgroundColor: "#FFB400",
                            }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 mt-2 inline-block">
                          Score: {activity.score}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div
              className="p-6 cursor-pointer flex items-center justify-between border-b border-gray-100"
              onClick={() => toggleSection("bankStatement")}
            >
              <h2 className="text-xl font-bold text-gray-900">
                Bank Statement Overview
              </h2>
              {expandedSections.bankStatement ? (
                <i className="fas fa-chevron-up text-gray-500"></i>
              ) : (
                <i className="fas fa-chevron-down text-gray-500"></i>
              )}
            </div>
            {expandedSections.bankStatement && (
              <div className="p-6 space-y-4">
                <div className="p-6 bg-white border border-gray-100 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Current Balance
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    $12,450.75
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg">
                      <span className="text-gray-600 font-medium">
                        Monthly Income
                      </span>
                      <span className="text-green-600 font-bold">
                        $5,000.00
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg">
                      <span className="text-gray-600 font-medium">
                        Monthly Expenses
                      </span>
                      <span className="text-red-500 font-bold">$3,250.25</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg">
                      <span className="text-gray-600 font-medium">
                        Monthly Savings
                      </span>
                      <span className="text-blue-600 font-bold">$1,749.75</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div
              className="p-6 cursor-pointer flex items-center justify-between border-b border-gray-100"
              onClick={() => toggleSection("financialInsights")}
            >
              <h2 className="text-xl font-bold text-gray-900">
                Financial Health & AI Insights
              </h2>
              {expandedSections.financialInsights ? (
                <i className="fas fa-chevron-up text-gray-500"></i>
              ) : (
                <i className="fas fa-chevron-down text-gray-500"></i>
              )}
            </div>
            {expandedSections.financialInsights && (
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white border border-gray-100 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-4">
                      Monthly Spending Overview
                    </h3>
                    <div className="space-y-2">
                      {spendingData.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center p-2 bg-white border border-gray-100 rounded-lg"
                        >
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          ></div>
                          <span className="text-sm text-gray-700">
                            {item.name}
                          </span>
                          <span className="ml-auto text-sm font-medium text-gray-900">
                            ${item.value}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center p-2 mt-2 bg-gray-100 rounded-lg">
                        <span className="font-medium text-gray-800">Total</span>
                        <span className="font-bold text-gray-900">
                          $
                          {spendingData.reduce(
                            (sum, item) => sum + item.value,
                            0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={generateAIAnalysis}
                    disabled={isLoadingAI}
                    style={{ backgroundColor: "#f47420" }}
                    className="text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 hover:opacity-90"
                  >
                    <i className="fas fa-brain"></i>
                    {isLoadingAI
                      ? "Analyzing Your Finances..."
                      : "Get AI Financial Analysis"}
                  </button>
                </div>

                {(streamingMessage || aiAnalysis) && (
                  <div className="mt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg h-[300px] overflow-hidden flex flex-col">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2 bg-blue-50 py-2 px-4 border-b border-blue-100 sticky top-0 z-10">
                        <i className="fas fa-robot text-blue-500"></i>
                        AI Financial Analysis
                      </h3>
                      <div className="overflow-y-auto p-4 pt-2">
                        <p className="text-gray-700 whitespace-pre-line">
                          {streamingMessage || aiAnalysis}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;