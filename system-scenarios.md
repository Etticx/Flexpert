# Flexpert System Scenarios Documentation

This document demonstrates how the Flexpert fitness recommendation system processes user inputs through its inference engine to generate personalized workout plans.

## Scenario 1: Beginner with Upper Body Injury

### User Input
A user accesses the Flexpert questionnaire and enters the following input:

| Input Field | Selected Value (Facts) |
|-------------|------------------------|
| Primary Workout Goal | F1.1: Fat Loss is a primary workout goal |
| Body Type | F2.2: Average is a body type |
| Training Frequency | F3.1: 2-3 days per week is a training frequency option |
| Physical Limitations | F4.2: Upper body injury is a physical limitation (shoulder/wrist issues) |
| Workout Environment | F5.1: Home is a workout environment |
| Intensity Preference | F6.2: Moderate is an intensity preference |
| Session Duration | F7.2: 20-30 minutes is a session duration option |

**Table 1: Input data entry for Scenario 1**

### Inference Engine Processing

**Priority 1 - Safety Rules (Highest Priority):**
```
F1.1 + F4.2 → R1: Lower Body Fat Burning (Upper Injury Safe)
```
*Rule R1 triggers because user has upper body injury AND fat loss goal*

**Priority 3 - Equipment Rules:**
```
F5.1 → R31: Equipment = ["Mat", "Dumbbells", "Resistance bands", "Chair"]
```
*Rule R31 determines available home equipment*

**Priority 5 - Intensity Adjustment:**
```
F6.2 + F4.2 → R56: Final Intensity = "Moderate"
```
*Rule R56 maintains moderate intensity as safe with upper body injury*

**Priority 6 - Duration-Intensity Matrix:**
```
F7.2 + F6.2 → R67: Session Style = "Standard Circuit Training"
```
*Rule R67 combines 20-30 minute duration with moderate intensity*

### System Output

**Recommendation Generated:**
- **Strategy:** Lower Body Fat Burning (Upper Injury Safe)
- **Exercises:** ["Squats", "Lunges", "High Knees", "Step-ups", "Glute Bridges", "Walking"]
- **Schedule:** 2-3 days per week (Full Body Workout)
- **Session Style:** Standard Circuit Training
- **Intensity:** Moderate
- **Equipment:** Mat, Dumbbells, Resistance bands, Chair
- **Explanation:** "Since you have an upper body injury, we prioritized high-intensity leg movements to burn fat without stressing your shoulders."

### Conclusion
The user receives a safe, personalized fat loss program focusing on lower body exercises that avoid aggravating their upper body injury while still achieving their fitness goals.

---

## Scenario 2: Advanced Athlete Seeking Strength Gains

### User Input
A user accesses the Flexpert questionnaire and enters the following input:

| Input Field | Selected Value (Facts) |
|-------------|------------------------|
| Primary Workout Goal | F1.3: Strength is a primary workout goal |
| Body Type | F2.3: Broad is a body type |
| Training Frequency | F3.3: 5-6 days per week is a training frequency option |
| Physical Limitations | F4.1: None is a physical limitation status (healthy state) |
| Workout Environment | F5.2: Gym is a workout environment |
| Intensity Preference | F6.3: High is an intensity preference |
| Session Duration | F7.3: 30-40 minutes is a session duration option |

**Table 2: Input data entry for Scenario 2**

### Inference Engine Processing

**Priority 2 - Strategy Rules:**
```
F1.3 + F2.3 → R23: Max Effort Powerlifting
```
*Rule R23 triggers for strength goal with broad body type*

**Priority 3 - Equipment Rules:**
```
F5.2 → R32: Equipment = ["Barbell", "Cables", "Ropes", "Leg press machine", "Chest machine", "Free weights", "Dumbbells", "Bench", "Machine"]
```
*Rule R32 provides full gym equipment access*

**Priority 4 - Schedule Rules:**
```
F1.3 + F3.3 → R44: "5 Days Squat/Bench/Deadlift Split"
```
*Rule R44 creates powerlifting-focused schedule*

**Priority 5 - Intensity Rules:**
```
F6.3 + F4.1 → R51: Final Intensity = "High"
```
*Rule R51 maintains high intensity with no limitations*

**Priority 6 - Duration-Intensity Matrix:**
```
F7.3 + F6.3 → R71: Session Style = "CrossFit Style WOD"
```
*Rule R71 combines long duration with high intensity*

**Priority 7 - Environment Context:**
```
F5.2 + F1.3 → R78: "Prioritize the squat rack and barbell platform for maximum strength gains"
```
*Rule R78 provides gym-specific strength advice*

### System Output

**Recommendation Generated:**
- **Strategy:** Max Effort Powerlifting
- **Exercises:** ["Squats", "Bench press", "Deadlift", "Rack Pulls"]
- **Schedule:** 5 Days Squat/Bench/Deadlift Split
- **Session Style:** CrossFit Style WOD
- **Intensity:** High
- **Equipment:** Barbell, Bench, Machine, Free weights
- **Advice:** "Prioritize the squat rack and barbell platform for maximum strength gains"
- **Explanation:** "You're built to move heavy objects. Low reps, high weight, long rest periods for maximum strength."

### Conclusion
The user receives an advanced powerlifting program optimized for their broad body type and gym environment, focusing on the three main lifts with high intensity training suitable for their experience level and goals.

---

## System Architecture Summary

### Rule Processing Flow
1. **Safety First:** Physical limitations override all other preferences (Priority 1)
2. **Goal-Based Strategy:** Workout approach based on fitness objectives and body type (Priority 2)
3. **Equipment Availability:** Adapts to home vs gym environments (Priority 3)
4. **Schedule Optimization:** Frequency and duration preferences (Priority 4)
5. **Intensity Management:** Safety-adjusted intensity levels (Priority 5)
6. **Session Structure:** Duration-intensity combinations (Priority 6)
7. **Environment-Specific Advice:** Context-aware recommendations (Priority 7)
8. **Special Cases:** Unique combinations requiring custom solutions (Priority 8)

### Key Features
- **84 Rules** with hierarchical priority processing
- **150+ Facts** covering all user inputs and system knowledge
- **Safety-First Approach** ensuring injury prevention
- **Personalized Recommendations** based on individual characteristics
- **Equipment Adaptation** for home and gym environments
- **Progressive Difficulty** matching user experience levels