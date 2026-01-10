# FLEXPERT EXPERT SYSTEM - COMPLETE RULES DOCUMENTATION

## RULE PRIORITY HIERARCHY
1. **Special Case Rules** (Highest Priority)
2. **Safety & Limitation Rules** 
3. **Strategy Rules**
4. **Equipment Rules**
5. **Schedule & Duration Rules**
6. **Intensity Adjustment Rules**

---

## PRIORITY 1: SPECIAL CASE RULES

### Rule 1
**IF** goal = "muscle_gain" AND environment = "home" AND limitations = "none" AND body_type = ["slim", "average"]  
**THEN**
- Strategy = "High-Volume Calisthenics (Hypertrophy)"
- Exercises = ["Push-ups (Decline/Incline)", "Doorframe Rows", "Single-leg Squats", "Chair Dips"]
- Equipment = ["Resistance bands", "Chair", "Weighted Backpack (Optional)"]
- Advice = "Since heavy weights are unavailable, use explosive speed to build strength. Volume Training."

### Rule 2
**IF** goal = "fat_loss" AND body_type = "heavier" AND days = "2-3"  
**THEN**
- Strategy = "Low-Impact Metabolic Strength"
- Exercises = ["Box Squats (to Chair)", "Wall Push-ups", "Step-ups", "Band Pull-aparts"]
- Intensity = "Moderate"
- Advice = "Focus on diet on non-training days to supplement low frequency."

### Rule 3
**IF** goal = "strength" AND limitations = "upper_injury"  
**THEN**
- Strategy = "Lower Body Power Focus"
- Exercises = ["Leg Press (Heavy)", "Hack Squat", "Lunge Variations", "Core Bracing"]
- Intensity = "Moderate"
- Advice = "Maintain leg strength while rehabbing upper body."

### Rule 4
**IF** goal = "general_health" AND duration = "10-15" AND intensity = "high"  
**THEN**
- Strategy = "EMOM (Every Minute on the Minute) Micro-Workouts"
- Exercises = ["Burpees", "Jump Squats", "Plank to Push-up"]
- Advice = "Zero rest periods are required to make this duration effective."

### Rule 5
**IF** goal = "fat_loss" AND limitations = "lower_injury"  
**THEN**
- Strategy = "Seated/Upper Body Metabolic Conditioning"
- Exercises = ["Battle Ropes (Seated)", "Speed Bag (Boxing)", "Seated Dumbbell Press (High Reps)", "Floor Press"]
- Intensity = "Moderate"
- Advice = "Focus on upper body cardio to burn calories. Perform exercises seated to protect joints."

---

## PRIORITY 2: SAFETY & LIMITATION RULES

### Rule 6
**IF** limitations = "upper_injury" AND goal = "fat_loss"  
**THEN**
- Exercises = ["Squats", "Lunges", "High Knees", "Step-ups", "Glute Bridges", "Walking"]
- Strategy = "Lower Body Fat Burning (Upper Injury Safe)"
- Explanation = "Since you have an upper body injury, we prioritized high-intensity leg movements to burn fat without stressing your shoulders."

### Rule 7
**IF** limitations = "upper_injury" AND goal = "muscle_gain"  
**THEN**
- Exercises = ["Squats", "Lunges", "Leg Press", "Deadlift", "Glute Bridges", "Step-ups"]
- Strategy = "Lower Body Hypertrophy (Upper Injury Safe)"
- Explanation = "With your upper body injury, we're focusing on building muscle through heavy leg work. This allows you to gain strength and size while your shoulders/arms heal."

### Rule 8
**IF** limitations = "upper_injury" AND goal = "strength"  
**THEN**
- Exercises = ["Squats", "Deadlift", "Leg Press", "Lunges", "Glute Bridges", "Step-ups"]
- Strategy = "Lower Body Strength Focus (Upper Injury Safe)"
- Explanation = "Your upper body needs rest, but we can still build serious strength through heavy squats and deadlifts. Your legs are your body's powerhouse!"

### Rule 9
**IF** limitations = "upper_injury" AND goal = "general_health"  
**THEN**
- Exercises = ["Squats", "Lunges", "Step-ups", "Walking", "Glute Bridges", "Sit-ups"]
- Strategy = "Lower Body Maintenance (Upper Injury Safe)"
- Explanation = "We're keeping you active and healthy while protecting your injured upper body. These gentle lower body movements maintain fitness without aggravating your injury."

### Rule 10
**IF** limitations = "lower_injury" AND goal = "fat_loss"  
**THEN**
- Exercises = ["Seated dumbbell press", "Chest fly", "Bicep curls", "Floor press", "Band chest fly", "Wall push-ups"]
- Strategy = "Upper Body Metabolic Training (Lower Injury Safe)"
- Explanation = "Since your legs need rest, we're using high-rep upper body circuits to burn calories. This keeps your heart rate up for fat loss while protecting your injured lower body."

### Rule 11
**IF** limitations = "lower_injury" AND goal = "muscle_gain"  
**THEN**
- Exercises = ["Bench press", "Seated dumbbell press", "Chest fly", "Bicep curls", "Floor press", "Push-ups"]
- Strategy = "Upper Body Hypertrophy (Lower Injury Safe)"
- Explanation = "Perfect time to build that upper body! While your legs recover, we're focusing on chest, shoulders, and arms to pack on muscle where you can train safely."

### Rule 12
**IF** limitations = "lower_injury" AND goal = "strength"  
**THEN**
- Exercises = ["Bench press", "Seated dumbbell press", "Floor press", "Bicep curls", "Push-ups", "Planks"]
- Strategy = "Upper Body Strength Focus (Lower Injury Safe)"
- Explanation = "Your lower body injury doesn't stop upper body gains! We're maximizing bench press and pressing movements to build serious upper body strength while you heal."

### Rule 13
**IF** limitations = "lower_injury" AND goal = "general_health"  
**THEN**
- Exercises = ["Seated dumbbell press", "Chest fly", "Bicep curls", "Wall push-ups", "Band chest fly", "Planks"]
- Strategy = "Upper Body Maintenance (Lower Injury Safe)"
- Explanation = "Staying active during injury recovery is crucial. These gentle upper body exercises maintain your fitness and mood while giving your legs the rest they need."

### Rule 14
**IF** limitations = "cardio_issues"  
**THEN**
- Exercises = ["Slow lunges", "Wall push-ups", "Band chest fly", "Chair squats", "Walking", "Breathing drills"]
- Strategy = "Very Low Impact Strengthening"
- Explanation = "Your heart health is our priority. These gentle, controlled movements strengthen your body without putting stress on your cardiovascular system. We're building fitness safely."

### Rule 15
**IF** limitations = "none"  
**THEN**
- Explanation = "No limitations detected - you're cleared for high-intensity training! We can push your limits and maximize your results with challenging workouts."

---

## PRIORITY 3: STRATEGY RULES

### Rule 17
**IF** goal = "fat_loss" AND body_type = ["slim", "average"]  
**THEN**
- Strategy = "High-rep cardio + short fat-burning circuits"
- Exercises = ["Burpees", "High Knees", "Squats", "Push-ups", "Lunges", "Planks", "Step-ups"]
- Explanation = "For your body type and fat loss goal, we're using high-intensity circuits to maximize calorie burn and boost your metabolism."

### Rule 18
**IF** goal = "fat_loss" AND body_type = ["broad", "heavier"]  
**THEN**
- Strategy = "Strength + HIIT hybrid for fat loss and tone"
- Exercises = ["Deadlift", "Squats", "Bench press", "Burpees", "Lunges", "Push-ups", "Bicep curls"]
- Explanation = "Your build is perfect for combining strength training with cardio - this burns fat while maintaining muscle mass for a toned, powerful physique."

### Rule 19
**IF** goal = "muscle_gain" AND body_type = "slim"  
**THEN**
- Strategy = "Progressive overload chest-focused strength plan"
- Exercises = ["Bench press", "Push-ups", "Chest fly", "Seated dumbbell press", "Bicep curls", "Floor press", "Planks"]
- Explanation = "As a slim build, we're focusing on upper body development with progressive overload to help you build visible muscle mass and strength."

### Rule 20
**IF** goal = "muscle_gain" AND body_type = ["broad", "heavier"] AND environment = "home"  
**THEN**
- Strategy = "Heavy Dumbbell Control"
- Exercises = ["Floor press", "Chair squats", "Seated dumbbell press", "Slow lunges", "Planks"]
- Explanation = "Adapting heavy lifting for home: We use slower tempos with dumbbells to simulate heavy loads without a barbell."

### Rule 21
**IF** goal = "muscle_gain" AND body_type = ["broad", "heavier"]  
**THEN**
- Strategy = "Leg Focused Hypertrophy"
- Exercises = ["Squats", "Deadlift", "Lunges", "Leg Press", "Step-ups", "Glute Bridges", "Bicep curls"]
- Explanation = "Your broad build gives you natural strength advantages - we're maximizing this with heavy leg work to build serious muscle mass and power."

### Rule 22
**IF** goal = "strength"  
**THEN**
- Strategy = "Chest-focused strength + conditioning"
- Exercises = ["Bench press", "Deadlift", "Squats", "Seated dumbbell press", "Bicep curls", "Push-ups", "Planks"]
- Explanation = "Building functional strength with compound movements - this program develops real-world power and athletic performance."

### Rule 23
**IF** goal = "general_health" AND limitations = "none"  
**THEN**
- Strategy = "Balanced wellness with easy chest activation"
- Exercises = ["Squats", "Push-ups", "Planks", "Lunges", "Bicep curls", "Glute Bridges", "Step-ups"]
- Explanation = "A well-rounded approach to fitness that builds strength, endurance, and mobility for overall health and longevity."

### Rule 24
**IF** goal = "general_health" AND limitations = "cardio_issues"  
**THEN**
- Strategy = "Very low impact strengthening"
- Exercises = ["Slow lunges", "Wall push-ups", "Chair squats", "Walking", "Breathing drills", "Band chest fly"]

---

## PRIORITY 4: EQUIPMENT RULES

### Rule 25
**IF** environment = "home"  
**THEN**
- Equipment = ["Mat", "Dumbbells", "Resistance bands", "Chair"]

### Rule 26
**IF** environment = "gym"  
**THEN**
- Equipment = ["Barbell", "Cables", "Ropes", "Leg press machine", "Chest machine", "Free weights", "Dumbbells", "Bench", "Machine"]

---

## PRIORITY 5: SCHEDULE & DURATION RULES

### Rule 27
**IF** days = "2-3"  
**THEN**
- Schedule = "2–3 days per week (Full Body Workout)"

### Rule 28
**IF** days = "3-4"  
**THEN**
- Schedule = "3–4 days per week (Upper/Lower Split)"

### Rule 29
**IF** days = "5-6"  
**THEN**
- Schedule = "5–6 days per week, chest 2x weekly"

### Rule 30
**IF** duration = "10-15"  
**THEN**
- SessionStyle = "Super-sets (No rest between exercises)"

### Rule 31
**IF** duration = "20-30"  
**THEN**
- SessionStyle = "Circuit Training"

### Rule 32
**IF** duration = "30-40"  
**THEN**
- SessionStyle = "Standard Sets (Rest between sets)"

---

## PRIORITY 6: INTENSITY ADJUSTMENT RULES

### Rule 33
**IF** intensity = "high" AND limitations = "none"  
**THEN**
- FinalIntensity = "High"

### Rule 34
**IF** intensity = "high" AND limitations = "upper_injury"  
**THEN**
- FinalIntensity = "Moderate"

### Rule 35
**IF** intensity = "high" AND limitations = "lower_injury"  
**THEN**
- FinalIntensity = "Moderate"

### Rule 36
**IF** intensity = "high" AND limitations = "cardio_issues"  
**THEN**
- FinalIntensity = "Light"

### Rule 37
**IF** intensity = "moderate" AND limitations = "none"  
**THEN**
- FinalIntensity = "Moderate"

### Rule 38
**IF** intensity = "moderate" AND limitations = "upper_injury"  
**THEN**
- FinalIntensity = "Moderate"

### Rule 39
**IF** intensity = "moderate" AND limitations = "lower_injury"  
**THEN**
- FinalIntensity = "Moderate"

### Rule 40
**IF** intensity = "moderate" AND limitations = "cardio_issues"  
**THEN**
- FinalIntensity = "Light"

### Rule 41
**IF** intensity = "light" AND limitations = "none"  
**THEN**
- FinalIntensity = "Light"

### Rule 42
**IF** intensity = "light" AND limitations = "upper_injury"  
**THEN**
- FinalIntensity = "Light"

### Rule 43
**IF** intensity = "light" AND limitations = "lower_injury"  
**THEN**
- FinalIntensity = "Light"

### Rule 44
**IF** intensity = "light" AND limitations = "cardio_issues"  
**THEN**
- FinalIntensity = "Light"

---

## DEFAULT FALLBACK RULE

### Rule 43
**IF** no other rules match  
**THEN**
- Strategy = "Balanced Fitness Plan"
- Exercises = ["Squats", "Push-ups", "Planks", "Lunges", "Bicep curls"]
- Schedule = "3–4 days per week"
- Equipment = ["Mat", "Dumbbells"]
- Advice = "Focus on progressive overload and proper form. Maintain proper nutrition aligned with your goals."
- Intensity = "Moderate"

---

## RULE EXECUTION LOGIC

1. **Check Special Case Rules first** (Rules 1-5) - If any match, execute and STOP
2. **Apply Safety Rules** (Rules 6-15) - Override exercises, strategy, explanation if conditions match
3. **Apply Strategy Rules** (Rules 16-23) - Set strategy and exercises if not already set
4. **Apply Equipment Rules** (Rules 24-25) - Set available equipment
5. **Apply Schedule Rules** (Rules 26-31) - Set training schedule and session style
6. **Apply Intensity Rules** (Rules 32-43) - Final intensity adjustment based on user preference AND limitations
7. **Apply Default Rule** (Rule 43) - Fill any missing fields

## TOTAL RULES: 43

**Rule Distribution:**
- Special Case Rules: 5
- Safety & Limitation Rules: 10
- Strategy Rules: 8
- Equipment Rules: 2
- Schedule & Duration Rules: 6
- Intensity Adjustment Rules: 12
- Default Fallback Rule: 1

## INTENSITY ADJUSTMENT LOGIC

The intensity rules now properly consider all limitation types and work independently from safety rules:

**High Intensity Requests:**
- No limitations → High intensity (safe)
- Upper/Lower injury → Moderate intensity (reduced for safety)
- Cardio issues → Light intensity (maximum safety)

**Moderate Intensity Requests:**
- No limitations → Moderate intensity (as requested)
- Upper/Lower injury → Moderate intensity (appropriate level)
- Cardio issues → Light intensity (safety override)

**Light Intensity Requests:**
- All limitation types → Light intensity (always safe)

**Key Fix:** Safety rules no longer override intensity - they only handle exercises and strategy. Intensity is now purely handled by dedicated intensity rules, ensuring proper user preference consideration with safety adjustments.