"use client";
import React from "react";

function MainComponent() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Investing Basics",
      progress: 60,
      description:
        "Learn the fundamentals of investing, including stocks, bonds, and mutual funds. Perfect for beginners looking to grow their wealth.",
      topics: [
        "Stock Market Basics",
        "Understanding Bonds",
        "Mutual Funds 101",
        "Risk Management",
      ],
      duration: "2 hours",
      level: "Beginner",
      videoId: "hrvN7hza4T0",
      quiz: {
        questions: [
          {
            text: "What is compound interest?",
            options: [
              "Interest calculated only on the initial principal",
              "Interest calculated on the initial principal and accumulated interest",
              "A fixed interest rate that never changes",
              "Interest paid only at the end of a loan term",
            ],
            correctAnswer: 1,
          },
          {
            text: "How does a 401(k) work?",
            options: [
              "It's a personal savings account with no tax benefits",
              "It's a type of investment only available to people over 40",
              "It's an employer-sponsored retirement plan with tax advantages",
              "It's a government bond that matures in 401 days",
            ],
            correctAnswer: 2,
          },
        ],
      },
      scenario: {
        question: "You received a $500 bonus. What's your next move?",
        options: [
          {
            text: "Save it all in your emergency fund",
            isGood: true,
            feedback:
              "Great choice! Building your emergency fund is a smart financial move.",
          },
          {
            text: "Invest in stocks",
            isGood: true,
            feedback:
              "Good thinking! Investing can help your money grow over time.",
          },
          {
            text: "Go on a shopping spree",
            isGood: false,
            feedback:
              "Consider saving or investing at least part of your bonus for long-term goals.",
          },
          {
            text: "Pay down high-interest debt",
            isGood: true,
            feedback:
              "Excellent choice! Reducing high-interest debt is one of the best returns on your money.",
          },
        ],
      },
      rewards: {
        cashback: 5,
        badges: ["Half Way Hero"],
      },
    },
    {
      id: 2,
      name: "Budgeting 101",
      progress: 100,
      description:
        "Master the essentials of personal budgeting. Create, maintain, and stick to a budget that helps you achieve your financial goals.",
      topics: [
        "Creating a Budget",
        "Expense Tracking",
        "Saving Strategies",
        "Debt Management",
      ],
      duration: "1.5 hours",
      level: "Beginner",
      videoId: "Dugn51K_6WA",
      quiz: {
        questions: [
          {
            text: "What is the 50/30/20 rule?",
            options: [
              "Spend 50% on needs, 30% on wants, 20% on savings",
              "Save 50%, invest 30%, spend 20%",
              "Pay 50% of debt, save 30%, spend 20%",
              "Invest 50% in stocks, 30% in bonds, 20% in cash",
            ],
            correctAnswer: 0,
          },
          {
            text: "How do you track expenses?",
            options: [
              "Only track large purchases",
              "Track all expenses including small daily purchases",
              "Track only monthly bills",
              "Tracking expenses is unnecessary if you have enough income",
            ],
            correctAnswer: 1,
          },
        ],
      },
      scenario: {
        question: "Your monthly income is $3,000. How would you budget it?",
        options: [
          {
            text: "Spend it all and worry next month",
            isGood: false,
            feedback:
              "Without a budget, you might find yourself short on essential expenses.",
          },
          {
            text: "Save 100% and live with parents",
            isGood: false,
            feedback:
              "While saving is good, you need to allocate money for necessities.",
          },
          {
            text: "$1,500 needs, $900 wants, $600 savings",
            isGood: true,
            feedback:
              "Following the 50/30/20 rule is a great budgeting strategy!",
          },
          {
            text: "$2,400 needs, $600 wants, $0 savings",
            isGood: false,
            feedback:
              "Try to include some savings in your budget for future goals.",
          },
        ],
      },
      rewards: {
        cashback: 10,
        badges: ["Module Master", "Half Way Hero"],
      },
    },
    {
      id: 3,
      name: "Credit Scores",
      progress: 30,
      description:
        "Understand how credit scores work and learn practical ways to improve your creditworthiness.",
      topics: [
        "Credit Score Factors",
        "Improving Your Score",
        "Credit Reports",
        "Common Mistakes",
      ],
      duration: "1 hour",
      level: "Intermediate",
      videoId: "4r9Gbyxl0Ac",
      quiz: {
        questions: [
          {
            text: "What affects your credit score?",
            options: [
              "Only your payment history",
              "Your income and payment history",
              "Payment history, utilization, length of history, new credit, and credit mix",
              "Only the total amount of debt you have",
            ],
            correctAnswer: 2,
          },
          {
            text: "How often should you check your credit report?",
            options: [
              "Never, it will hurt your score",
              "Once every few years",
              "At least once a year",
              "Only when applying for a loan",
            ],
            correctAnswer: 2,
          },
        ],
      },
      scenario: {
        question:
          "You find an error on your credit report. What should you do?",
        options: [
          {
            text: "Ignore it, it will fix itself",
            isGood: false,
            feedback:
              "Errors won't fix themselves and could negatively impact your score.",
          },
          {
            text: "Dispute it with the credit bureau",
            isGood: true,
            feedback:
              "That's right! Disputing errors is your right under the Fair Credit Reporting Act.",
          },
          {
            text: "Call your bank to fix it",
            isGood: false,
            feedback:
              "Your bank isn't responsible for credit report errors. Contact the credit bureau.",
          },
          {
            text: "Pay someone to fix it for you",
            isGood: false,
            feedback:
              "You can dispute errors yourself for free without paying a service.",
          },
        ],
      },
      rewards: {
        cashback: 7,
        badges: [],
      },
    },
  ]);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFeedback, setQuizFeedback] = useState({});
  const [scenarioFeedback, setScenarioFeedback] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [activeCourse, setActiveCourse] = useState(1);

  // Initialize current question for each course
  useEffect(() => {
    const initialQuestions = {};
    courses.forEach((course) => {
      initialQuestions[course.id] = 0;
    });
    setCurrentQuestion(initialQuestions);
  }, [courses]);

  const handleQuizAnswer = (courseId, questionIndex, answerIndex) => {
    const course = courses.find((c) => c.id === courseId);
    const isCorrect =
      course.quiz.questions[questionIndex].correctAnswer === answerIndex;

    setSelectedAnswers({
      ...selectedAnswers,
      [`${courseId}-${questionIndex}`]: answerIndex,
    });

    setQuizFeedback({
      ...quizFeedback,
      [`${courseId}-${questionIndex}`]: {
        isCorrect,
        message: isCorrect
          ? "Correct! Well done."
          : `Incorrect. The correct answer is: ${
              course.quiz.questions[questionIndex].options[
                course.quiz.questions[questionIndex].correctAnswer
              ]
            }`,
      },
    });

    // Move to next question after answering
    if (questionIndex < course.quiz.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion({
          ...currentQuestion,
          [courseId]: questionIndex + 1,
        });
      }, 1500);
    }
  };

  const handleScenario = (courseId, optionIndex) => {
    const course = courses.find((c) => c.id === courseId);
    const option = course.scenario.options[optionIndex];

    setScenarioFeedback({
      ...scenarioFeedback,
      [courseId]: {
        isGood: option.isGood,
        message: option.feedback,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex space-x-4 mb-4">
            <a
              href="/"
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Dashboard
            </a>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <i className="fas fa-graduation-cap text-2xl text-gray-900"></i>
              <span className="text-xl font-bold font-inter text-gray-900">
                Learning Center
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="/dashboard"
                className="text-gray-700 hover:text-gray-900 font-inter"
              >
                Dashboard
              </a>
              <a href="/learn" className="text-gray-900 font-inter">
                Learn
              </a>
              <a
                href="/goals"
                className="text-gray-700 hover:text-gray-900 font-inter"
              >
                Goals
              </a>
            </nav>
            <button className="md:hidden text-gray-900">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>

          {/* Course Navigation Tabs */}
          <div className="flex mt-6 border-b border-gray-200">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setActiveCourse(course.id)}
                className={`mr-6 pb-3 font-medium ${
                  activeCourse === course.id
                    ? "text-[#f47420] border-b-2 border-[#f47420]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {course.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className={activeCourse === course.id ? "block" : "hidden"}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left column - Video and course info */}
              <div className="md:w-7/12 pr-0 md:pr-6">
                <div className="w-full aspect-video bg-black rounded-lg mb-4 relative overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${course.videoId}`}
                    title="Financial Education Video"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Video thumbnails below main video */}
                <div className="flex gap-2 mb-5">
                  <div className="relative rounded border-2 border-[#f47420] overflow-hidden flex-1 aspect-video">
                    <img
                      src={`https://img.youtube.com/vi/${course.videoId}/mqdefault.jpg`}
                      alt="Video thumbnail 1"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#f47420] text-white rounded-full w-8 h-8 flex items-center justify-center">
                        <i className="fas fa-play"></i>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded border border-gray-200 overflow-hidden flex-1 aspect-video">
                    <img
                      src="https://img.youtube.com/vi/Dugn51K_6WA/mqdefault.jpg"
                      alt="Video thumbnail 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative rounded border border-gray-200 overflow-hidden flex-1 aspect-video">
                    <img
                      src="https://img.youtube.com/vi/4r9Gbyxl0Ac/mqdefault.jpg"
                      alt="Video thumbnail 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {course.name}
                </h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {course.level}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {course.duration}
                  </span>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Course progress</span>
                    <span className="text-[#f47420] font-bold">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#f47420]"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Right column - Quiz */}
              <div className="md:w-5/12">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#f47420] text-white flex items-center justify-center mr-3">
                      <i className="fas fa-question-circle"></i>
                    </div>
                    <h3 className="text-lg font-bold">Quiz</h3>
                  </div>

                  {course.quiz.questions.map(
                    (question, qIndex) =>
                      qIndex === currentQuestion[course.id] && (
                        <div key={qIndex} className="mb-6">
                          <p className="font-medium mb-4 text-gray-800">
                            {qIndex + 1}. {question.text}
                          </p>
                          <div className="space-y-3">
                            {question.options.map((option, aIndex) => (
                              <button
                                key={aIndex}
                                onClick={() =>
                                  handleQuizAnswer(course.id, qIndex, aIndex)
                                }
                                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                  selectedAnswers[`${course.id}-${qIndex}`] ===
                                  aIndex
                                    ? selectedAnswers[
                                        `${course.id}-${qIndex}`
                                      ] === question.correctAnswer
                                      ? "border-green-500 bg-green-50"
                                      : "border-red-500 bg-red-50"
                                    : "border-gray-200 hover:bg-gray-100"
                                }`}
                              >
                                <span className="flex items-center">
                                  <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 mr-3">
                                    {String.fromCharCode(65 + aIndex)}
                                  </span>
                                  {option}
                                  {selectedAnswers[`${course.id}-${qIndex}`] ===
                                    aIndex && (
                                    <span className="ml-auto">
                                      {selectedAnswers[
                                        `${course.id}-${qIndex}`
                                      ] === question.correctAnswer ? (
                                        <i className="fas fa-check-circle text-green-500"></i>
                                      ) : (
                                        <i className="fas fa-times-circle text-red-500"></i>
                                      )}
                                    </span>
                                  )}
                                </span>
                              </button>
                            ))}
                          </div>
                          {quizFeedback[`${course.id}-${qIndex}`] && (
                            <div
                              className={`mt-4 p-3 rounded-lg ${
                                quizFeedback[`${course.id}-${qIndex}`].isCorrect
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {quizFeedback[`${course.id}-${qIndex}`].message}
                            </div>
                          )}
                        </div>
                      )
                  )}

                  {/* Show scenario only after quiz questions are done */}
                  {currentQuestion[course.id] >=
                    course.quiz.questions.length && (
                    <div className="mt-8">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#f47420] text-white flex items-center justify-center mr-3">
                          <i className="fas fa-lightbulb"></i>
                        </div>
                        <h3 className="text-lg font-bold">
                          Scenario Challenge
                        </h3>
                      </div>
                      <p className="mb-4">{course.scenario.question}</p>
                      <div className="space-y-3">
                        {course.scenario.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleScenario(course.id, index)}
                            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-100"
                          >
                            {option.text}
                          </button>
                        ))}
                      </div>
                      {scenarioFeedback[course.id] && (
                        <div
                          className={`mt-4 p-3 rounded-lg ${
                            scenarioFeedback[course.id].isGood
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {scenarioFeedback[course.id].message}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default MainComponent;