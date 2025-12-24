# 🤖 AI Chat Integration Guide

## Current Implementation

The AI Chat feature is now integrated with **Google Gemini 1.5 Flash** model. Users can securely enter their API key through the interface.

## Integration Options

### Option 1: OpenAI GPT API
```javascript
async function getAIResponse(userMessage) {
    const context = `...`; // User context (already implemented)
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${YOUR_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful fitness coach. Provide encouraging, accurate fitness advice.'
                },
                {
                    role: 'user',
                    content: context
                }
            ],
            max_tokens: 200,
            temperature: 0.7
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
}
```

### Option 2: Anthropic Claude API
```javascript
async function getAIResponse(userMessage) {
    const context = `...`; // User context (already implemented)
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': YOUR_CLAUDE_API_KEY,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 200,
            messages: [
                {
                    role: 'user',
                    content: context
                }
            ]
        })
    });
    
    const data = await response.json();
    return data.content[0].text;
}
```

### Option 3: Local LLM (Ollama)
```javascript
async function getAIResponse(userMessage) {
    const context = `...`; // User context (already implemented)
    
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama2',
            prompt: context,
            stream: false
        })
    });
    
    const data = await response.json();
    return data.response;
}
```

## Security Considerations

### Client-Side API Keys (Not Recommended)
- Never expose API keys in client-side code
- Keys can be extracted from browser dev tools

### Recommended: Backend Proxy
Create a backend endpoint that handles LLM calls:

```javascript
// Frontend (app.js)
async function getAIResponse(userMessage) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: userMessage,
            userProfile: userAnswers,
            recommendation: currentRecommendation
        })
    });
    
    const data = await response.json();
    return data.response;
}
```

```javascript
// Backend (Node.js/Express example)
app.post('/api/chat', async (req, res) => {
    const { message, userProfile, recommendation } = req.body;
    
    // Build context
    const context = buildContext(message, userProfile, recommendation);
    
    // Call LLM API with server-side API key
    const aiResponse = await callLLMAPI(context);
    
    res.json({ response: aiResponse });
});
```

## Current Mock Responses

The system currently provides intelligent mock responses for:
- ✅ Form and technique questions
- ✅ Workout modifications
- ✅ Nutrition advice
- ✅ Progress tracking
- ✅ Motivation and encouragement
- ✅ General fitness questions

## Features Implemented

### Chat Interface
- ✅ Toggle chat section
- ✅ Message history
- ✅ User/AI message styling
- ✅ Timestamps
- ✅ Loading states
- ✅ Auto-scroll
- ✅ Enter key support

### Context Awareness
- ✅ User's complete workout plan
- ✅ User profile (goals, limitations, preferences)
- ✅ Exercise list and equipment
- ✅ Personalized advice

### User Experience
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Error handling
- ✅ Chat history persistence (during session)
- ✅ Clean restart functionality

## Cost Estimation

### OpenAI GPT-3.5-turbo
- ~$0.002 per 1K tokens
- Average chat: ~300 tokens
- Cost per chat: ~$0.0006
- 1000 chats: ~$0.60

### Anthropic Claude Haiku
- ~$0.00025 per 1K tokens (input)
- ~$0.00125 per 1K tokens (output)
- Average cost per chat: ~$0.0004
- 1000 chats: ~$0.40

## Next Steps

1. **Choose LLM Provider** (OpenAI, Anthropic, or Local)
2. **Set up Backend Proxy** (recommended for security)
3. **Replace mockAIResponse** with real API call
4. **Add API key management**
5. **Test and refine prompts**
6. **Monitor usage and costs**

The current implementation provides a complete chat interface that's ready for LLM integration! 🚀