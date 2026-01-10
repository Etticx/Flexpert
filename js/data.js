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
        "Step-ups": { equipment: ["Chair", "Bench"] }, // Flexible
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
        "Box Squats (to Chair)": { equipment: ["Chair", "Bench"] },
        "Band Pull-aparts": { equipment: ["Bands"] },
        "Battle Ropes (Seated)": { equipment: ["Ropes", "Cables"] }, // Special
        "Speed Bag (Boxing)": { equipment: ["Machine"] }, // Special

        "Push-ups": { equipment: ["None"] },
        "Planks": { equipment: ["None"] },

        // Fallbacks
        "Push-ups (Knees)": { equipment: ["None"] },
        "Glute Bridges": { equipment: ["None"] },
        "Supermans": { equipment: ["None"] }
    },

    // PRIORITY 1: SAFETY & LIMITATION RULES (Goal-aware safety)
    safetyRules: [
        {
            conditions: { limitations: "upper_injury", goal: "fat_loss" },
            overrides: {
                exercises: ["Squats", "Lunges", "High Knees", "Step-ups", "Glute Bridges", "Walking"],
                strategy: "Lower Body Fat Burning (Upper Injury Safe)",
                explanation: "Since you have an upper body injury, we prioritized high-intensity leg movements to burn fat without stressing your shoulders."
            }
        },
        {
            conditions: { limitations: "upper_injury", goal: "muscle_gain" },
            overrides: {
                exercises: ["Squats", "Lunges", "Leg Press", "Deadlift", "Glute Bridges", "Step-ups"],
                strategy: "Lower Body Hypertrophy (Upper Injury Safe)",
                explanation: "With your upper body injury, we're focusing on building muscle through heavy leg work. This allows you to gain strength and size while your shoulders/arms heal."
            }
        },
        {
            conditions: { limitations: "upper_injury", goal: "strength" },
            overrides: {
                exercises: ["Squats", "Deadlift", "Leg Press", "Lunges", "Glute Bridges", "Step-ups"],
                strategy: "Lower Body Strength Focus (Upper Injury Safe)",
                explanation: "Your upper body needs rest, but we can still build serious strength through heavy squats and deadlifts. Your legs are your body's powerhouse!"
            }
        },
        {
            conditions: { limitations: "upper_injury", goal: "general_health" },
            overrides: {
                exercises: ["Squats", "Lunges", "Step-ups", "Walking", "Glute Bridges", "Sit-ups"],
                strategy: "Lower Body Maintenance (Upper Injury Safe)",
                explanation: "We're keeping you active and healthy while protecting your injured upper body. These gentle lower body movements maintain fitness without aggravating your injury."
            }
        },
        {
            conditions: { limitations: "lower_injury", goal: "fat_loss" },
            overrides: {
                exercises: ["Seated dumbbell press", "Chest fly", "Bicep curls", "Floor press", "Band chest fly", "Wall push-ups"],
                strategy: "Upper Body Metabolic Training (Lower Injury Safe)",
                explanation: "Since your legs need rest, we're using high-rep upper body circuits to burn calories. This keeps your heart rate up for fat loss while protecting your injured lower body."
            }
        },
        {
            conditions: { limitations: "lower_injury", goal: "muscle_gain" },
            overrides: {
                exercises: ["Bench press", "Seated dumbbell press", "Chest fly", "Bicep curls", "Floor press", "Push-ups"],
                strategy: "Upper Body Hypertrophy (Lower Injury Safe)",
                explanation: "Perfect time to build that upper body! While your legs recover, we're focusing on chest, shoulders, and arms to pack on muscle where you can train safely."
            }
        },
        {
            conditions: { limitations: "lower_injury", goal: "strength" },
            overrides: {
                exercises: ["Bench press", "Seated dumbbell press", "Floor press", "Bicep curls", "Push-ups", "Planks"],
                strategy: "Upper Body Strength Focus (Lower Injury Safe)",
                explanation: "Your lower body injury doesn't stop upper body gains! We're maximizing bench press and pressing movements to build serious upper body strength while you heal."
            }
        },
        {
            conditions: { limitations: "lower_injury", goal: "general_health" },
            overrides: {
                exercises: ["Seated dumbbell press", "Chest fly", "Bicep curls", "Wall push-ups", "Band chest fly", "Planks"],
                strategy: "Upper Body Maintenance (Lower Injury Safe)",
                explanation: "Staying active during injury recovery is crucial. These gentle upper body exercises maintain your fitness and mood while giving your legs the rest they need."
            }
        },
        {
            conditions: { limitations: "cardio_issues" },
            overrides: {
                exercises: ["Slow lunges", "Wall push-ups", "Band chest fly", "Chair squats", "Walking", "Breathing drills"],
                strategy: "Very Low Impact Strengthening",
                explanation: "Your heart health is our priority. These gentle, controlled movements strengthen your body without putting stress on your cardiovascular system. We're building fitness safely."
            }
        },
        {
            conditions: { limitations: "none" },
            overrides: {
                explanation: "No limitations detected - you're cleared for high-intensity training! We can push your limits and maximize your results with challenging workouts."
            }
        }
    ],

    // ... (Remainder kept same, just ensuring db is there)

    // PRIORITY 2: STRATEGY RULES (Goal + Body Type)
    strategyRules: [
        {
            conditions: { goal: "fat_loss", body_type: ["slim", "average"] },
            strategy: "High-rep cardio + short fat-burning circuits",
            exercises: ["Burpees", "High Knees", "Squats", "Push-ups", "Lunges", "Planks", "Step-ups"],
            explanation: "For your body type and fat loss goal, we're using high-intensity circuits to maximize calorie burn and boost your metabolism."
        },
        {
            conditions: { goal: "fat_loss", body_type: ["broad", "heavier"] },
            strategy: "Strength + HIIT hybrid for fat loss and tone",
            exercises: ["Deadlift", "Squats", "Bench press", "Burpees", "Lunges", "Push-ups", "Bicep curls"],
            explanation: "Your build is perfect for combining strength training with cardio - this burns fat while maintaining muscle mass for a toned, powerful physique."
        },
        {
            conditions: { goal: "muscle_gain", body_type: "slim" },
            strategy: "Progressive overload chest-focused strength plan",
            exercises: ["Bench press", "Push-ups", "Chest fly", "Seated dumbbell press", "Bicep curls", "Floor press", "Planks"],
            explanation: "As a slim build, we're focusing on upper body development with progressive overload to help you build visible muscle mass and strength."
        },
        {
            conditions: { goal: "muscle_gain", body_type: ["broad", "heavier"], environment: "home" },
            strategy: "Heavy Dumbbell Control",
            exercises: ["Floor press", "Chair squats", "Seated dumbbell press", "Slow lunges", "Planks"],
            explanation: "Adapting heavy lifting for home: We use slower tempos with dumbbells to simulate heavy loads without a barbell."
        },
        {
            conditions: { goal: "muscle_gain", body_type: ["broad", "heavier"] },
            strategy: "Leg Focused Hypertrophy",
            exercises: ["Squats", "Deadlift", "Lunges", "Leg Press", "Step-ups", "Glute Bridges", "Bicep curls"],
            explanation: "Your broad build gives you natural strength advantages - we're maximizing this with heavy leg work to build serious muscle mass and power."
        },
        {
            conditions: { goal: "strength" },
            strategy: "Chest-focused strength + conditioning",
            exercises: ["Bench press", "Deadlift", "Squats", "Seated dumbbell press", "Bicep curls", "Push-ups", "Planks"],
            explanation: "Building functional strength with compound movements - this program develops real-world power and athletic performance."
        },
        {
            conditions: { goal: "general_health", limitations: "none" },
            strategy: "Balanced wellness with easy chest activation",
            exercises: ["Squats", "Push-ups", "Planks", "Lunges", "Bicep curls", "Glute Bridges", "Step-ups"],
            explanation: "A well-rounded approach to fitness that builds strength, endurance, and mobility for overall health and longevity."
        },
        {
            conditions: { goal: "general_health", limitations: "cardio_issues" },
            strategy: "Very low impact strengthening",
            exercises: ["Slow lunges", "Wall push-ups", "Chair squats", "Walking", "Breathing drills", "Band chest fly"]
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
            equipment: ["Barbell", "Cables", "Ropes","Leg press machine", "Chest machine", "Free weights", "Dumbbells", "Bench", "Machine"]
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
        // High intensity with no limitations
        {
            conditions: { intensity: "high", limitations: "none" },
            finalIntensity: "High"
        },
        // High intensity with injuries - need to reduce for safety
        {
            conditions: { intensity: "high", limitations: "upper_injury" },
            finalIntensity: "Moderate"
        },
        {
            conditions: { intensity: "high", limitations: "lower_injury" },
            finalIntensity: "Moderate"
        },
        {
            conditions: { intensity: "high", limitations: "cardio_issues" },
            finalIntensity: "Light"
        },
        // Moderate intensity with limitations
        {
            conditions: { intensity: "moderate", limitations: "none" },
            finalIntensity: "Moderate"
        },
        {
            conditions: { intensity: "moderate", limitations: "upper_injury" },
            finalIntensity: "Moderate"
        },
        {
            conditions: { intensity: "moderate", limitations: "lower_injury" },
            finalIntensity: "Moderate"
        },
        {
            conditions: { intensity: "moderate", limitations: "cardio_issues" },
            finalIntensity: "Light"
        },
        // Light intensity - generally safe for all limitations
        {
            conditions: { intensity: "light", limitations: "none" },
            finalIntensity: "Light"
        },
        {
            conditions: { intensity: "light", limitations: "upper_injury" },
            finalIntensity: "Light"
        },
        {
            conditions: { intensity: "light", limitations: "lower_injury" },
            finalIntensity: "Light"
        },
        {
            conditions: { intensity: "light", limitations: "cardio_issues" },
            finalIntensity: "Light"
        }
    ],

    // SPECIAL CASE RULES (Extra Priority - Override specific combinations)
    specialRules: [
        {
            conditions: { goal: "muscle_gain", environment: "home", limitations: "none", body_type: ["slim", "average"] },
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
