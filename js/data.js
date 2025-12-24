/**
 * Flexpert Knowledge Base
 * Contains all questions, options, and inference rules.
 */
const knowledgeBase = {
    questions: [
        {
            id: 1,
            text: "What is your primary workout goal?",
            type: "choice",
            options: [
                { label: "Fat Loss", value: "fat_loss" },
                { label: "Muscle Gain", value: "muscle_gain" },
                { label: "Strength", value: "strength" },
                { label: "General Health", value: "general_health" }
            ]
        },
        {
            id: 2,
            text: "What is your body type?",
            type: "choice",
            options: [
                { label: "Slim", value: "slim" },
                { label: "Average", value: "average" },
                { label: "Broad", value: "broad" },
                { label: "Heavier", value: "heavier" }
            ]
        },
        {
            id: 3,
            text: "How many days per week can you train?",
            type: "choice",
            options: [
                { label: "2-3 Days Per Week", value: "2-3" },
                { label: "3-4 Days Per Week", value: "3-4" },
                { label: "5-6 Days Per Week", value: "5-6" }
            ]
        },
        {
            id: 4,
            text: "Do you have any physical limitations?",
            type: "choice",
            options: [
                { label: "None (Healthy!)", value: "none" },
                { label: "Upper Body Injury (Shoulder/Wrist Issues)", value: "upper_injury" },
                { label: "Lower Body Injury (Knee/Ankle Issues)", value: "lower_injury" },
                { label: "Cardiovascular Issues (Asthma/Heart Issues)", value: "cardio_issues" }
            ]
        },
        {
            id: 5,
            text: "What is your workout environment?",
            type: "choice",
            options: [
                { label: "Home", value: "home" },
                { label: "Gym", value: "gym" }
            ]
        },
        {
            id: 6,
            text: "What is your preferred intensity level?",
            type: "choice",
            options: [
                { label: "Light", value: "light" },
                { label: "Moderate", value: "moderate" },
                { label: "High", value: "high" }
            ]
        },
        {
            id: 7,
            text: "How much time per session?",
            type: "choice",
            options: [
                { label: "10-15 minutes", value: "10-15" },
                { label: "20-30 minutes", value: "20-30" },
                { label: "30-40 minutes", value: "30-40" }
            ]
        }
    ],

    // EXERCISE DB: Equipment Requirements
    exerciseDatabase: {
        // Equipment: "None" (Bodyweight), "Dumbbells", "Barbell", "Machine", "Cables", "Bands"
        "Squats": { equipment: ["None"] },
        "Lunges": { equipment: ["None"] },
        "Leg Press": { equipment: ["Machine"] },
        "High Knees": { equipment: ["None"] },
        "Step-ups": { equipment: ["Chair", "None"] }, // Flexible
        "Sit-ups": { equipment: ["None"] },

        "Bench press": { equipment: ["Barbell", "Bench"] },
        "Seated dumbbell press": { equipment: ["Dumbbells", "Chair"] },
        "Chest fly": { equipment: ["Dumbbells", "Machine"] }, // Flexible
        "Lat pulldown (Seated)": { equipment: ["Machine", "Cables"] },
        "Floor press": { equipment: ["Dumbbells"] },
        "Bicep curls": { equipment: ["Dumbbells", "Barbell", "Bands"] },

        "Slow lunges": { equipment: ["None"] },
        "Wall push-ups": { equipment: ["None"] },
        "Band chest fly": { equipment: ["Bands"] },
        "Chair squats": { equipment: ["Chair"] },
        "Walking": { equipment: ["None"] },
        "Breathing drills": { equipment: ["None"] },

        "Burpees": { equipment: ["None"] },
        "Deadlift": { equipment: ["Barbell", "Dumbbells"] },

        // Strategy Rules extras
        "Box Squats (to Chair)": { equipment: ["Chair"] },
        "Band Pull-aparts": { equipment: ["Bands"] },
        "Battle Ropes (Seated)": { equipment: ["Ropes"] }, // Special
        "Speed Bag (Boxing)": { equipment: ["Machine"] }, // Special

        "Push-ups": { equipment: ["None"] },
        "Planks": { equipment: ["None"] },

        // Fallbacks
        "Push-ups (Knees)": { equipment: ["None"] },
        "Glute Bridges": { equipment: ["None"] },
        "Supermans": { equipment: ["None"] }
    },

    // PRIORITY 1: SAFETY & LIMITATION RULES (Override everything)
    safetyRules: [
        {
            conditions: { limitations: "upper_injury" },
            overrides: {
                exercises: ["Squats", "Lunges", "Leg Press", "High Knees", "Step-ups", "Sit-ups"],
                strategy: "Lower Body Maintenance (Upper Injury Safe)",
                intensity: "Moderate"
            }
        },
        {
            conditions: { limitations: "lower_injury" },
            overrides: {
                exercises: ["Bench press", "Seated dumbbell press", "Chest fly", "Lat pulldown (Seated)", "Floor press", "Bicep curls"],
                strategy: "Upper Body Maintenance (Lower Injury Safe)",
                intensity: "Moderate"
            }
        },
        {
            conditions: { limitations: "cardio_issues" },
            overrides: {
                exercises: ["Slow lunges", "Wall push-ups", "Band chest fly", "Chair squats", "Walking", "Breathing drills"],
                strategy: "Very Low Impact Strengthening",
                intensity: "Light"
            }
        },
        {
            conditions: { limitations: "none" },
            overrides: {
                exercises: ["Burpees", "Deadlift", "Squats", "Bench press"],
                intensity: "High"
            }
        }
    ],

    // ... (Remainder kept same, just ensuring db is there)

    // PRIORITY 2: STRATEGY RULES (Goal + Body Type)
    strategyRules: [
        {
            conditions: { goal: "fat_loss", body_type: ["slim", "average"] },
            strategy: "High-rep cardio + short fat-burning circuits"
        },
        {
            conditions: { goal: "fat_loss", body_type: ["broad", "heavier"] },
            strategy: "Strength + HIIT hybrid for fat loss and tone"
        },
        {
            conditions: { goal: "muscle_gain", body_type: "slim" },
            strategy: "Progressive overload chest-focused strength plan"
        },
        {
            conditions: { goal: "muscle_gain", body_type: ["broad", "heavier"] },
            strategy: "Leg Focused Hypertrophy"
        },
        {
            conditions: { goal: "strength" },
            strategy: "Chest-focused strength + conditioning"
        },
        {
            conditions: { goal: "general_health", limitations: "none" },
            strategy: "Balanced wellness with easy chest activation"
        },
        {
            conditions: { goal: "general_health", limitations: "cardio_issues" },
            strategy: "Very low impact strengthening"
        }
    ],

    // PRIORITY 3: ENVIRONMENT & EQUIPMENT RULES
    equipmentRules: [
        {
            conditions: { environment: "home" },
            equipment: ["Mat", "Dumbbells", "Resistance bands", "Chair"]
        },
        {
            conditions: { environment: "gym" },
            equipment: ["Barbell", "Cables", "Leg press machine", "Chest machine", "Free weights", "Dumbbells", "Bench", "Machine"]
        }
    ],

    // (Rest of file unchanged until end)

    // PRIORITY 4: SCHEDULE & DURATION RULES
    scheduleRules: [
        {
            conditions: { days: "2-3" },
            schedule: "2–3 days per week (Full Body Workout)"
        },
        {
            conditions: { days: "3-4" },
            schedule: "3–4 days per week (Upper/Lower Split)"
        },
        {
            conditions: { days: "5-6" },
            schedule: "5–6 days per week, chest 2x weekly"
        },
        {
            conditions: { duration: "10-15" },
            sessionStyle: "Super-sets (No rest between exercises)"
        },
        {
            conditions: { duration: "20-30" },
            sessionStyle: "Circuit Training"
        },
        {
            conditions: { duration: "30-40" },
            sessionStyle: "Standard Sets (Rest between sets)"
        }
    ],

    // PRIORITY 5: INTENSITY ADJUSTMENT RULES
    intensityRules: [
        {
            conditions: { intensity: "high", limitations: "none" },
            finalIntensity: "High"
        },
        {
            conditions: { intensity: "high", limitations: "cardio_issues" },
            finalIntensity: "Light"
        },
        {
            conditions: { intensity: "moderate" },
            finalIntensity: "Moderate"
        },
        {
            conditions: { intensity: "light" },
            finalIntensity: "Light"
        }
    ],

    // SPECIAL CASE RULES (Extra Priority - Override specific combinations)
    specialRules: [
        {
            conditions: { intensity: "high", limitations: "cardio_issues" },
            recommendation: {
                strategy: "Interval Training with Extended Recovery",
                exercises: ["Walking (Incline)", "Slow Burpees (No jump)", "Wall Push-ups"],
                intensity: "Moderate (Override for Safety)",
                advice: "Monitor Heart Rate: Do not exceed 75% Max HR."
            }
        },
        {
            conditions: { goal: "muscle_gain", environment: "home", limitations: "none" },
            recommendation: {
                strategy: "High-Volume Calisthenics (Hypertrophy)",
                exercises: ["Push-ups (Decline/Incline)", "Doorframe Rows", "Single-leg Squats", "Chair Dips"],
                equipment: ["Resistance bands", "Chair", "Weighted Backpack (Optional)"],
                advice: "Since heavy weights are unavailable, use explosive speed to build strength. Volume Training."
            }
        },
        {
            conditions: { goal: "fat_loss", body_type: "heavier", days: "2-3" },
            recommendation: {
                strategy: "Low-Impact Metabolic Strength",
                exercises: ["Box Squats (to Chair)", "Wall Push-ups", "Step-ups", "Band Pull-aparts"],
                intensity: "Moderate",
                advice: "Focus on diet on non-training days to supplement low frequency."
            }
        },
        {
            conditions: { goal: "strength", limitations: "upper_injury" },
            recommendation: {
                strategy: "Lower Body Power Focus",
                exercises: ["Leg Press (Heavy)", "Hack Squat", "Lunge Variations", "Core Bracing"],
                intensity: "Moderate",
                advice: "Maintain leg strength while rehabbing upper body."
            }
        },
        {
            conditions: { goal: "general_health", duration: "10-15", intensity: "high" },
            recommendation: {
                strategy: "EMOM (Every Minute on the Minute) Micro-Workouts",
                exercises: ["Burpees", "Jump Squats", "Plank to Push-up"],
                advice: "Zero rest periods are required to make this duration effective."
            }
        },
        {
            conditions: { goal: "fat_loss", limitations: "lower_injury" },
            recommendation: {
                strategy: "Seated/Upper Body Metabolic Conditioning",
                exercises: ["Battle Ropes (Seated)", "Speed Bag (Boxing)", "Seated Dumbbell Press (High Reps)", "Floor Press"],
                intensity: "Moderate",
                advice: "Focus on upper body cardio to burn calories. Perform exercises seated to protect joints."
            }
        }
    ],

    // Default fallback
    defaultRecommendation: {
        strategy: "Balanced Fitness Plan",
        exercises: ["Squats", "Push-ups", "Planks", "Lunges", "Bicep curls"],
        schedule: "3–4 days per week",
        equipment: ["Mat", "Dumbbells"],
        advice: "Focus on progressive overload and proper form. Maintain proper nutrition aligned with your goals.",
        intensity: "Moderate"
    }
};

// Make available globally
window.knowledgeBase = knowledgeBase;
