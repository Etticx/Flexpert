/**
 * Flexpert Inference Engine
 * Forward-chaining rule engine to determine the best workout plan.
 */

const InferenceEngine = {
    // Run the engine based on user answers
    run: function (userAnswers) {
        console.log("⚙️ Running Inference Engine with:", userAnswers);
        console.log("🔄 Processing 84 rules across 7 priority levels...");

        // Check for special case rules first (highest priority overrides)
        for (const rule of window.knowledgeBase.specialRules) {
            if (this.matchesConditions(rule.conditions, userAnswers)) {
                console.log("✨ Special Rule Matched:", rule);
                return this.buildRecommendation(rule.recommendation);
            }
        }

        // Build recommendation by applying rules in priority order
        let recommendation = {};

        // PRIORITY 1: Safety & Limitation Rules
        for (const rule of window.knowledgeBase.safetyRules) {
            if (this.matchesConditions(rule.conditions, userAnswers)) {
                // Only override fields that are explicitly set in the rule
                if (rule.overrides.exercises) {
                    recommendation.exercises = rule.overrides.exercises;
                    console.log("🛡️ Safety Rule Override - Exercises:", rule.overrides.exercises);
                }
                if (rule.overrides.strategy) {
                    recommendation.strategy = rule.overrides.strategy;
                    console.log("🛡️ Safety Rule Override - Strategy:", rule.overrides.strategy);
                }
                if (rule.overrides.intensity) {
                    recommendation.intensity = rule.overrides.intensity;
                    console.log("🛡️ Safety Rule Override - Intensity:", rule.overrides.intensity);
                }
                if (rule.overrides.explanation) {
                    recommendation.explanation = rule.overrides.explanation;
                    console.log("🛡️ Safety Rule Explanation:", rule.overrides.explanation);
                }
                break;
            }
        }

        // PRIORITY 2: Strategy Rules
        for (const rule of window.knowledgeBase.strategyRules) {
            if (this.matchesConditions(rule.conditions, userAnswers)) {
                if (!recommendation.strategy) {
                    recommendation.strategy = rule.strategy;
                    console.log("📋 Strategy Rule Matched:", rule.strategy);
                }
                if (!recommendation.exercises && rule.exercises) {
                    recommendation.exercises = rule.exercises;
                    console.log("💪 Exercises from Strategy Rule:", rule.exercises);
                }
                // Strategy rule explanations can override safety rule explanations ONLY if:
                // 1. No safety explanation exists, OR
                // 2. Safety explanation is generic (no limitations) AND strategy has specific explanation
                if (rule.explanation) {
                    const hasGenericSafetyExplanation = recommendation.explanation && 
                        recommendation.explanation.includes("No limitations detected");
                    const hasNoSafetyExplanation = !recommendation.explanation;
                    
                    if (hasNoSafetyExplanation || hasGenericSafetyExplanation) {
                        recommendation.explanation = rule.explanation;
                        console.log("📋 Strategy Rule Explanation (Override):", rule.explanation);
                    } else {
                        console.log("📋 Strategy Rule Explanation (Skipped - Safety takes priority)");
                    }
                }
                break;
            }
        }

        // PRIORITY 3: Equipment Rules
        for (const rule of window.knowledgeBase.equipmentRules) {
            if (this.matchesConditions(rule.conditions, userAnswers)) {
                recommendation.equipment = rule.equipment;
                break;
            }
        }

        // PRIORITY 4: Schedule & Duration Rules
        // First pass: Goal-specific schedule rules (higher priority)
        for (const rule of window.knowledgeBase.scheduleRules) {
            if (this.matchesConditions(rule.conditions, userAnswers)) {
                const hasGoalAndDays = rule.conditions.goal && rule.conditions.days;
                if (hasGoalAndDays && rule.schedule && !recommendation.schedule) {
                    recommendation.schedule = rule.schedule;
                    console.log("📅 Goal-Specific Schedule Rule:", rule.schedule);
                }
                if (hasGoalAndDays && rule.sessionStyle && !recommendation.sessionStyle) {
                    recommendation.sessionStyle = rule.sessionStyle;
                    console.log("⏱️ Goal-Specific Session Style:", rule.sessionStyle);
                }
            }
        }
        
        // Second pass: Generic schedule rules (lower priority)
        for (const rule of window.knowledgeBase.scheduleRules) {
            if (this.matchesConditions(rule.conditions, userAnswers)) {
                const isGeneric = rule.conditions.days && !rule.conditions.goal;
                if (isGeneric && rule.schedule && !recommendation.schedule) {
                    recommendation.schedule = rule.schedule;
                    console.log("📅 Generic Schedule Rule:", rule.schedule);
                }
                if (isGeneric && rule.sessionStyle && !recommendation.sessionStyle) {
                    recommendation.sessionStyle = rule.sessionStyle;
                    console.log("⏱️ Generic Session Style:", rule.sessionStyle);
                }
            }
        }

        // PRIORITY 5: Intensity Adjustment Rules
        for (const rule of window.knowledgeBase.intensityRules) {
            if (this.matchesConditions(rule.conditions, userAnswers)) {
                if (!recommendation.intensity) {
                    recommendation.intensity = rule.finalIntensity;
                }
                break;
            }
        }

        // PRIORITY 6: Duration-Intensity Matrix Rules (Higher priority for session style)
        if (window.knowledgeBase.durationIntensityRules) {
            for (const rule of window.knowledgeBase.durationIntensityRules) {
                if (this.matchesConditions(rule.conditions, userAnswers)) {
                    // Duration-intensity rules override schedule session styles
                    if (rule.sessionStyle) {
                        recommendation.sessionStyle = rule.sessionStyle;
                        console.log("⏱️ Duration-Intensity Session Style (Override):", rule.sessionStyle);
                    }
                    if (!recommendation.advice) {
                        recommendation.advice = rule.advice;
                        console.log("💡 Duration-Intensity Advice:", rule.advice);
                    }
                    break;
                }
            }
        }

        // PRIORITY 7: Environment Context Rules
        if (window.knowledgeBase.environmentRules) {
            for (const rule of window.knowledgeBase.environmentRules) {
                if (this.matchesConditions(rule.conditions, userAnswers)) {
                    // Environment advice supplements existing advice or provides fallback
                    if (!recommendation.advice) {
                        recommendation.advice = rule.advice;
                        console.log("🏠 Environment Context Advice:", rule.advice);
                    } else {
                        // Combine advice if both exist
                        recommendation.advice += " " + rule.advice;
                        console.log("🏠 Environment Context Added:", rule.advice);
                    }
                    break;
                }
            }
        }

        // Fill in any missing fields with defaults
        let finalRec = this.buildRecommendation(recommendation);

        // --- POST-INFERENCE FILTERING (CRITICAL LOGIC FIX) ---
        // 1. First filter by equipment to ensure compatibility
        finalRec.exercises = this.filterExercisesByEquipment(finalRec.exercises, finalRec.equipment);
        
        // 2. Then limit by duration (after ensuring we have compatible exercises)
        finalRec.exercises = this.filterExercisesByDuration(finalRec.exercises, userAnswers.duration);

        return finalRec;
    },

    // Helper: Check if rule conditions match user input
    matchesConditions: function (conditions, userAnswers) {
        for (const [key, value] of Object.entries(conditions)) {
            if (Array.isArray(value)) {
                if (!value.includes(userAnswers[key])) {
                    return false;
                }
            } else {
                if (userAnswers[key] !== value) {
                    return false;
                }
            }
        }
        return true;
    },

    // Helper: Filter exercises based on session duration
    filterExercisesByDuration: function (exercises, duration) {
        if (!duration || !exercises) return exercises;

        const exerciseCount = {
            "10-15": 3,  // Short session: 3 exercises
            "20-30": 5,  // Medium session: 5 exercises  
            "30-40": 7   // Long session: 7 exercises
        };

        const maxExercises = exerciseCount[duration];
        if (maxExercises && exercises.length > maxExercises) {
            console.log(`🕐 Duration filter: Limiting to ${maxExercises} exercises for ${duration} min session`);
            return exercises.slice(0, maxExercises);
        }

        return exercises;
    },

    // Helper: Filter exercises based on user's equipment
    filterExercisesByEquipment: function (exercises, userEquipment) {
        // If no equipment list, assume safe (or default)
        if (!userEquipment || userEquipment.length === 0) return exercises;

        const db = window.knowledgeBase.exerciseDatabase;
        if (!db) return exercises; // Safety check

        const filtered = exercises.filter(exName => {
            const exData = db[exName];
            // If unknown exercise, keep it (assume safe/bodyweight?) - Or remove? Expert choice: Remove unknown to be safe.
            // BUT for this project, let's keep unknown to avoid empty lists if I missed a DB entry.
            if (!exData) return true;

            const required = exData.equipment;
            // Check if ANY of the required equipment items are in userEquipment
            // Wait, logic: "Bench Press" requires ["Barbell", "Bench"]. Needs ALL? Or "Barbell OR Dumbbells"? 
            // My DB design: "Bicep curls": ["Dumbbells", "Barbell", "Bands"] -> This means ANY of these work.
            // So logic is: Does user have AT LEAST ONE of the required items?

            // Special case: "None" always passes
            if (required.includes("None")) return true;

            const hasEquipment = required.some(reqItem => userEquipment.includes(reqItem));
            return hasEquipment;
        });

        // FALLBACK: If we filtered everything out (User has NO equipment for these exercises)
        if (filtered.length === 0) {
            console.warn("⚠️ All exercises filtered out! Using bodyweight fallback.");
            return ["Push-ups (Knees)", "Squats", "Glute Bridges", "Supermans", "Planks"];
        }

        return filtered;
    },

    // Helper: Merge partial recommendation with defaults
    buildRecommendation: function (partial) {
        const defaults = window.knowledgeBase.defaultRecommendation;

        return {
            strategy: partial.strategy || defaults.strategy,
            exercises: partial.exercises || defaults.exercises,
            schedule: partial.schedule || defaults.schedule,
            equipment: partial.equipment || defaults.equipment,
            intensity: partial.intensity || defaults.intensity,
            advice: partial.advice || defaults.advice,
            explanation: partial.explanation || "Based on your unique goal and body type combination.",
            sessionStyle: partial.sessionStyle || null
        };
    }
};

window.InferenceEngine = InferenceEngine;
