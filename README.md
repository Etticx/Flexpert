# 💪 FLEXPERT - Your AI Fitness Coach

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

## Features

- **🎯 Sequential Question Flow**: One question at a time to prevent cognitive overload
- **⚡ Auto-Advance**: Automatically moves to next question after selection
- **↩️ Back Navigation**: Go back to change previous answers
- **📊 Progress Tracking**: Visual progress bar showing current question
- **🧠 Smart Matching**: Forward chaining inference engine finds best workout plan
- **📋 Comprehensive Output**: Includes strategy, exercises, schedule, equipment, intensity, and expert advice
- **📱 Fully Responsive**: Works on mobile and desktop
- **🎨 Gym-Themed Design**: Dark, energetic interface with modern animations
- **🔥 Icon Integration**: Font Awesome icons throughout for visual appeal

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

## Libraries Used

- **Font Awesome 6.5.1** - Icon library for visual elements
- **Google Fonts** - Bebas Neue (logo) and Montserrat (body text)
- **Animate.css 4.1.1** - CSS animation library

## Customization

To add more rules or modify recommendations, edit the `rules` array in `knowledge-base.js`. Each rule contains:
- `conditions`: Input criteria to match
- `recommendation`: Output with strategy, exercises, schedule, equipment, advice, and intensity
