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
        "Leg Press": { equipment: ["Machine", "Leg press machine"] },
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

        // New exercises for expanded rules
        "Overhead Press": { equipment: ["Barbell", "Dumbbells"] },
        "Dumbbell Thrusters": { equipment: ["Dumbbells"] },
        "Renegade Rows": { equipment: ["Dumbbells"] },
        "Mountain Climbers": { equipment: ["None"] },
        "Pistol Squats (or progression)": { equipment: ["None"] },
        "One-arm Push-ups": { equipment: ["None"] },
        
        // Additional exercises for 80+ rules
        "Jump Squats": { equipment: ["None"] },
        "Clapping Push-ups": { equipment: ["None"] },
        "Farmer Carries": { equipment: ["Dumbbells", "Barbell"] },
        "Face Pulls": { equipment: ["Cables", "Bands"] },
        "Barbell Rows": { equipment: ["Barbell"] },
        "Rack Pulls": { equipment: ["Barbell"] },
        "Box Jumps": { equipment: ["Chair", "Bench"] },
        "Sprints": { equipment: ["None"] },
        "Sled Push": { equipment: ["Machine"] },
        "Hack Squat": { equipment: ["Machine"] },
        "Lunge Variations": { equipment: ["None", "Dumbbells"] },
        "Core Bracing": { equipment: ["None"] },
        "Doorframe Rows": { equipment: ["None"] },
        "Single-leg Squats": { equipment: ["None"] },
        "Chair Dips": { equipment: ["Chair"] },

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



    // PRIORITY 2: STRATEGY RULES (Goal + Body Type) - EXPANDED TO 18 RULES
    strategyRules: [
        // FAT LOSS - Body Type Specific (5 rules)
        {
            conditions: { goal: "fat_loss", body_type: "slim" },
            strategy: "High-Protein Recomposition",
            exercises: ["Squats", "Push-ups", "Lunges", "Planks", "Deadlift"],
            explanation: "Since you're slim but want fat loss (skinny-fat), we need to build muscle to boost metabolism while burning fat."
        },
        {
            conditions: { goal: "fat_loss", body_type: "average", environment: "gym" },
            strategy: "Heavy Compound Recomposition",
            exercises: ["Deadlift", "Bench press", "Squats", "Lat pulldown (Seated)", "Overhead Press", "Planks"],
            explanation: "Based on your body type, pure cardio might make you lose muscle tone. We are using 'Body Recomposition'—heavy compound lifting to boost your metabolism and define your shape while burning fat."
        },
        {
            conditions: { goal: "fat_loss", body_type: "average" },
            strategy: "High-Intensity Circuit Training",
            exercises: ["Burpees", "High Knees", "Squats", "Push-ups", "Mountain Climbers"],
            explanation: "Your average build responds well to high-intensity circuits for maximum calorie burn and metabolic boost."
        },
        {
            conditions: { goal: "fat_loss", body_type: "broad" },
            strategy: "Power-Endurance Hybrid",
            exercises: ["Deadlift", "Box Jumps", "Bench press", "Burpees", "Sprints"],
            explanation: "Leveraging your natural broad structure to move heavy weights fast for maximum calorie expenditure."
        },
        {
            conditions: { goal: "fat_loss", body_type: "heavier" },
            strategy: "Low-Impact Metabolic Strength",
            exercises: ["Box Squats (to Chair)", "Step-ups", "Wall push-ups", "Battle Ropes (Seated)"],
            explanation: "Focusing on joint-friendly metabolic movements to burn fat without overloading knees and joints."
        },
        
        // MUSCLE GAIN - Body Type Specific (5 rules)
        {
            conditions: { goal: "muscle_gain", body_type: "slim" },
            strategy: "High Volume Hypertrophy",
            exercises: ["Bench press", "Squats", "Overhead Press", "Bicep curls", "Lunges"],
            explanation: "As a slim gainer, volume is key. We need lots of sets and progressive overload to stimulate growth."
        },
        {
            conditions: { goal: "muscle_gain", body_type: "average" },
            strategy: "Classic Bodybuilding Split",
            exercises: ["Bench press", "Chest fly", "Squats", "Leg Press", "Lat pulldown (Seated)"],
            explanation: "Your balanced frame responds well to a standard bodybuilding split for symmetrical muscle development."
        },
        {
            conditions: { goal: "muscle_gain", body_type: ["broad", "heavier"], environment: "home" },
            strategy: "Heavy Dumbbell Control",
            exercises: ["Floor press", "Chair squats", "Seated dumbbell press", "Slow lunges", "Planks"],
            explanation: "Adapting heavy lifting for home: We use slower tempos with dumbbells to simulate heavy loads without a barbell."
        },
        {
            conditions: { goal: "muscle_gain", body_type: "broad" },
            strategy: "Heavy Compound Powerbuilding",
            exercises: ["Deadlift", "Squats", "Bench press", "Overhead Press", "Barbell Rows"],
            explanation: "Your broad structure supports heavy loads. Heavy compounds will pack on dense muscle mass."
        },
        {
            conditions: { goal: "muscle_gain", body_type: "heavier" },
            strategy: "Body Recomposition Hypertrophy",
            exercises: ["Leg Press", "Seated dumbbell press", "Lat pulldown (Seated)", "Walking"],
            explanation: "Building muscle while utilizing stored energy. Focus on controlled reps and progressive overload."
        },
        
        // STRENGTH - Body Type Specific (4 rules)
        {
            conditions: { goal: "strength", body_type: "slim" },
            strategy: "5x5 Linear Progression",
            exercises: ["Squats", "Bench press", "Deadlift", "Overhead Press", "Planks"],
            explanation: "Focusing on low reps and perfect form to build neural strength and technique mastery."
        },
        {
            conditions: { goal: "strength", body_type: "average" },
            strategy: "Explosive Power Training",
            exercises: ["Jump Squats", "Clapping Push-ups", "Deadlift", "Sprints"],
            explanation: "Developing speed-strength by moving moderate weights as fast as possible."
        },
        {
            conditions: { goal: "strength", body_type: "broad" },
            strategy: "Max Effort Powerlifting",
            exercises: ["Squats", "Bench press", "Deadlift", "Rack Pulls"],
            explanation: "You're built to move heavy objects. Low reps, high weight, long rest periods for maximum strength."
        },
        {
            conditions: { goal: "strength", body_type: "heavier" },
            strategy: "Strongman-Style Conditioning",
            exercises: ["Farmer Carries", "Deadlift", "Overhead Press", "Sled Push"],
            explanation: "Using your bodyweight as an advantage to move heavy loads and build functional strength."
        },
        {
            conditions: { goal: "strength", environment: "home" },
            strategy: "Unilateral Strength & Stability",
            exercises: ["Pistol Squats (or progression)", "One-arm Push-ups", "Seated dumbbell press", "Planks", "Lunges"],
            explanation: "Since you don't have heavy barbells at home, we build strength by using 'Unilateral' (single-limb) movements. This increases the intensity without needing hundreds of pounds of weight."
        },
        
        // GENERAL HEALTH - Body Type Specific (4 rules)
        {
            conditions: { goal: "general_health", body_type: "slim" },
            strategy: "Functional Strength & Mobility",
            exercises: ["Lunges", "Push-ups", "Planks", "Step-ups"],
            explanation: "Building a resilient body through functional movement patterns and mobility work."
        },
        {
            conditions: { goal: "general_health", body_type: "average", limitations: "none" },
            strategy: "Mixed Modal Aerobic",
            exercises: ["Squats", "Push-ups", "Planks", "Lunges", "Bicep curls", "Glute Bridges", "Step-ups"],
            explanation: "A mix of cardio and calisthenics for overall heart and muscle health."
        },
        {
            conditions: { goal: "general_health", body_type: "broad" },
            strategy: "Structural Balance",
            exercises: ["Face Pulls", "Squats", "Planks", "Barbell Rows"],
            explanation: "Maintaining your frame with exercises that promote posture and structural longevity."
        },
        {
            conditions: { goal: "general_health", body_type: "heavier" },
            strategy: "Active Mobility & Joints",
            exercises: ["Box Squats (to Chair)", "Wall push-ups", "Walking"],
            explanation: "Prioritizing joint health and movement quality over intensity for long-term wellness."
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
        // Basic frequency rules (existing)
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
        
        // Goal-specific frequency rules (12 new rules)
        {
            conditions: { goal: "fat_loss", days: "2-3" },
            schedule: "2-3 Days Full Body Metabolic",
            sessionStyle: "High-intensity circuits"
        },
        {
            conditions: { goal: "fat_loss", days: "3-4" },
            schedule: "3-4 Days Upper/Lower HIIT Split",
            sessionStyle: "Alternating cardio/strength"
        },
        {
            conditions: { goal: "fat_loss", days: "5-6" },
            schedule: "5-6 Days Cardio/Strength Rotation",
            sessionStyle: "Daily variety training"
        },
        {
            conditions: { goal: "muscle_gain", days: "2-3" },
            schedule: "2-3 Days Full Body Hypertrophy",
            sessionStyle: "Heavy compound focus"
        },
        {
            conditions: { goal: "muscle_gain", days: "3-4" },
            schedule: "4 Days Push/Pull Split",
            sessionStyle: "Muscle group isolation"
        },
        {
            conditions: { goal: "muscle_gain", days: "5-6" },
            schedule: "6 Days Push/Pull/Legs (PPL)",
            sessionStyle: "High volume training"
        },
        {
            conditions: { goal: "strength", days: "2-3" },
            schedule: "3 Days Heavy Compound Focus",
            sessionStyle: "Low reps, long rest"
        },
        {
            conditions: { goal: "strength", days: "3-4" },
            schedule: "4 Days Upper/Lower Strength",
            sessionStyle: "Progressive overload"
        },
        {
            conditions: { goal: "strength", days: "5-6" },
            schedule: "5 Days Squat/Bench/Deadlift Split",
            sessionStyle: "Powerlifting style"
        },
        {
            conditions: { goal: "general_health", days: "2-3" },
            schedule: "2-3 Days Total Body Wellness",
            sessionStyle: "Balanced movement"
        },
        {
            conditions: { goal: "general_health", days: "3-4" },
            schedule: "3-4 Days Cardio + Light Weights",
            sessionStyle: "Active lifestyle"
        },
        {
            conditions: { goal: "general_health", days: "5-6" },
            schedule: "Daily Active Lifestyle Routine",
            sessionStyle: "Variety and fun"
        },
        
        // Duration-based rules (existing)
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

    // PRIORITY 6: DURATION-INTENSITY MATRIX RULES (9 new rules)
    durationIntensityRules: [
        {
            conditions: { duration: "10-15", intensity: "light" },
            sessionStyle: "Gentle Mobility Flow",
            advice: "Focus on movement quality and breathing in short sessions."
        },
        {
            conditions: { duration: "10-15", intensity: "moderate" },
            sessionStyle: "Express Circuit Training",
            advice: "Maximize efficiency with compound movements and minimal rest."
        },
        {
            conditions: { duration: "10-15", intensity: "high" },
            sessionStyle: "Tabata Protocol (20s on/10s off)",
            advice: "All-out effort for maximum results in minimal time."
        },
        {
            conditions: { duration: "20-30", intensity: "light" },
            sessionStyle: "Steady State Movement",
            advice: "Maintain consistent pace for endurance and recovery."
        },
        {
            conditions: { duration: "20-30", intensity: "moderate" },
            sessionStyle: "Standard Circuit Training",
            advice: "Balanced work-to-rest ratio for sustainable progress."
        },
        {
            conditions: { duration: "20-30", intensity: "high" },
            sessionStyle: "HIIT Intervals",
            advice: "Push hard during work periods, recover fully during rest."
        },
        {
            conditions: { duration: "30-40", intensity: "light" },
            sessionStyle: "Endurance Pacing",
            advice: "Build aerobic base with longer, easier sessions."
        },
        {
            conditions: { duration: "30-40", intensity: "moderate" },
            sessionStyle: "Standard Sets (60s rest)",
            advice: "Classic strength training with proper recovery between sets."
        },
        {
            conditions: { duration: "30-40", intensity: "high" },
            sessionStyle: "CrossFit Style WOD",
            advice: "Varied, challenging workouts that test all fitness domains."
        }
    ],

    // PRIORITY 7: ENVIRONMENT-CONTEXT RULES (8 new rules)
    environmentRules: [
        {
            conditions: { environment: "home", goal: "fat_loss" },
            advice: "Use high tempo and minimal rest to compensate for lack of cardio machines."
        },
        {
            conditions: { environment: "home", goal: "muscle_gain" },
            advice: "Focus on 'Time Under Tension' and slow negatives since you have lighter weights."
        },
        {
            conditions: { environment: "home", goal: "strength" },
            advice: "Master unilateral (one-arm/leg) movements to build strength without heavy barbells."
        },
        {
            conditions: { environment: "home", goal: "general_health" },
            advice: "Create a dedicated workout space to maintain habit consistency."
        },
        {
            conditions: { environment: "gym", goal: "fat_loss" },
            advice: "Utilize rowing machines and treadmills for effective warmups and cardio finishers."
        },
        {
            conditions: { environment: "gym", goal: "muscle_gain" },
            advice: "Use cables and machines to isolate specific muscles safely with perfect form."
        },
        {
            conditions: { environment: "gym", goal: "strength" },
            advice: "Prioritize the squat rack and barbell platform for maximum strength gains."
        },
        {
            conditions: { environment: "gym", goal: "general_health" },
            advice: "Try different machines and classes to keep workouts fun and varied."
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
                explanation: "Since heavy weights aren't available at home, we're using high-volume bodyweight exercises with explosive movements to stimulate muscle growth.",
                advice: "Since heavy weights are unavailable, use explosive speed to build strength. Volume Training.",
                schedule: "4 Days Upper/Lower Split", 
                sessionStyle: "High Volume / Circuit",
                intensity: "High"
            }
        },
        {
            conditions: { goal: "fat_loss", body_type: "heavier", days: "2-3" },
            recommendation: {
                strategy: "Low-Impact Metabolic Strength",
                exercises: ["Box Squats (to Chair)", "Wall Push-ups", "Step-ups", "Band Pull-aparts"],
                intensity: "Moderate",
                explanation: "With limited training days and your body type, we're combining strength and cardio in low-impact movements to maximize fat burning while protecting your joints.",
                advice: "Focus on diet on non-training days to supplement low frequency.",
                schedule: "2-3 Days Full Body Circuit",
                sessionStyle: "Steady Pace (No Jumping)",
                equipment: ["Chair", "Bands"]
            }
        },
        {
            conditions: { goal: "strength", limitations: "upper_injury" },
            recommendation: {
                strategy: "Lower Body Power Focus",
                exercises: ["Leg Press (Heavy)", "Hack Squat", "Lunge Variations", "Core Bracing"],
                intensity: "Moderate",
                explanation: "Your upper body injury means we're channeling all your strength-building energy into your legs and core. This maintains your power development while allowing your upper body to heal properly.",
                advice: "Maintain leg strength while rehabbing upper body.",
                schedule: "3 Days Lower Body Focus",
                sessionStyle: "Strength Sets (Rest 2-3 mins)",
                equipment: ["Machine", "Leg press machine"]
            }
        },
        {
            conditions: { goal: "general_health", duration: "10-15", intensity: "high" },
            recommendation: {
                strategy: "EMOM (Every Minute on the Minute) Micro-Workouts",
                exercises: ["Burpees", "Jump Squats", "Plank to Push-up"],
                explanation: "With only 10-15 minutes available, we're using high-intensity interval training where you perform one exercise every minute. This maximizes fitness benefits in minimal time.",
                advice: "Zero rest periods are required to make this duration effective.",
                schedule: "Daily Micro-Workouts",
                sessionStyle: "Interval Timer (EMOM)",
                intensity: "High",
                equipment: ["None"]
            }
        },
        {
            conditions: { goal: "fat_loss", limitations: "lower_injury" },
            recommendation: {
                strategy: "Seated/Upper Body Metabolic Conditioning",
                exercises: ["Battle Ropes (Seated)", "Speed Bag (Boxing)", "Seated Dumbbell Press (High Reps)", "Floor Press"],
                intensity: "Moderate",
                explanation: "Since your legs need rest, we're creating a fat-burning workout using seated upper body exercises. This keeps your heart rate elevated for calorie burn while protecting your injured lower body.",
                advice: "Focus on upper body cardio to burn calories. Perform exercises seated to protect joints.",
                schedule: "3-4 Days Upper Body Cardio",
                sessionStyle: "Seated Intervals",
                equipment: ["Ropes", "Machine", "Dumbbells"]
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
