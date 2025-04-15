"use client";
import React from "react";

("use client");

function MainComponent() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [feedbackType, setFeedbackType] = React.useState("");
  const questions = [
    {
      question: "What is compound interest?",
      options: [
        "Interest earned only on the principal amount",
        "Interest earned on both principal and accumulated interest",
        "A fixed interest rate that never changes",
        "Interest paid at the end of a loan term",
      ],
      correct: 1,
      explanation:
        "Compound interest is interest earned on both your initial investment (principal) and previously accumulated interest.",
    },
    {
      question: "Which of these is typically considered the most liquid asset?",
      options: [
        "Real estate",
        "Stocks",
        "Cash in a savings account",
        "Collectible items",
      ],
      correct: 2,
      explanation:
        "Cash in a savings account is the most liquid asset as it can be accessed and used immediately without losing value.",
    },
    {
      question: "What is a credit score primarily used for?",
      options: [
        "To determine your net worth",
        "To evaluate your creditworthiness",
        "To calculate your tax bracket",
        "To set your insurance rates",
      ],
      correct: 1,
      explanation:
        "A credit score is primarily used by lenders to evaluate your creditworthiness and determine lending terms.",
    },
  ];
  const [streak, setStreak] = React.useState(0);
  const [showReward, setShowReward] = React.useState(false);
  const [rewardMessage, setRewardMessage] = React.useState("");
  const [answers, setAnswers] = React.useState([]);
  const [touchStart, setTouchStart] = React.useState(null);
  const [touchEnd, setTouchEnd] = React.useState(null);

  const handleAnswerClick = (selectedOption) => {
    const correct = selectedOption === questions[currentQuestion].correct;
    const newAnswers = [...answers, { question: currentQuestion, correct }];
    setAnswers(newAnswers);

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(score + 1);
      setFeedbackType("success");

      if (newStreak === 3) {
        setShowReward(true);
        setRewardMessage("Amazing! 3 correct answers in a row! 🔥");
        setTimeout(() => setShowReward(false), 2000);
        setStreak(0);
      }
    } else {
      setStreak(0);
      setFeedbackType("error");
    }

    setFeedback(questions[currentQuestion].explanation);

    setTimeout(() => {
      setFeedback("");
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScore(true);
      }
    }, 2000);
  };
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/dashboard" className="flex items-center space-x-2">
              <img
                src="/bUdgetly.png"
                alt="Budgetly Logo"
                className="h-12 w-auto"
              />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 mt-20">
        <div className="flex justify-between items-center mb-6">
          <a
            href="/learning-center"
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Learning Center
          </a>
        </div>
        <a href="/dashboard" className="block mb-6">
          <h1 className="text-3xl font-bold font-inter text-gray-900 text-center hover:text-gray-700 transition-colors">
            Financial Quiz
          </h1>
        </a>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          {showScore ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold font-inter text-gray-900 mb-4">
                Quiz Complete!
              </h2>
              <p className="text-xl font-inter text-black mb-6">
                You scored {score} out of {questions.length}
              </p>
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-[#094d8d] h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(score / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <button
                onClick={restartQuiz}
                className="bg-[#f47420] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-colors font-inter"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-inter text-black">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    {streak > 0 && (
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-sm">
                        🔥 {streak}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-inter text-black">
                    Score: {score}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[#094d8d] h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / questions.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl mb-6 border border-orange-100">
                <h2 className="text-xl font-bold font-inter text-black mb-2">
                  {questions[currentQuestion].question}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    onTouchStart={(e) => setTouchStart(e.touches[0].clientY)}
                    onTouchEnd={(e) => {
                      setTouchEnd(e.changedTouches[0].clientY);
                      if (touchStart - e.changedTouches[0].clientY > 50) {
                        handleAnswerClick(index);
                      }
                    }}
                    className="w-full text-left p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-inter text-black"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-black">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
              {showReward && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-2xl z-50 animate-bounce">
                  <div className="text-2xl mb-2">🎉</div>
                  <div className="text-lg font-inter text-black">
                    {rewardMessage}
                  </div>
                </div>
              )}
              {feedback && (
                <div
                  className={`mt-6 p-6 rounded-xl ${
                    feedbackType === "success"
                      ? "bg-green-50 text-green-800 border-l-4 border-green-500"
                      : "bg-red-50 text-red-800 border-l-4 border-red-500"
                  } font-inter`}
                >
                  <div className="flex items-center space-x-2">
                    <i
                      className={`fas ${
                        feedbackType === "success"
                          ? "fa-check-circle"
                          : "fa-times-circle"
                      }`}
                    ></i>
                    <span>{feedback}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;