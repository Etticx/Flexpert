/**
 * Flexpert Main Application Controller
 * COORDINATES UI, State, Engine, and AI.
 */

const App = {
    // State
    state: {
        currentQuestionIndex: 0,
        userAnswers: {},
        isAnswering: false,
        recommendation: null
    },

    // Initialize
    init: function () {
        console.log("🚀 Flexpert Initializing...");

        // Define UI Elements (Cache them)
        this.ui = {
            questionCard: document.getElementById('questionCard'),
            resultCard: document.getElementById('resultCard'),
            questionText: document.getElementById('questionText'),
            optionsContainer: document.getElementById('optionsContainer'),
            progressBar: document.getElementById('progressBar'),
            progressText: document.getElementById('progressText'),
            backBtn: document.getElementById('backBtn'),
            restartBtn: document.getElementById('restartBtn'),
            actionButtons: document.getElementById('actionButtons'),
            submitBtn: document.getElementById('submitBtn'),
            resultContent: document.getElementById('resultContent'),
            downloadBtn: document.getElementById('downloadPdfBtn'), // Matches HTML ID we will add
            // Chat UI
            chatInput: document.getElementById('chatInput'),
            sendChatBtn: document.getElementById('sendChatBtn'),
            chatMessages: document.getElementById('chatMessages')
        };

        // Attach Event Listeners
        this.attachEvents();

        // Check for saved state (Persistence)
        this.loadState();

        // Render
        if (this.state.recommendation) {
            this.showResults(this.state.recommendation);
        } else {
            this.renderQuestion();
        }
    },

    attachEvents: function () {
        this.ui.backBtn.onclick = () => this.goBack();
        this.ui.restartBtn.onclick = () => this.restart();
        this.ui.submitBtn.onclick = () => this.submit();

        // PDF Download
        if (this.ui.downloadBtn) {
            this.ui.downloadBtn.onclick = () => this.generatePDF();
        }

        // Chat
        this.ui.sendChatBtn.onclick = () => this.sendChatMessage();
        this.ui.chatInput.onkeydown = (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        }
    },

    // --- State Management (Persistence) ---
    saveState: function () {
        localStorage.setItem('flexpert_state', JSON.stringify(this.state));
    },

    loadState: function () {
        const saved = localStorage.getItem('flexpert_state');
        if (saved) {
            try {
                this.state = JSON.parse(saved);
                console.log("💾 State loaded:", this.state);
            } catch (e) {
                console.error("State load error", e);
                localStorage.removeItem('flexpert_state');
            }
        }
    },

    restart: function () {
        this.state = {
            currentQuestionIndex: 0,
            userAnswers: {},
            isAnswering: false,
            recommendation: null
        };
        this.saveState();
        this.ui.resultCard.style.display = 'none';
        this.ui.questionCard.style.display = 'block';

        this.renderQuestion();
    },

    // --- Core Logic ---
    renderQuestion: function () {
        const question = window.knowledgeBase.questions[this.state.currentQuestionIndex];
        this.ui.questionText.textContent = question.text;
        this.ui.optionsContainer.innerHTML = '';

        // Update Progress
        const progress = ((this.state.currentQuestionIndex + 1) / window.knowledgeBase.questions.length) * 100;
        this.ui.progressBar.style.width = `${progress}%`;
        this.ui.progressText.innerHTML = `<i class="fas fa-clipboard-list"></i> Step ${this.state.currentQuestionIndex + 1} of ${window.knowledgeBase.questions.length}`;

        // Buttons logic
        this.ui.backBtn.style.display = this.state.currentQuestionIndex > 0 ? 'flex' : 'none';
        this.ui.actionButtons.style.display = (this.state.currentQuestionIndex === window.knowledgeBase.questions.length - 1) ? 'flex' : 'none';

        // Render Options
        if (question.type === 'choice') {
            question.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = opt.label;
                // Highlight if selected previously
                const currentAnswerKey = this.getAnswerKey(question.id);
                if (this.state.userAnswers[currentAnswerKey] === opt.value) {
                    btn.classList.add('selected');
                    btn.style.borderColor = 'var(--success-green)';
                    btn.style.color = 'var(--success-green)';
                }

                btn.onclick = () => this.handleAnswer(question, opt.value);
                this.ui.optionsContainer.appendChild(btn);
            });
        }
        this.state.isAnswering = false;
    },

    handleAnswer: function (question, value) {
        if (this.state.isAnswering && this.state.currentQuestionIndex < window.knowledgeBase.questions.length - 1) return;
        this.state.isAnswering = true;

        // Save Answer
        const key = this.getAnswerKey(question.id);
        this.state.userAnswers[key] = value;
        this.saveState();

        // Auto Advance (if not last)
        if (this.state.currentQuestionIndex < window.knowledgeBase.questions.length - 1) {
            this.animateTransition(() => {
                this.state.currentQuestionIndex++;
                this.renderQuestion();
            });
        } else {
            // Last question, just update UI to show selection
            this.renderQuestion(); // Re-render to show selection state
            this.state.isAnswering = false;
        }
    },

    submit: function () {
        const lastQ = window.knowledgeBase.questions[this.state.currentQuestionIndex];
        const key = this.getAnswerKey(lastQ.id);

        if (!this.state.userAnswers[key]) {
            alert("Please select an option!");
            return;
        }

        // Run Engine
        const result = window.InferenceEngine.run(this.state.userAnswers);
        this.state.recommendation = result;
        this.saveState();
        this.showResults(result);
    },

    goBack: function () {
        if (this.state.currentQuestionIndex > 0) {
            this.animateTransition(() => {
                this.state.currentQuestionIndex--;
                this.renderQuestion();
            });
        }
    },

    animateTransition: function (callback) {
        this.ui.questionCard.classList.add('fade-out');
        setTimeout(() => {
            callback();
            this.ui.questionCard.classList.remove('fade-out');
            this.saveState();
        }, 300);
    },

    getAnswerKey: function (id) {
        const map = { 1: 'goal', 2: 'body_type', 3: 'days', 4: 'limitations', 5: 'environment', 6: 'intensity', 7: 'duration' };
        return map[id] || `q${id}`;
    },

    // --- Results & Chat ---
    showResults: function (plan) {
        this.ui.questionCard.style.display = 'none';
        this.ui.resultCard.style.display = 'block';

        // Update Progress to 100% (Completed)
        this.ui.progressBar.style.width = '100%';
        this.ui.progressText.innerHTML = '<i class="fas fa-check-circle"></i> Completed';

        // Render HTML
        this.ui.resultContent.innerHTML = `
            <div class="result-section strategy">
                <h3><i class="fas fa-bullseye"></i> Strategy</h3>
                <p class="highlight">${plan.strategy}</p>
            </div>

            <div class="result-section">
                <h3><i class="fas fa-dumbbell"></i> Exercises</h3>
                <ul>${plan.exercises.map(e => `<li><i class="fas fa-check-circle"></i> ${e}</li>`).join('')}</ul>
            </div>

            <div class="result-section">
                <h3><i class="fas fa-calendar-alt"></i> Schedule</h3>
                <p><strong>${plan.schedule}</strong></p>
                ${plan.sessionStyle ? `<p class="sub-text">${plan.sessionStyle}</p>` : ''}
            </div>

             <div class="result-section">
                <h3><i class="fas fa-tools"></i> Equipment</h3>
                <div class="tags">${plan.equipment.map(e => `<span class="tag">${e}</span>`).join('')}</div>
            </div>
            <div class="result-section">
                <h3><i class="fas fa-brain"></i> Expert Reasoning</h3>
                <p>${plan.explanation || "Based on your unique goal and body type combination."}</p>
            </div>

             <div class="result-section intensity">
                <h3><i class="fas fa-fire"></i> Intensity</h3>
                <p>${plan.intensity}</p>
                 <div class="advice-box">
                    <strong><i class="fas fa-user-md"></i> Expert Advice:</strong>
                    <p>${plan.advice}</p>
                </div>
            </div>
        `;

        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Chat Welcome
        if (this.ui.chatMessages.children.length === 0) {
            this.addChatMessage('ai', "I've analyzed your profile and built this plan! Questions? Ask away.");
        }
    },

    sendChatMessage: async function () {
        const msg = this.ui.chatInput.value.trim();
        if (!msg) return;

        this.addChatMessage('user', msg);
        this.ui.chatInput.value = '';
        this.ui.sendChatBtn.disabled = true;
        this.ui.sendChatBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        try {
            const response = await window.AIService.chat(msg, this.state.recommendation);
            this.addChatMessage('ai', response);
        } catch (e) {
            this.addChatMessage('ai', "Error connecting to AI.");
        } finally {
            this.ui.sendChatBtn.disabled = false;
            this.ui.sendChatBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send';
        }
    },

    addChatMessage: function (sender, text) {
        const div = document.createElement('div');
        div.className = `chat-message ${sender}`;
        div.innerHTML = `
            <div class="msg-content">
                <i class="fas ${sender === 'ai' ? 'fa-robot' : 'fa-user'}"></i>
                <span>${text}</span>
            </div>
        `;
        this.ui.chatMessages.appendChild(div);
        this.ui.chatMessages.scrollTop = this.ui.chatMessages.scrollHeight;
    },

    // --- PDF Generation ---
    generatePDF: function () {
        const plan = this.state.recommendation;
        if (!plan) return;

        this.ui.downloadBtn.disabled = true;
        this.ui.downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

        // 1. Populate Template
        document.getElementById('pdfStrategy').textContent = plan.strategy;

        const exList = document.getElementById('pdfExercises');
        exList.innerHTML = plan.exercises.map(e => `<li>✓ ${e}</li>`).join('');

        document.getElementById('pdfSchedule').textContent = plan.schedule;
        document.getElementById('pdfSession').textContent = plan.sessionStyle || '';
        document.getElementById('pdfIntensity').textContent = plan.intensity;
        document.getElementById('pdfEquipment').textContent = plan.equipment.join(', ');
        document.getElementById('pdfAdvice').textContent = plan.advice;

        // 2. Configure Options
        // We use the 'element' itself
        const element = document.getElementById('pdfTemplate');
        element.style.display = 'block'; // Show temporarily needed for html2pdf to "see" it

        const opt = {
            margin: 0,
            filename: 'Flexpert_Workout_Plan.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // 3. Generate
        // Reverted to simpler direct method but keeping a small delay to ensure rendering matches
        setTimeout(() => {
            html2pdf().from(element).set(opt).save().then(() => {
                element.style.display = 'none'; // Hide again
                this.ui.downloadBtn.disabled = false;
                this.ui.downloadBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Download PDF';
            }).catch(err => {
                console.error("PDF Error:", err);
                element.style.display = 'none';
                this.ui.downloadBtn.disabled = false;
                this.ui.downloadBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Retry PDF';
            });
        }, 100);
    }
};

export { App };
