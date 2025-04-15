async function handler({
  balance,
  monthlyBudget,
  budgetUsed,
  goals,
  spendingTrends,
  mode = "insights",
}) {
  // Define different prompt templates based on the mode
  let promptTemplate = "";

  if (mode === "insights") {
    // For insights mode, request a single sentence tip
    promptTemplate = `As a financial advisor, look at this user data:
    Current Balance: $${balance}
    Monthly Budget: $${monthlyBudget}
    Budget Used: $${budgetUsed}
    Goals: ${JSON.stringify(goals)}
    Spending Trends: ${JSON.stringify(spendingTrends)}
    
    Provide only a single sentence "tip of the day" based on the most important insight from this data.`;
  } else if (mode === "details") {
    // For details mode, request comprehensive advice
    promptTemplate = `As a financial advisor, analyze this data and provide personalized advice:
    Current Balance: $${balance}
    Monthly Budget: $${monthlyBudget}
    Budget Used: $${budgetUsed}
    Goals: ${JSON.stringify(goals)}
    Spending Trends: ${JSON.stringify(spendingTrends)}
    
    Provide specific, actionable financial advice with detailed instructions based on this data. Include:
    1. Budget assessment
    2. Spending pattern analysis
    3. Progress toward goals
    4. Recommended actions`;
  }

  try {
    const response = await fetch("/integrations/google-gemini-1-5/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: promptTemplate,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    return {
      advice: data.choices[0].message.content,
      mode: mode,
    };
  } catch (error) {
    console.error("Error getting AI advice:", error);
    return {
      error: "Failed to get AI advice",
      errorDetails: error.message,
    };
  }
}