// Knowledge Base - Questions and Rules
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

    // PRIORITY 1: SAFETY & LIMITATION RULES (Override everything)
    safetyRules: [
        // R1: Upper Body Injury
        {
            conditions: { limitations: "upper_injury" },
            overrides: {
                exercises: ["Squats", "Lunges", "Leg Press", "High Knees", "Step-ups", "Sit-ups"],
                strategy: "Leg hypertrophy program",
                intensity: "Moderate"
            }
        },
        // R2: Lower Body Injury
        {
            conditions: { limitations: "lower_injury" },
            overrides: {
                exercises: ["Bench press", "Seated dumbbell press", "Chest fly", "Lat pulldown (Seated)", "Floor press", "Bicep curls"],
                strategy: "Home-based arm hypertrophy",
                intensity: "Moderate"
            }
        },
        // R3: Cardiovascular Issues
        {
            conditions: { limitations: "cardio_issues" },
            overrides: {
                exercises: ["Slow lunges", "Wall push-ups", "Band chest fly", "Chair squats", "Walking", "Breathing drills"],
                strategy: "Very low impact strengthening",
                intensity: "Light"
            }
        },
        // R4: Healthy
        {
            conditions: { limitations: "none" },
            overrides: {
                exercises: ["Burpees", "Deadlift", "Squats", "Bench press"],
                intensity: "High"
            }
        }
    ],

    // PRIORITY 2: STRATEGY RULES (Goal + Body Type)
    strategyRules: [
        // R5: Fat Loss + Slim/Average
        {
            conditions: { goal: "fat_loss", body_type: ["slim", "average"] },
            strategy: "High-rep cardio + short fat-burning circuits"
        },
        // R6: Fat Loss + Broad/Heavier
        {
            conditions: { goal: "fat_loss", body_type: ["broad", "heavier"] },
            strategy: "Strength + HIIT hybrid for fat loss and tone"
        },
        // R7: Muscle Gain + Slim
        {
            conditions: { goal: "muscle_gain", body_type: "slim" },
            strategy: "Progressive overload chest-focused strength plan"
        },
        // R8: Muscle Gain + Broad/Heavier
        {
            conditions: { goal: "muscle_gain", body_type: ["broad", "heavier"] },
            strategy: "Leg hypertrophy program"
        },
        // R9: Strength
        {
            conditions: { goal: "strength" },
            strategy: "Chest-focused strength + conditioning"
        },
        // R10: General Health + Healthy
        {
            conditions: { goal: "general_health", limitations: "none" },
            strategy: "Balanced wellness with easy chest activation"
        },
        // R11: General Health + Cardio Issues
        {
            conditions: { goal: "general_health", limitations: "cardio_issues" },
            strategy: "Very low impact strengthening"
        }
    ],

    // PRIORITY 3: ENVIRONMENT & EQUIPMENT RULES
    equipmentRules: [
        // R12: Home
        {
            conditions: { environment: "home" },
            equipment: ["Mat", "Dumbbells", "Resistance bands", "Chair"]
        },
        // R13: Gym
        {
            conditions: { environment: "gym" },
            equipment: ["Barbell", "Cables", "Leg press machine", "Chest machine", "Free weights"]
        }
    ],

    // PRIORITY 4: SCHEDULE & DURATION RULES
    scheduleRules: [
        // R14-R16: Training Frequency
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
        // R17-R19: Duration
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
        // R20: High + Healthy
        {
            conditions: { intensity: "high", limitations: "none" },
            finalIntensity: "High"
        },
        // R21: High + Cardio Issues
        {
            conditions: { intensity: "high", limitations: "cardio_issues" },
            finalIntensity: "Light"
        },
        // R22: Moderate
        {
            conditions: { intensity: "moderate" },
            finalIntensity: "Moderate"
        },
        // R23: Light
        {
            conditions: { intensity: "light" },
            finalIntensity: "Light"
        }
    ],

    // SPECIAL CASE RULES (Extra Priority - Override specific combinations)
    specialRules: [
        // R24: Fragile High-Performer
        {
            conditions: { intensity: "high", limitations: "cardio_issues" },
            recommendation: {
                strategy: "Interval Training with Extended Recovery",
                exercises: ["Walking (Incline)", "Slow Burpees (No jump)", "Wall Push-ups"],
                intensity: "Moderate (Override for Safety)",
                advice: "Monitor Heart Rate: Do not exceed 75% Max HR."
            }
        },
        // R25: Homebound Hardgainer
        {
            conditions: { goal: "muscle_gain", environment: "home" },
            recommendation: {
                strategy: "High-Volume Calisthenics (Hypertrophy)",
                exercises: ["Push-ups (Decline/Incline)", "Doorframe Rows", "Single-leg Squats", "Chair Dips"],
                equipment: ["Resistance bands", "Chair", "Weighted Backpack (Optional)"],
                advice: "Since heavy weights are unavailable, use explosive speed to build strength. Volume Training."
            }
        },
        // R26: Sedentary Fat Loss
        {
            conditions: { goal: "fat_loss", body_type: "heavier", days: "2-3" },
            recommendation: {
                strategy: "Low-Impact Metabolic Strength",
                exercises: ["Box Squats (to Chair)", "Wall Push-ups", "Step-ups", "Band Pull-aparts"],
                intensity: "Moderate",
                advice: "Focus on diet on non-training days to supplement low frequency."
            }
        },
        // R27: Injured Athlete
        {
            conditions: { goal: "strength", limitations: "upper_injury" },
            recommendation: {
                strategy: "Lower Body Power Focus",
                exercises: ["Leg Press (Heavy)", "Hack Squat", "Lunge Variations", "Core Bracing"],
                intensity: "Moderate",
                advice: "Maintain leg strength while rehabbing upper body."
            }
        },
        // R28: Busy Executive
        {
            conditions: { goal: "general_health", duration: "10-15", intensity: "high" },
            recommendation: {
                strategy: "EMOM (Every Minute on the Minute) Micro-Workouts",
                exercises: ["Burpees", "Jump Squats", "Plank to Push-up"],
                advice: "Zero rest periods are required to make this duration effective."
            }
        },
        // R29: Leg-Injured Fat Burner
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
