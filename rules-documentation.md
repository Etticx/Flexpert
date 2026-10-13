# Flexpert Knowledge Base Rules Documentation

This document contains all the inference rules used by the Flexpert fitness recommendation system, organized by priority levels.

## PRIORITY 1: SAFETY & LIMITATION RULES (10 Rules)

These rules have the highest priority and override all other recommendations to ensure user safety.

### Upper Body Injury Rules
- **R1:** IF limitations = "upper_injury" AND goal = "fat_loss" THEN Lower Body Fat Burning (Upper Injury Safe)
- **R2:** IF limitations = "upper_injury" AND goal = "muscle_gain" THEN Lower Body Hypertrophy (Upper Injury Safe)
- **R3:** IF limitations = "upper_injury" AND goal = "strength" THEN Lower Body Strength Focus (Upper Injury Safe)
- **R4:** IF limitations = "upper_injury" AND goal = "general_health" THEN Lower Body Maintenance (Upper Injury Safe)

### Lower Body Injury Rules
- **R5:** IF limitations = "lower_injury" AND goal = "fat_loss" THEN Upper Body Metabolic Training (Lower Injury Safe)
- **R6:** IF limitations = "lower_injury" AND goal = "muscle_gain" THEN Upper Body Hypertrophy (Lower Injury Safe)
- **R7:** IF limitations = "lower_injury" AND goal = "strength" THEN Upper Body Strength Focus (Lower Injury Safe)
- **R8:** IF limitations = "lower_injury" AND goal = "general_health" THEN Upper Body Maintenance (Lower Injury Safe)

### Cardiovascular & General Health Rules
- **R9:** IF limitations = "cardio_issues" THEN Very Low Impact Strengthening
- **R10:** IF limitations = "none" THEN No limitations detected - cleared for high-intensity training

## PRIORITY 2: STRATEGY RULES (20 Rules)

These rules determine the workout strategy based on fitness goals and body types.

### Fat Loss Strategies (5 Rules)
- **R11:** IF goal = "fat_loss" AND body_type = "slim" THEN High-Protein Recomposition
- **R12:** IF goal = "fat_loss" AND body_type = "average" AND environment = "gym" THEN Heavy Compound Recomposition
- **R13:** IF goal = "fat_loss" AND body_type = "average" THEN High-Intensity Circuit Training
- **R14:** IF goal = "fat_loss" AND body_type = "broad" THEN Power-Endurance Hybrid
- **R15:** IF goal = "fat_loss" AND body_type = "heavier" THEN Low-Impact Metabolic Strength

### Muscle Gain Strategies (5 Rules)
- **R16:** IF goal = "muscle_gain" AND body_type = "slim" THEN High Volume Hypertrophy
- **R17:** IF goal = "muscle_gain" AND body_type = "average" THEN Classic Bodybuilding Split
- **R18:** IF goal = "muscle_gain" AND body_type = ["broad", "heavier"] AND environment = "home" THEN Heavy Dumbbell Control
- **R19:** IF goal = "muscle_gain" AND body_type = "broad" THEN Heavy Compound Powerbuilding
- **R20:** IF goal = "muscle_gain" AND body_type = "heavier" THEN Body Recomposition Hypertrophy

### Strength Strategies (5 Rules)
- **R21:** IF goal = "strength" AND body_type = "slim" THEN 5x5 Linear Progression
- **R22:** IF goal = "strength" AND body_type = "average" THEN Explosive Power Training
- **R23:** IF goal = "strength" AND body_type = "broad" THEN Max Effort Powerlifting
- **R24:** IF goal = "strength" AND body_type = "heavier" THEN Strongman-Style Conditioning
- **R25:** IF goal = "strength" AND environment = "home" THEN Unilateral Strength & Stability

### General Health Strategies (5 Rules)
- **R26:** IF goal = "general_health" AND body_type = "slim" THEN Functional Strength & Mobility
- **R27:** IF goal = "general_health" AND body_type = "average" AND limitations = "none" THEN Mixed Modal Aerobic
- **R28:** IF goal = "general_health" AND body_type = "broad" THEN Structural Balance
- **R29:** IF goal = "general_health" AND body_type = "heavier" THEN Active Mobility & Joints
- **R30:** IF goal = "general_health" AND limitations = "cardio_issues" THEN Very low impact strengthening

## PRIORITY 3: ENVIRONMENT & EQUIPMENT RULES (2 Rules)

These rules determine available equipment based on workout environment.

- **R31:** IF environment = "home" THEN equipment = ["Mat", "Dumbbells", "Resistance bands", "Chair"]
- **R32:** IF environment = "gym" THEN equipment = ["Barbell", "Cables", "Ropes", "Leg press machine", "Chest machine", "Free weights", "Dumbbells", "Bench", "Machine"]

## PRIORITY 4: SCHEDULE & DURATION RULES (18 Rules)

These rules determine workout frequency and session structure.

### Basic Frequency Rules (3 Rules)
- **R33:** IF days = "2-3" THEN schedule = "2–3 days per week (Full Body Workout)"
- **R34:** IF days = "3-4" THEN schedule = "3–4 days per week (Upper/Lower Split)"
- **R35:** IF days = "5-6" THEN schedule = "5–6 days per week, chest 2x weekly"

### Goal-Specific Frequency Rules (12 Rules)

#### Fat Loss Frequency
- **R36:** IF goal = "fat_loss" AND days = "2-3" THEN "2-3 Days Full Body Metabolic"
- **R37:** IF goal = "fat_loss" AND days = "3-4" THEN "3-4 Days Upper/Lower HIIT Split"
- **R38:** IF goal = "fat_loss" AND days = "5-6" THEN "5-6 Days Cardio/Strength Rotation"

#### Muscle Gain Frequency
- **R39:** IF goal = "muscle_gain" AND days = "2-3" THEN "2-3 Days Full Body Hypertrophy"
- **R40:** IF goal = "muscle_gain" AND days = "3-4" THEN "4 Days Push/Pull Split"
- **R41:** IF goal = "muscle_gain" AND days = "5-6" THEN "6 Days Push/Pull/Legs (PPL)"

#### Strength Frequency
- **R42:** IF goal = "strength" AND days = "2-3" THEN "3 Days Heavy Compound Focus"
- **R43:** IF goal = "strength" AND days = "3-4" THEN "4 Days Upper/Lower Strength"
- **R44:** IF goal = "strength" AND days = "5-6" THEN "5 Days Squat/Bench/Deadlift Split"

#### General Health Frequency
- **R45:** IF goal = "general_health" AND days = "2-3" THEN "2-3 Days Total Body Wellness"
- **R46:** IF goal = "general_health" AND days = "3-4" THEN "3-4 Days Cardio + Light Weights"
- **R47:** IF goal = "general_health" AND days = "5-6" THEN "Daily Active Lifestyle Routine"

### Duration-Based Rules (3 Rules)
- **R48:** IF duration = "10-15" THEN sessionStyle = "Super-sets (No rest between exercises)"
- **R49:** IF duration = "20-30" THEN sessionStyle = "Circuit Training"
- **R50:** IF duration = "30-40" THEN sessionStyle = "Standard Sets (Rest between sets)"

## PRIORITY 5: INTENSITY ADJUSTMENT RULES (12 Rules)

These rules adjust intensity based on physical limitations for safety.

### High Intensity Adjustments
- **R51:** IF intensity = "high" AND limitations = "none" THEN finalIntensity = "High"
- **R52:** IF intensity = "high" AND limitations = "upper_injury" THEN finalIntensity = "Moderate"
- **R53:** IF intensity = "high" AND limitations = "lower_injury" THEN finalIntensity = "Moderate"
- **R54:** IF intensity = "high" AND limitations = "cardio_issues" THEN finalIntensity = "Light"

### Moderate Intensity Adjustments
- **R55:** IF intensity = "moderate" AND limitations = "none" THEN finalIntensity = "Moderate"
- **R56:** IF intensity = "moderate" AND limitations = "upper_injury" THEN finalIntensity = "Moderate"
- **R57:** IF intensity = "moderate" AND limitations = "lower_injury" THEN finalIntensity = "Moderate"
- **R58:** IF intensity = "moderate" AND limitations = "cardio_issues" THEN finalIntensity = "Light"

### Light Intensity Adjustments
- **R59:** IF intensity = "light" AND limitations = "none" THEN finalIntensity = "Light"
- **R60:** IF intensity = "light" AND limitations = "upper_injury" THEN finalIntensity = "Light"
- **R61:** IF intensity = "light" AND limitations = "lower_injury" THEN finalIntensity = "Light"
- **R62:** IF intensity = "light" AND limitations = "cardio_issues" THEN finalIntensity = "Light"

## PRIORITY 6: DURATION-INTENSITY MATRIX RULES (9 Rules)

These rules combine duration and intensity preferences to determine session style.

### Short Duration (10-15 minutes)
- **R63:** IF duration = "10-15" AND intensity = "light" THEN "Gentle Mobility Flow"
- **R64:** IF duration = "10-15" AND intensity = "moderate" THEN "Express Circuit Training"
- **R65:** IF duration = "10-15" AND intensity = "high" THEN "Tabata Protocol (20s on/10s off)"

### Medium Duration (20-30 minutes)
- **R66:** IF duration = "20-30" AND intensity = "light" THEN "Steady State Movement"
- **R67:** IF duration = "20-30" AND intensity = "moderate" THEN "Standard Circuit Training"
- **R68:** IF duration = "20-30" AND intensity = "high" THEN "HIIT Intervals"

### Long Duration (30-40 minutes)
- **R69:** IF duration = "30-40" AND intensity = "light" THEN "Endurance Pacing"
- **R70:** IF duration = "30-40" AND intensity = "moderate" THEN "Standard Sets (60s rest)"
- **R71:** IF duration = "30-40" AND intensity = "high" THEN "CrossFit Style WOD"

## PRIORITY 7: ENVIRONMENT-CONTEXT RULES (8 Rules)

These rules provide specific advice based on workout environment and goals.

### Home Environment Rules
- **R72:** IF environment = "home" AND goal = "fat_loss" THEN "Use high tempo and minimal rest to compensate for lack of cardio machines"
- **R73:** IF environment = "home" AND goal = "muscle_gain" THEN "Focus on Time Under Tension and slow negatives since you have lighter weights"
- **R74:** IF environment = "home" AND goal = "strength" THEN "Master unilateral (one-arm/leg) movements to build strength without heavy barbells"
- **R75:** IF environment = "home" AND goal = "general_health" THEN "Create a dedicated workout space to maintain habit consistency"

### Gym Environment Rules
- **R76:** IF environment = "gym" AND goal = "fat_loss" THEN "Utilize rowing machines and treadmills for effective warmups and cardio finishers"
- **R77:** IF environment = "gym" AND goal = "muscle_gain" THEN "Use cables and machines to isolate specific muscles safely with perfect form"
- **R78:** IF environment = "gym" AND goal = "strength" THEN "Prioritize the squat rack and barbell platform for maximum strength gains"
- **R79:** IF environment = "gym" AND goal = "general_health" THEN "Try different machines and classes to keep workouts fun and varied"

## SPECIAL CASE RULES (5 Rules)

These rules handle specific combinations that require unique recommendations.

- **R80:** IF goal = "muscle_gain" AND environment = "gym" AND limitations = "none" AND body_type = ["slim", "average"] THEN High-Volume Calisthenics (Hypertrophy)
- **R81:** IF goal = "fat_loss" AND body_type = "heavier" AND days = "2-3" THEN Low-Impact Metabolic Strength
- **R82:** IF goal = "strength" AND limitations = "upper_injury" AND environment = "gym" THEN Lower Body Power Focus
- **R83:** IF goal = "general_health" AND duration = "10-15" AND intensity = "high" THEN EMOM (Every Minute on the Minute) Micro-Workouts
- **R84:** IF goal = "fat_loss" AND limitations = "lower_injury" AND environment = "gym" THEN Seated/Upper Body Metabolic Conditioning

---

## Summary

**Total Rules: 84**

The rule system follows a strict priority hierarchy:
1. **Safety First** - Physical limitations override all other preferences
2. **Goal-Based Strategy** - Workout approach based on fitness objectives and body type
3. **Equipment Availability** - Adapts to home vs gym environments
4. **Schedule Optimization** - Frequency and duration preferences
5. **Intensity Management** - Safety-adjusted intensity levels
6. **Session Structure** - Duration-intensity combinations
7. **Environment-Specific Advice** - Context-aware recommendations
8. **Special Cases** - Unique combinations requiring custom solutions

This hierarchical approach ensures that safety is never compromised while providing personalized, effective workout recommendations.