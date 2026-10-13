# FLEXPERT - Your AI Fitness Coach

A powerful rule-based expert system with a gym-themed interface that provides personalized workout recommendations based on user inputs.

## How to Use

1. Open `index.html` in any web browser
2. Answer 7 sequential questions about your fitness profile:
   - Workout Goal (Fat Loss, Muscle Gain, Strength, General Health)
   - Body Type (Slim, Average, Broad, Heavier)
   - Training Frequency (2-3, 3-4, or 5-6 days per week)
   - Physical Limitations (None, Upper/Lower Body Injury, Cardiovascular Issues)
   - Workout Environment (Home or Gym)
   - Preferred Intensity Level (Light, Moderate, High)
   - Duration per Session (10-15, 20-30, or 30-40 minutes)
3. Click "Get My Plan" to receive your personalized workout recommendation


## Output Components

Each recommendation includes:
1. **Strategy**: Overall approach to achieve your goals
2. **Exercises**: Specific exercises tailored to your profile
3. **Schedule**: Recommended training frequency
4. **Equipment**: Required equipment list
5. **Intensity Level**: Target intensity with safety overrides when needed
6. **Expert Advice**: Professional tips and safety considerations

## Files

- `index.html` - Main application structure with Font Awesome and Google Fonts integration
- `styles.css` - Gym-themed responsive styling with animations
- `knowledge-base.js` - Questions and inference rules
- `app.js` - Application logic and inference engine