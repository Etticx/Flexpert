// Application State
let currentQuestionIndex = 0;
let userAnswers = {};
let isAnswering = false; // Lock to prevent multiple clicks

// DOM Elements
const questionCard = document.getElementById('questionCard');
const resultCard = document.getElementById('resultCard');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const backBtn = document.getElementById('backBtn');
const actionButtons = document.getElementById('actionButtons');
const finalBackBtn = document.getElementById('finalBackBtn');
const submitBtn = document.getElementById('submitBtn');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const resultContent = document.getElementById('resultContent');
const restartBtn = document.getElementById('restartBtn');

// Initialize the app
function init() {
    renderQuestion();
    updateProgress();
}

// Render current question
function renderQuestion() {
    const question = knowledgeBase.questions[currentQuestionIndex];
    questionText.textContent = question.text;
    optionsContainer.innerHTML = '';
    actionButtons.style.display = 'none';
    isAnswering = false; // Reset lock when rendering new question

    // Show/hide back button (hide on last question since action buttons have their own back)
    if (currentQuestionIndex === knowledgeBase.questions.length - 1) {
        backBtn.style.display = 'none';
    } else {
        backBtn.style.display = currentQuestionIndex > 0 ? 'flex' : 'none';
    }

    if (question.type === 'choice') {
        // Render choice buttons
        question.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option.label;
            btn.onclick = () => handleAnswer(question.id, option.value, option.label);
            optionsContainer.appendChild(btn);
        });
    } else if (question.type === 'text') {
        // Render text input
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-field';
        input.placeholder = 'Enter your answer...';
        input.id = 'textInput';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-primary';
        nextBtn.textContent = 'Next';
        nextBtn.onclick = () => {
            const value = input.value.trim();
            if (value) {
                handleAnswer(question.id, value, value);
            }
        };
        
        inputGroup.appendChild(input);
        inputGroup.appendChild(nextBtn);
        optionsContainer.appendChild(inputGroup);
        
        // Focus input
        setTimeout(() => input.focus(), 100);
    }

    // Show action buttons on last question
    if (currentQuestionIndex === knowledgeBase.questions.length - 1) {
        actionButtons.style.display = 'flex';
    }
}

// Handle answer selection
function handleAnswer(questionId, value) {
    // Prevent multiple clicks
    if (isAnswering) {
        return;
    }
    isAnswering = true;

    // Store answer
    const question = knowledgeBase.questions[currentQuestionIndex];
    const answerKey = getAnswerKey(questionId);
    userAnswers[answerKey] = value;

    // Visual feedback
    const clickedBtn = event?.target || document.activeElement;
    
    clickedBtn.style.background = 'linear-gradient(135deg, var(--success-green) 0%, #00cc6a 100%)';
    clickedBtn.style.borderColor = 'var(--success-green)';
    clickedBtn.style.color = 'var(--primary-dark)';
    clickedBtn.style.transform = 'scale(0.98)';

    // Disable all option buttons to prevent further clicks
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });

    // Auto-advance for choice questions (except last question)
    if (question.type === 'choice' && currentQuestionIndex < knowledgeBase.questions.length - 1) {
        setTimeout(() => {
            questionCard.classList.add('fade-out');
            setTimeout(() => {
                questionCard.classList.remove('fade-out');
                currentQuestionIndex++;
                renderQuestion();
                updateProgress();
            }, 300);
        }, 200);
    } else {
        // For last question, reset lock so submit button works
        setTimeout(() => {
            isAnswering = false;
        }, 300);
    }
}

// Get answer key based on question ID
function getAnswerKey(questionId) {
    const keyMap = {
        1: 'goal',
        2: 'body_type',
        3: 'days',
        4: 'limitations',
        5: 'environment',
        6: 'intensity',
        7: 'duration'
    };
    return keyMap[questionId] || `q${questionId}`;
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / knowledgeBase.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.innerHTML = `<i class="fas fa-clipboard-list"></i> Step ${currentQuestionIndex + 1} of ${knowledgeBase.questions.length}`;
}

// Back button handler
backBtn.onclick = () => {
    if (currentQuestionIndex > 0 && !isAnswering) {
        isAnswering = true; // Lock during transition
        questionCard.classList.add('fade-out');
        setTimeout(() => {
            questionCard.classList.remove('fade-out');
            currentQuestionIndex--;
            renderQuestion();
            updateProgress();
        }, 300);
    }
};

// Final back button handler
finalBackBtn.onclick = () => {
    if (currentQuestionIndex > 0 && !isAnswering) {
        isAnswering = true; // Lock during transition
        questionCard.classList.add('fade-out');
        setTimeout(() => {
            questionCard.classList.remove('fade-out');
            currentQuestionIndex--;
            renderQuestion();
            updateProgress();
        }, 300);
    }
};

// Submit button handler
submitBtn.onclick = () => {
    // Prevent multiple submissions
    if (isAnswering) {
        return;
    }

    // Ensure last question is answered
    const lastQuestion = knowledgeBase.questions[currentQuestionIndex];
    const lastAnswerKey = getAnswerKey(lastQuestion.id);
    
    if (!userAnswers[lastAnswerKey]) {
        alert('Please select an option before submitting.');
        return;
    }

    isAnswering = true; // Lock during submission

    // Run inference engine
    const recommendation = runInferenceEngine();
    
    // Display results
    displayResults(recommendation);
};

// Inference Engine - Forward Chaining with Priority-Based Rules
function runInferenceEngine() {
    // Check for special case rules first (highest priority overrides)
    for (const rule of knowledgeBase.specialRules) {
        if (matchesConditions(rule.conditions)) {
            return buildRecommendation(rule.recommendation);
        }
    }
    
    // Build recommendation by applying rules in priority order
    let recommendation = {};
    
    // PRIORITY 1: Safety & Limitation Rules
    for (const rule of knowledgeBase.safetyRules) {
        if (matchesConditions(rule.conditions)) {
            Object.assign(recommendation, rule.overrides);
            break;
        }
    }
    
    // PRIORITY 2: Strategy Rules
    for (const rule of knowledgeBase.strategyRules) {
        if (matchesConditions(rule.conditions)) {
            if (!recommendation.strategy) {
                recommendation.strategy = rule.strategy;
            }
            break;
        }
    }
    
    // PRIORITY 3: Equipment Rules
    for (const rule of knowledgeBase.equipmentRules) {
        if (matchesConditions(rule.conditions)) {
            recommendation.equipment = rule.equipment;
            break;
        }
    }
    
    // PRIORITY 4: Schedule & Duration Rules
    for (const rule of knowledgeBase.scheduleRules) {
        if (matchesConditions(rule.conditions)) {
            if (rule.schedule) {
                recommendation.schedule = rule.schedule;
            }
            if (rule.sessionStyle) {
                recommendation.sessionStyle = rule.sessionStyle;
            }
        }
    }
    
    // PRIORITY 5: Intensity Adjustment Rules
    for (const rule of knowledgeBase.intensityRules) {
        if (matchesConditions(rule.conditions)) {
            if (!recommendation.intensity) {
                recommendation.intensity = rule.finalIntensity;
            }
            break;
        }
    }
    
    // Fill in any missing fields with defaults
    return buildRecommendation(recommendation);
}

// Helper function to check if conditions match user answers
function matchesConditions(conditions) {
    for (const [key, value] of Object.entries(conditions)) {
        if (Array.isArray(value)) {
            if (!value.includes(userAnswers[key])) {
                return false;
            }
        } else {
            if (userAnswers[key] !== value) {
                return false;
            }
        }
    }
    return true;
}

// Helper function to build complete recommendation
function buildRecommendation(partial) {
    const defaults = knowledgeBase.defaultRecommendation;
    
    return {
        strategy: partial.strategy || defaults.strategy,
        exercises: partial.exercises || defaults.exercises,
        schedule: partial.schedule || defaults.schedule,
        equipment: partial.equipment || defaults.equipment,
        intensity: partial.intensity || defaults.intensity,
        advice: partial.advice || defaults.advice,
        sessionStyle: partial.sessionStyle || null
    };
}

// Format schedule for display
function formatSchedule(baseSchedule) {
    // Just return the schedule as-is from the recommendation
    return baseSchedule;
}

// Store current recommendation for chat context
let currentRecommendation = null;

// Display results
function displayResults(recommendation) {
    currentRecommendation = recommendation; // Store for chat context
    questionCard.style.display = 'none';
    resultCard.style.display = 'block';
    
    // Format schedule for display
    const userSchedule = formatSchedule(recommendation.schedule);
    
    let html = `
        <div style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(255, 51, 51, 0.1); border-radius: 12px; border-left: 4px solid var(--primary-red);">
            <h3><i class="fas fa-bullseye"></i> Strategy</h3>
            <p style="font-size: 1.15rem; font-weight: 600; color: #fff; margin-top: 0.5rem;">${recommendation.strategy}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3><i class="fas fa-dumbbell"></i> Exercises</h3>
            <ul style="list-style: none; padding: 0; margin-top: 1rem;">
    `;
    
    recommendation.exercises.forEach(exercise => {
        html += `<li style="padding: 0.8rem 1rem; background: rgba(0, 255, 136, 0.1); margin-bottom: 0.6rem; border-radius: 8px; border-left: 3px solid var(--success-green); color: #fff; font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-check-circle" style="color: var(--success-green);"></i> ${exercise}
        </li>`;
    });
    
    html += `
            </ul>
        </div>
        
        <div style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(255, 107, 53, 0.1); border-radius: 12px; border-left: 4px solid var(--accent-orange);">
            <h3><i class="fas fa-calendar-alt"></i> Schedule</h3>
            <p style="font-size: 1.1rem; font-weight: 600; color: #fff; margin-top: 0.5rem;">${userSchedule}</p>
            ${recommendation.sessionStyle ? `<p style="font-size: 0.95rem; color: #ffa500; margin-top: 0.5rem;"><i class="fas fa-clock"></i> ${recommendation.sessionStyle}</p>` : ''}
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3><i class="fas fa-tools"></i> Equipment Needed</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 1rem;">
    `;
    
    recommendation.equipment.forEach(item => {
        html += `<span style="background: rgba(255, 215, 0, 0.2); padding: 0.6rem 1.2rem; border-radius: 25px; font-size: 0.95rem; border: 2px solid var(--accent-yellow); color: var(--accent-yellow); font-weight: 600; display: inline-flex; align-items: center; gap: 0.4rem;">
            <i class="fas fa-check"></i> ${item}
        </span>`;
    });
    
    html += `
            </div>
        </div>
        
        <div style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(255, 51, 51, 0.15); border-radius: 12px; border: 2px solid var(--primary-red);">
            <h3><i class="fas fa-fire"></i> Intensity Level</h3>
            <p style="font-size: 1.1rem; font-weight: 700; color: var(--primary-red); margin-top: 0.5rem; text-transform: uppercase;">${recommendation.intensity}</p>
        </div>
        
        <div style="background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 107, 53, 0.2) 100%); padding: 1.5rem; border-radius: 12px; border: 2px solid var(--accent-yellow); margin-bottom: 2rem;">
            <h3 style="color: var(--accent-yellow); margin-bottom: 0.8rem; font-size: 1.2rem;">
                <i class="fas fa-lightbulb"></i> Expert Advice
            </h3>
            <p style="color: #fff; margin: 0; line-height: 1.7; font-weight: 500;">${recommendation.advice}</p>
        </div>

        <!-- AI Chat Section -->
        <div id="aiChatSection" style="background: linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(255, 107, 53, 0.1) 100%); padding: 1.5rem; border-radius: 12px; border: 2px solid var(--success-green);">
            <h3 style="color: var(--success-green); margin-bottom: 1rem; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-robot"></i> Ask Your AI Fitness Coach
            </h3>
            <div id="chatMessages" style="max-height: 300px; overflow-y: auto; margin-bottom: 1rem; padding: 1rem; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1);"></div>
            <div style="display: flex; gap: 0.5rem;">
                <input type="text" id="chatInput" placeholder="Ask about your workout plan, nutrition, form tips..." style="flex: 1; padding: 0.8rem; border: 2px solid rgba(0, 255, 136, 0.3); border-radius: 8px; background: rgba(0, 0, 0, 0.3); color: #fff; font-size: 0.95rem;" />
                <button id="sendChatBtn" style="padding: 0.8rem 1.2rem; background: linear-gradient(135deg, var(--success-green) 0%, #00cc6a 100%); border: none; border-radius: 8px; color: var(--primary-dark); font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.3rem;">
                    <i class="fas fa-paper-plane"></i> Send
                </button>
            </div>
        </div>
    `;
    
    resultContent.innerHTML = html;
    
    // Scroll to top of results to show workout plan first
    setTimeout(() => {
        resultCard.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        // Alternative: scroll to very top of page
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    }, 100);
    
    // Initialize chat functionality
    initializeChat();
}

// Gemini API Configuration (Public - Free Plan)
const GEMINI_API_KEY = 'AIzaSyAmUL-p034ss_FF0AvtsgQREyU4CC4VOZc'; // Replace with your actual API key
// Use 'gemini-1.5-flash' which is the correct model ID for the free tier
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
// Chat functionality
function initializeChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChatBtn');
    
    // Add welcome message
    addChatMessage('ai', 'Hi! I\'m your AI fitness coach. Feel free to ask me anything about your workout plan, nutrition, exercise form, or any fitness-related questions! 💪');
    
    // Send message function
    const sendMessage = async () => {
        const message = chatInput.value.trim();
        if (!message || sendBtn.disabled) return;
        
        // Add user message
        addChatMessage('user', message);
        chatInput.value = '';
        
        // Disable input while processing
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...';
        
        try {
            await callGeminiAPI(message);
        } catch (error) {
            console.error('Chat error:', error);
            addChatMessage('ai', 'Oops! Something went wrong. Please check your connection and try again! 💪');
        } finally {
            // Re-enable input
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send';
            chatInput.focus();
        }
    };
    
    // Event listeners
    sendBtn.onclick = sendMessage;
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Focus input
    chatInput.focus();
}

// Function to list available models (for debugging)
async function listAvailableModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
        const data = await response.json();
        console.log('📋 Available models:', data);
        return data;
    } catch (error) {
        console.error('❌ Error listing models:', error);
    }
}

// Call Gemini API directly from client
async function callGeminiAPI(userMessage) {
    console.log('🤖 Calling Gemini API with message:', userMessage);
    console.log('🔑 Using API key:', GEMINI_API_KEY ? 'Key present' : 'Key missing');
    
    // Prepare context with workout plan if available
    let systemPrompt = `You are a helpful fitness assistant integrated into Flexpert, an AI fitness coaching app. You provide friendly, encouraging, and knowledgeable responses about fitness, workouts, nutrition, and health.

Keep your responses:
- Concise and actionable (2-3 sentences max)
- Encouraging and motivational
- Focused on fitness and health topics
- Safe and appropriate for all fitness levels

If asked about topics outside of fitness/health, politely redirect to fitness-related topics.`;

    if (currentRecommendation) {
        systemPrompt += `\n\nThe user has just received this personalized workout plan:
Strategy: ${currentRecommendation.strategy}
Exercises: ${currentRecommendation.exercises?.join(', ')}
Schedule: ${currentRecommendation.schedule}
Equipment: ${currentRecommendation.equipment?.join(', ')}
Intensity: ${currentRecommendation.intensity}
Advice: ${currentRecommendation.advice}

You can reference this plan in your responses when relevant.`;
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
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 512,
        },
        safetySettings: [
            {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]
    };

    try {
        console.log('📡 Making API request to:', `${GEMINI_API_URL}?key=${GEMINI_API_KEY.substring(0, 10)}...`);
        
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        console.log('📥 Response status:', response.status);
        console.log('📥 Response ok:', response.ok);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API Error Response:', errorText);
            throw new Error(`API request failed: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('📦 API Response data:', data);
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            console.log('✅ AI Response:', aiResponse);
            addChatMessage('ai', aiResponse);
        } else if (data.candidates && data.candidates[0] && data.candidates[0].finishReason) {
            console.log('⚠️ Response blocked, reason:', data.candidates[0].finishReason);
            addChatMessage('ai', 'Sorry, I couldn\'t generate a response for that question. Try asking something else about fitness! 💪');
        } else {
            console.log('❌ Unexpected response structure:', data);
            addChatMessage('ai', 'Sorry, I couldn\'t generate a response right now. Please try again! 🤖');
        }
    } catch (error) {
        console.error('❌ Gemini API error:', error);
        
        if (error.message.includes('403')) {
            addChatMessage('ai', 'API key issue - please check your Gemini API key is valid and has the right permissions! 🔑');
        } else if (error.message.includes('400')) {
            addChatMessage('ai', 'Request format issue - this is a bug, please check the console! 🐛');
        } else if (error.message.includes('429')) {
            addChatMessage('ai', 'Rate limit exceeded - please wait a moment and try again! ⏰');
        } else {
            addChatMessage('ai', 'Sorry, I\'m having trouble connecting right now. Check the console for details! 🤖');
        }
    }
}

function addChatMessage(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    
    const isAI = sender === 'ai';
    const bgColor = isAI ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 51, 51, 0.1)';
    const borderColor = isAI ? 'var(--success-green)' : 'var(--primary-red)';
    const icon = isAI ? 'fas fa-robot' : 'fas fa-user';
    const align = isAI ? 'left' : 'right';
    
    messageDiv.style.cssText = `
        margin-bottom: 1rem;
        padding: 1rem;
        background: ${bgColor};
        border-radius: 12px;
        border-left: 3px solid ${borderColor};
        text-align: ${align};
        animation: slideIn 0.3s ease;
    `;
    
    messageDiv.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 0.5rem; ${align === 'right' ? 'flex-direction: row-reverse;' : ''}">
            <i class="${icon}" style="color: ${borderColor}; margin-top: 0.2rem; font-size: 0.9rem;"></i>
            <div style="color: #fff; line-height: 1.5; font-weight: 500;">${message}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Restart button handler
restartBtn.onclick = () => {
    currentQuestionIndex = 0;
    userAnswers = {};
    currentRecommendation = null; // Reset recommendation
    isAnswering = false; // Reset lock
    questionCard.style.display = 'block';
    resultCard.style.display = 'none';
    renderQuestion();
    updateProgress();
};

// Console welcome message
console.log('%c' + `
███████╗██╗     ███████╗██╗  ██╗██████╗ ███████╗██████╗ ████████╗
██╔════╝██║     ██╔════╝╚██╗██╔╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝
█████╗  ██║     █████╗   ╚███╔╝ ██████╔╝█████╗  ██████╔╝   ██║   
██╔══╝  ██║     ██╔══╝   ██╔██╗ ██╔═══╝ ██╔══╝  ██╔══██╗   ██║   
██║     ███████╗███████╗██╔╝ ██╗██║     ███████╗██║  ██║   ██║   
╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   
`, 'color: #ff3333; font-weight: bold;');

console.log('%c💪 Your AI Fitness Coach', 'color: #ff6b35; font-size: 16px; font-weight: bold;');
console.log('%c🔥 Ready to transform your fitness journey!', 'color: #00ff88; font-size: 14px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #666;');

// Start the application
init();


