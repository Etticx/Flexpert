/**
 * Flexpert AI Service
 * Handles communication with Google Gemini API
 */

const AIService = {
    // API Configuration
    // Reverting to hardcoded key as requested for school project simplicity
    API_KEY: 'AIzaSyABXUcr1BVi_maVzEgnVNozxD_6rNvboTs',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',

    // Key Management (Simplified)
    getKey: function () {
        return this.API_KEY;
    },

    setKey: function (key) {
        // No-op
    },

    hasKey: function () {
        return true; // Always has key now
    },

    // Send a message to the AI
    chat: async function (userMessage, currentPlan) {
        const apiKey = this.getKey();

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
            const response = await fetch(`${this.API_URL}?key=${apiKey}`, {
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
            throw error;
        }
    }
};

window.AIService = AIService;
