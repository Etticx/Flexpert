/**
 * Flexpert Inference Engine
 * Forward-chaining rule engine to determine the best workout plan.
 */

const InferenceEngine = {
    // Run the engine based on user answers
    run: function (userAnswers) {
        console.log("⚙️ Running Inference Engine with:", userAnswers);

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
                Object.assign(recommendation, rule.overrides);
                break;
            }
        }

        // PRIORITY 2: Strategy Rules
        for (const rule of window.knowledgeBase.strategyRules) {
            if (this.matchesConditions(rule.conditions, userAnswers)) {
                if (!recommendation.strategy) {
                    recommendation.strategy = rule.strategy;
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
        for (const rule of window.knowledgeBase.scheduleRules) {
            if (this.matchesConditions(rule.conditions, userAnswers)) {
                if (rule.schedule) {
                    recommendation.schedule = rule.schedule;
                }
                if (rule.sessionStyle) {
                    recommendation.sessionStyle = rule.sessionStyle;
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

        // Fill in any missing fields with defaults
        let finalRec = this.buildRecommendation(recommendation);

        // --- POST-INFERENCE FILTERING (CRITICAL LOGIC FIX) ---
        // Ensure exercises match available equipment
        finalRec.exercises = this.filterExercisesByEquipment(finalRec.exercises, finalRec.equipment);

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
            sessionStyle: partial.sessionStyle || null
        };
    }
};

window.InferenceEngine = InferenceEngine;
