/**
 * Flexpert AI Service
 * Handles communication with Google Gemini API
 *
 * The API key is injected at build time by Vite from the .env file.
 * Never hardcode the key here — set VITE_GEMINI_API_KEY in .env instead.
 */

const AIService = {
    // Vite replaces import.meta.env.VITE_GEMINI_API_KEY with the
    // actual value at build time. The key never appears in source code.
    API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',

    hasKey: function () {
        return !!this.API_KEY && this.API_KEY !== 'your_gemini_api_key_here';
    },

    // Send a message to the AI
    chat: async function (userMessage, currentPlan) {
        if (!this.hasKey()) {
            return "AI chat is unavailable — VITE_GEMINI_API_KEY is not set in your .env file.";
        }

        // Prepare System Prompt
        let systemPrompt = `You are a helpful fitness assistant integrated into Flexpert, an AI fitness coaching app. 
        You provide friendly, encouraging, and knowledgeable responses about fitness, workouts, nutrition, and health.
        
        Keep your responses:
        - Concise and actionable (2-3 sentences max)
        - Encouraging and motivational
        - Focused on fitness/health logic
        - Safe for all levels`;

        if (currentPlan) {
            systemPrompt += `\n\nCONTEXT - The user has this workout plan:
            Strategy: ${currentPlan.strategy}
            Exercises: ${currentPlan.exercises?.join(', ')}
            Schedule: ${currentPlan.schedule}
            Equipment: ${currentPlan.equipment?.join(', ')}
            Intensity: ${currentPlan.intensity}`;
        }

        const requestBody = {
            contents: [
                {
                    parts: [
                        { text: `${systemPrompt}\n\nUser: ${userMessage}` }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 512,
            }
        };

        try {
            const response = await fetch(`${this.API_URL}?key=${this.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'API Request Failed');
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;

        } catch (error) {
            console.error("AI Error:", error);
            return "I'm currently offline, but your workout plan is ready! For additional fitness questions, consult with a certified trainer or fitness professional.";
        }
    }
};

export default AIService;
