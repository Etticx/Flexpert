/**
 * Flexpert - Main Entry Point
 * Vite bundles this file and all its imports into the final build.
 * Import order matters: data → engine → api → app
 */

import { knowledgeBase } from './data.js';
import { InferenceEngine } from './engine.js';
import AIService from './api.js';
import { App } from './app.js';

// Attach to window so inline HTML event handlers can reach them if needed
window.knowledgeBase = knowledgeBase;
window.InferenceEngine = InferenceEngine;
window.AIService = AIService;

// Boot
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
