const url = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${OPENAI_API_KEY}`
};

const getScheduleRequest = async (preferences, takenCourses, remainingCourses) => {
  const credits = preferences?.credits || "unspecified";
  const availableSemesters = preferences?.availableSemesters || "unspecified";
  const gradSemester = preferences?.gradSemester || "unspecified";

  const prompt = `
I am a university student creating a course schedule.

Here is what you need to know:
- I want to take around ${credits} credits per semester.
- I am available to enroll during these semesters: ${availableSemesters}.
- I plan to graduate by: ${gradSemester}.
- I have already taken these courses: ${JSON.stringify(takenCourses)}
- I still need to complete the following courses: ${JSON.stringify(remainingCourses)}

Please generate a semester-by-semester schedule that:
- Includes ONLY the remaining courses
- Does not exceed my credit limit per semester
- Fits within the available semesters and graduation deadline

Make sure the plan is realistic based on credit limits. Organize it like this:

Fall 2025:
- COURSE_CODE Course Name (X credits)

Spring 2026:
- COURSE_CODE Course Name (X credits)

End the schedule at or before ${gradSemester}.

Return your response as a **pure JSON object only**, like this — no extra formatting, no explanation, no markdown:

{
  "Fall 2025": [["COP3502", "Programming Fundamentals 1", 3]],
  "Spring 2026": [["COP3503", "Programming Fundamentals 2", 3]]
}
`;

  const body = {
    model: "gpt-3.5-turbo-0125",
    messages: [
      { role: "system", content: "You are an academic advisor." },
      { role: "user", content: prompt }
    ]
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  console.log("Raw OpenAI Response:", content);

  // Clean up response to handle formatting issues
  let jsonString = content.trim();

  // Remove triple backticks and optional "json" language marker
  if (jsonString.startsWith("```")) {
    jsonString = jsonString.replace(/```(?:json)?/g, "").trim();
  }

  try {
    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (e) {
    return { rawResponse: content }; // fallback if not valid JSON
  }
};

export default getScheduleRequest;
