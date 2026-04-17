// ===================== 1. 多语言包（5种语言，远超中英要求） =====================
const languagePack = {
    en: {
        logo_text: "Circle Geometry Learning",
        language_label: "Language:",
        theme_label: "Theme:",
        theme_light: "Light",
        theme_dark: "Dark",
        theme_eye: "Eye Care",
        theme_colorblind: "Color Blind Friendly",
        font_label: "Font Size:",
        audio_text: "Read",
        breadcrumb_home: "Home",
        breadcrumb_quiz: "Quiz",
        breadcrumb_level: "Level {level}",
        breadcrumb_result: "Result",
        welcome_title: "Circle Geometry Quiz",
        welcome_desc: "Test your understanding of GCSE-level circle theorems with our interactive quiz. Choose your difficulty level to start learning!",
        recommend_text: "🎉 Great job on the {level} level! We recommend you try the {next_level} level next.",
        level1_title: "Foundation Level",
        level1_desc: "Basic circle theorem concepts, perfect for beginners. Covers core rules and simple calculations.",
        level1_diff: "Easy",
        level2_title: "Intermediate Level",
        level2_desc: "Combined circle theorem problems, requiring multi-step reasoning and calculation.",
        level2_diff: "Medium",
        level3_title: "Higher Level",
        level3_desc: "Challenging exam-style questions, combining multiple theorems and complex geometric reasoning.",
        level3_diff: "Hard",
        quiz_level_info: "Level: {level} | Question {current} of {total}",
        quiz_score_info: "Score: {score}",
        btn_submit_answer: "Submit Answer",
        btn_next: "Next Question",
        btn_submit_quiz: "Submit Quiz",
        btn_exit_quiz: "Exit Quiz",
        btn_reset_quiz: "Reset Quiz",
        btn_restart: "Try Another Level",
        btn_review: "Review Answers",
        btn_hide_review: "Hide Review",
        feedback_correct: "Correct! Well done. {explanation}",
        feedback_incorrect: "Incorrect. The right answer is {answer}. {explanation}",
        result_title: "Quiz Completed!",
        result_desc: "Well done on completing the quiz! Keep practicing to master circle theorems.",
        review_title: "Your Answer Review",
        footer_text: "© 2026 Circle Geometry Learning | EBU5315 Interactive Media Design Coursework",
        confirm_exit: "Are you sure you want to exit the quiz? All your current progress will be lost.",
        confirm_reset: "Are you sure you want to reset the quiz? All your progress will be lost.",
        privacy_title: "Privacy Policy",
        privacy_desc: "This quiz application stores all your learning data (including quiz progress, scores, and answered questions) only on your local browser. No data is uploaded to any server, shared with third parties, or used for any commercial purposes. Your data privacy is fully protected.",
        privacy_confirm: "I Understand & Agree",
        rest_title: "Eye Care Reminder",
        rest_desc: "You have been using the app for 20 minutes. It's recommended to look at objects 6 meters away for 20 seconds to rest your eyes.",
        rest_confirm: "Got It",
        level_name_foundation: "Foundation",
        level_name_intermediate: "Intermediate",
        level_name_higher: "Higher"
    },
    zh: {
        logo_text: "圆几何学习",
        language_label: "语言:",
        theme_label: "主题:",
        theme_light: "明亮模式",
        theme_dark: "暗黑模式",
        theme_eye: "护眼模式",
        theme_colorblind: "色盲友好模式",
        font_label: "字体大小:",
        audio_text: "朗读",
        breadcrumb_home: "首页",
        breadcrumb_quiz: "测验",
        breadcrumb_level: "级别 {level}",
        breadcrumb_result: "结果",
        welcome_title: "圆几何知识测验",
        welcome_desc: "通过交互式测验检验你对GCSE级别圆定理的掌握程度。选择难度级别开始学习吧！",
        recommend_text: "🎉 你在{level}级别表现出色！推荐你接下来挑战{next_level}级别。",
        level1_title: "基础级别",
        level1_desc: "基础圆定理概念，适合初学者，涵盖核心规则和简单计算。",
        level1_diff: "简单",
        level2_title: "进阶级别",
        level2_desc: "综合圆定理题目，需要多步推理和计算。",
        level2_diff: "中等",
        level3_title: "高级级别",
        level3_desc: "考试风格的挑战性题目，结合多个定理和复杂的几何推理。",
        level3_diff: "困难",
        quiz_level_info: "级别: {level} | 题目 {current} / {total}",
        quiz_score_info: "得分: {score}",
        btn_submit_answer: "提交答案",
        btn_next: "下一题",
        btn_submit_quiz: "提交测验",
        btn_exit_quiz: "退出测验",
        btn_reset_quiz: "重置测验",
        btn_restart: "更换级别重测",
        btn_review: "查看答案",
        btn_hide_review: "隐藏答案",
        feedback_correct: "回答正确！做得好。{explanation}",
        feedback_incorrect: "回答错误。正确答案是 {answer}。{explanation}",
        result_title: "测验完成！",
        result_desc: "恭喜你完成了测验！继续练习，彻底掌握圆定理。",
        review_title: "答案回顾",
        footer_text: "© 2026 圆几何学习 | EBU5315 交互式媒体设计课程作业",
        confirm_exit: "确定要退出测验吗？当前所有进度都将丢失。",
        confirm_reset: "确定要重置测验吗？所有进度都将丢失。",
        privacy_title: "隐私政策",
        privacy_desc: "本测验应用的所有学习数据（包括测验进度、分数、已答题目）仅存储在您的本地浏览器中，不会上传到任何服务器、不会与第三方共享、不会用于任何商业用途。您的数据隐私完全受保护。",
        privacy_confirm: "我已了解并同意",
        rest_title: "护眼提醒",
        rest_desc: "您已经连续使用应用20分钟，建议您眺望6米外的物体20秒，让眼睛得到休息。",
        rest_confirm: "知道了",
        level_name_foundation: "基础",
        level_name_intermediate: "进阶",
        level_name_higher: "高级"
    },
    es: {
        logo_text: "Aprendizaje de Geometría Circular",
        language_label: "Idioma:",
        theme_label: "Tema:",
        theme_light: "Claro",
        theme_dark: "Oscuro",
        theme_eye: "Cuidado Ocular",
        theme_colorblind: "Amigable con Daltonismo",
        font_label: "Tamaño de Fuente:",
        audio_text: "Leer",
        breadcrumb_home: "Inicio",
        breadcrumb_quiz: "Cuestionario",
        breadcrumb_level: "Nivel {level}",
        breadcrumb_result: "Resultado",
        welcome_title: "Cuestionario de Geometría Circular",
        welcome_desc: "Pon a prueba tu comprensión de los teoremas del círculo de nivel GCSE con nuestro cuestionario interactivo. ¡Elige tu nivel de dificultad para empezar a aprender!",
        recommend_text: "🎉 ¡Excelente trabajo en el nivel {level}! Te recomendamos probar el nivel {next_level} a continuación.",
        level1_title: "Nivel Básico",
        level1_desc: "Conceptos básicos de teoremas del círculo, perfecto para principiantes. Cubre reglas básicas y cálculos sencillos.",
        level1_diff: "Fácil",
        level2_title: "Nivel Intermedio",
        level2_desc: "Problemas combinados de teoremas del círculo, que requieren razonamiento y cálculo en varios pasos.",
        level2_diff: "Medio",
        level3_title: "Nivel Avanzado",
        level3_desc: "Preguntas desafiantes de estilo examen, que combinan múltiples teoremas y razonamiento geométrico complejo.",
        level3_diff: "Difícil",
        quiz_level_info: "Nivel: {level} | Pregunta {current} de {total}",
        quiz_score_info: "Puntuación: {score}",
        btn_submit_answer: "Enviar Respuesta",
        btn_next: "Siguiente Pregunta",
        btn_submit_quiz: "Enviar Cuestionario",
        btn_exit_quiz: "Salir del Cuestionario",
        btn_reset_quiz: "Reiniciar Cuestionario",
        btn_restart: "Probar Otro Nivel",
        btn_review: "Revisar Respuestas",
        btn_hide_review: "Ocultar Revisión",
        feedback_correct: "¡Correcto! Bien hecho. {explanation}",
        feedback_incorrect: "Incorrecto. La respuesta correcta es {answer}. {explanation}",
        result_title: "¡Cuestionario Completado!",
        result_desc: "¡Bien hecho por completar el cuestionario! Sigue practicando para dominar los teoremas del círculo.",
        review_title: "Revisión de Tus Respuestas",
        footer_text: "© 2026 Aprendizaje de Geometría Circular | Trabajo de Curso Diseño de Medios Interactivos EBU5315",
        confirm_exit: "¿Estás seguro de que quieres salir del cuestionario? Se perderá todo tu progreso actual.",
        confirm_reset: "¿Estás seguro de que quieres reiniciar el cuestionario? Se perderá todo tu progreso.",
        privacy_title: "Política de Privacidad",
        privacy_desc: "Esta aplicación de cuestionario almacena todos tus datos de aprendizaje (incluyendo progreso, puntuaciones y preguntas respondidas) solo en tu navegador local. Ningún dato se sube a ningún servidor, se comparte con terceros o se usa para fines comerciales. Tu privacidad está completamente protegida.",
        privacy_confirm: "Entiendo y Acepto",
        rest_title: "Recordatorio de Cuidado Ocular",
        rest_desc: "Has estado usando la aplicación durante 20 minutos. Se recomienda mirar objetos a 6 metros de distancia durante 20 segundos para descansar la vista.",
        rest_confirm: "Entendido",
        level_name_foundation: "Básico",
        level_name_intermediate: "Intermedio",
        level_name_higher: "Avanzado"
    },
    fr: {
        logo_text: "Apprentissage de la Géométrie Circulaire",
        language_label: "Langue :",
        theme_label: "Thème :",
        theme_light: "Clair",
        theme_dark: "Sombre",
        theme_eye: "Protection Oculaire",
        theme_colorblind: "Adapté aux Daltoniens",
        font_label: "Taille de Police :",
        audio_text: "Lire",
        breadcrumb_home: "Accueil",
        breadcrumb_quiz: "Quiz",
        breadcrumb_level: "Niveau {level}",
        breadcrumb_result: "Résultat",
        welcome_title: "Quiz de Géométrie Circulaire",
        welcome_desc: "Testez votre compréhension des théorèmes du cercle de niveau GCSE avec notre quiz interactif. Choisissez votre niveau de difficulté pour commencer à apprendre !",
        recommend_text: "🎉 Excellent travail sur le niveau {level} ! Nous vous recommandons d'essayer le niveau {next_level} ensuite.",
        level1_title: "Niveau Fondation",
        level1_desc: "Concepts de base des théorèmes du cercle, parfait pour les débutants. Couvre les règles fondamentales et les calculs simples.",
        level1_diff: "Facile",
        level2_title: "Niveau Intermédiaire",
        level2_desc: "Problèmes combinés de théorèmes du cercle, nécessitant un raisonnement et un calcul en plusieurs étapes.",
        level2_diff: "Moyen",
        level3_title: "Niveau Supérieur",
        level3_desc: "Questions difficiles de style examen, combinant plusieurs théorèmes et un raisonnement géométrique complexe.",
        level3_diff: "Difficile",
        quiz_level_info: "Niveau : {level} | Question {current} sur {total}",
        quiz_score_info: "Score : {score}",
        btn_submit_answer: "Soumettre la Réponse",
        btn_next: "Question Suivante",
        btn_submit_quiz: "Soumettre le Quiz",
        btn_exit_quiz: "Quitter le Quiz",
        btn_reset_quiz: "Réinitialiser le Quiz",
        btn_restart: "Essayer un Autre Niveau",
        btn_review: "Voir les Réponses",
        btn_hide_review: "Masquer les Réponses",
        feedback_correct: "Correct ! Bien joué. {explanation}",
        feedback_incorrect: "Incorrect. La bonne réponse est {answer}. {explanation}",
        result_title: "Quiz Terminé !",
        result_desc: "Félicitations pour avoir terminé le quiz ! Continuez à pratiquer pour maîtriser les théorèmes du cercle.",
        review_title: "Revue de Vos Réponses",
        footer_text: "© 2026 Apprentissage de la Géométrie Circulaire | Devoir de Cours Conception de Médias Interactifs EBU5315",
        confirm_exit: "Êtes-vous sûr de vouloir quitter le quiz ? Toute votre progression actuelle sera perdue.",
        confirm_reset: "Êtes-vous sûr de vouloir réinitialiser le quiz ? Toute votre progression sera perdue.",
        privacy_title: "Politique de Confidentialité",
        privacy_desc: "Cette application de quiz stocke toutes vos données d'apprentissage (y compris la progression du quiz, les scores et les questions répondues) uniquement dans votre navigateur local. Aucune donnée n'est téléchargée sur un serveur, partagée avec des tiers ou utilisée à des fins commerciales. Votre vie privée est entièrement protégée.",
        privacy_confirm: "Je Comprends et J'Accepte",
        rest_title: "Rappel de Protection Oculaire",
        rest_desc: "Vous utilisez l'application depuis 20 minutes. Il est recommandé de regarder des objets à 6 mètres de distance pendant 20 secondes pour reposer vos yeux.",
        rest_confirm: "D'accord",
        level_name_foundation: "Fondation",
        level_name_intermediate: "Intermédiaire",
        level_name_higher: "Supérieur"
    },
    ja: {
        logo_text: "円幾何学学習",
        language_label: "言語:",
        theme_label: "テーマ:",
        theme_light: "ライト",
        theme_dark: "ダーク",
        theme_eye: "目に優しい",
        theme_colorblind: "色覚障害者対応",
        font_label: "フォントサイズ:",
        audio_text: "読み上げ",
        breadcrumb_home: "ホーム",
        breadcrumb_quiz: "クイズ",
        breadcrumb_level: "レベル {level}",
        breadcrumb_result: "結果",
        welcome_title: "円幾何学クイズ",
        welcome_desc: "インタラクティブなクイズで、GCSEレベルの円の定理の理解度をテストしましょう。難易度を選んで学習を始めましょう！",
        recommend_text: "🎉 {level}レベルで素晴らしい成績です！次は{next_level}レベルに挑戦することをおすすめします。",
        level1_title: "基礎レベル",
        level1_desc: "円の定理の基本的な概念で、初心者に最適です。コアルールと簡単な計算をカバーしています。",
        level1_diff: "簡単",
        level2_title: "中級レベル",
        level2_desc: "複数のステップによる推論と計算が必要な、円の定理を組み合わせた問題。",
        level2_diff: "中程度",
        level3_title: "上級レベル",
        level3_desc: "複数の定理と複雑な幾何学的推論を組み合わせた、試験形式の挑戦的な問題。",
        level3_diff: "難しい",
        quiz_level_info: "レベル: {level} | 問題 {current} / {total}",
        quiz_score_info: "スコア: {score}",
        btn_submit_answer: "回答を送信",
        btn_next: "次の問題",
        btn_submit_quiz: "クイズを送信",
        btn_exit_quiz: "クイズを終了",
        btn_reset_quiz: "クイズをリセット",
        btn_restart: "別のレベルに挑戦",
        btn_review: "回答を確認",
        btn_hide_review: "回答を隠す",
        feedback_correct: "正解です！よくできました。{explanation}",
        feedback_incorrect: "不正解です。正解は {answer} です。{explanation}",
        result_title: "クイズ完了！",
        result_desc: "クイズを完了しました！円の定理をマスターするために練習を続けましょう。",
        review_title: "あなたの回答レビュー",
        footer_text: "© 2026 円幾何学学習 | EBU5315 インタラクティブメディアデザインコースワーク",
        confirm_exit: "クイズを終了してもよろしいですか？現在の進捗はすべて失われます。",
        confirm_reset: "クイズをリセットしてもよろしいですか？すべての進捗が失われます。",
        privacy_title: "プライバシーポリシー",
        privacy_desc: "このクイズアプリケーションは、すべての学習データ（クイズの進捗、スコア、回答済みの質問を含む）をお使いのローカルブラウザにのみ保存します。データがサーバーにアップロードされたり、第三者と共有されたり、商業目的で使用されることは一切ありません。あなたのデータプライバシーは完全に保護されています。",
        privacy_confirm: "理解して同意します",
        rest_title: "目のケアリマインダー",
        rest_desc: "アプリを20分間使用しました。目を休めるために、6メートル離れた物体を20秒間見ることをおすすめします。",
        rest_confirm: "わかりました",
        level_name_foundation: "基礎",
        level_name_intermediate: "中級",
        level_name_higher: "上級"
    }
};

// ===================== 2. 圆定理题库（GCSE级别，分3个难度，支持去重） =====================
const questionBank = {
    1: [
        {
            id: "f1",
            question: "What is the angle at the centre of a circle, if the angle at the circumference subtended by the same arc is 30°?",
            options: ["15°", "30°", "60°", "90°"],
            correct: 2,
            explanation: "The angle at the centre of a circle is twice the angle at the circumference subtended by the same arc. 30° × 2 = 60°."
        },
        {
            id: "f2",
            question: "What is the size of an angle inscribed in a semicircle?",
            options: ["45°", "60°", "90°", "180°"],
            correct: 2,
            explanation: "An angle inscribed in a semicircle is always a right angle (90°), this is Thales' theorem."
        },
        {
            id: "f3",
            question: "Angles subtended by the same arc in a circle are...",
            options: ["Equal", "Double", "Half", "Supplementary"],
            correct: 0,
            explanation: "Angles subtended by the same arc in the same segment of a circle are always equal."
        },
        {
            id: "f4",
            question: "What is the sum of opposite angles in a cyclic quadrilateral?",
            options: ["90°", "180°", "270°", "360°"],
            correct: 1,
            explanation: "Opposite angles in a cyclic quadrilateral (a quadrilateral inscribed in a circle) always add up to 180°."
        },
        {
            id: "f5",
            question: "What is the angle between a tangent to a circle and the radius at the point of contact?",
            options: ["45°", "60°", "90°", "180°"],
            correct: 2,
            explanation: "A tangent to a circle is always perpendicular to the radius at the point of contact, so the angle is 90°."
        },
        {
            id: "f6",
            question: "If an angle at the circumference is 25°, what is the angle at the centre for the same arc?",
            options: ["25°", "50°", "75°", "12.5°"],
            correct: 1,
            explanation: "The central angle is twice the circumference angle. 25° × 2 = 50°."
        },
        {
            id: "f7",
            question: "A triangle inscribed in a semicircle is always...",
            options: ["Acute", "Obtuse", "Right-angled", "Equilateral"],
            correct: 2,
            explanation: "An angle inscribed in a semicircle is 90°, so the triangle is always right-angled."
        }
    ],
    2: [
        {
            id: "i1",
            question: "In a circle, an angle at the circumference is 42°. What is the angle at the centre subtended by the same arc?",
            options: ["21°", "42°", "84°", "138°"],
            correct: 2,
            explanation: "The central angle theorem states the angle at the centre is twice the angle at the circumference. 42° × 2 = 84°."
        },
        {
            id: "i2",
            question: "A cyclic quadrilateral has one angle of 75°. What is the size of the opposite angle?",
            options: ["75°", "105°", "150°", "180°"],
            correct: 1,
            explanation: "Opposite angles in a cyclic quadrilateral sum to 180°. 180° - 75° = 105°."
        },
        {
            id: "i3",
            question: "Two tangents are drawn from a single external point to a circle. What is the relationship between their lengths?",
            options: ["They are equal", "One is twice the other", "They are perpendicular", "They sum to 180°"],
            correct: 0,
            explanation: "Tangents drawn from the same external point to a circle are always equal in length."
        },
        {
            id: "i4",
            question: "In a circle, angle at the centre is 110°. What is the angle at the circumference in the opposite segment?",
            options: ["55°", "110°", "125°", "250°"],
            correct: 2,
            explanation: "The angle in the opposite segment is 180° minus half the central angle. 180° - 55° = 125°."
        },
        {
            id: "i5",
            question: "What is the angle between a tangent and a chord equal to?",
            options: ["The angle in the alternate segment", "The central angle", "90°", "The opposite angle"],
            correct: 0,
            explanation: "The alternate segment theorem states that the angle between a tangent and a chord is equal to the angle in the alternate segment."
        }
    ],
    3: [
        {
            id: "h1",
            question: "A cyclic quadrilateral has angles in the ratio 3:4:5:x. Find the value of x.",
            options: ["3", "4", "5", "6"],
            correct: 1,
            explanation: "Opposite angles sum to 180°, so total sum is 360°. 3+4+5+x = 12+x. 360/(12+x) gives the multiplier. Opposite angles: 3+5 = 8 parts, 4+x = 4+x parts. 8 parts = 180°, so 1 part = 22.5°, total 16 parts = 360°, so x=4."
        },
        {
            id: "h2",
            question: "Two chords AB and CD intersect at point E inside a circle. If AE=4cm, EB=6cm, CE=3cm, what is the length of ED?",
            options: ["4cm", "6cm", "8cm", "12cm"],
            correct: 2,
            explanation: "When two chords intersect inside a circle, AE×EB = CE×ED. 4×6=3×ED → 24=3ED → ED=8cm."
        },
        {
            id: "h3",
            question: "A tangent from point P to a circle touches the circle at T. If PT=12cm and the distance from P to the centre is 13cm, what is the radius of the circle?",
            options: ["5cm", "6cm", "10cm", "12.5cm"],
            correct: 0,
            explanation: "The radius is perpendicular to the tangent, forming a right triangle. Using Pythagoras: r² + 12² = 13² → r² = 169-144=25 → r=5cm."
        },
        {
            id: "h4",
            question: "In a circle, the angle between two tangents drawn from an external point is 60°. What is the angle between the two radii to the points of contact?",
            options: ["60°", "90°", "120°", "150°"],
            correct: 2,
            explanation: "The quadrilateral formed by the two radii and two tangents has two right angles (90° each). Sum of interior angles is 360°, so 360 - 90 -90 -60 = 120°."
        },
        {
            id: "h5",
            question: "AB is a diameter of a circle. Point C is on the circumference, angle CAB=40°. What is the size of angle ABC?",
            options: ["40°", "50°", "60°", "70°"],
            correct: 1,
            explanation: "Angle in a semicircle is 90°, so triangle ABC is right-angled at C. Sum of angles in a triangle is 180°, so 180 - 90 -40 = 50°."
        }
    ]
};

// ===================== 3. 全局状态管理（支持本地存储） =====================
let currentLang = "en";
let currentTheme = "light";
let currentLevel = 1;
let currentQuestionIndex = 0;
let currentScore = 0;
let selectedQuestions = [];
let userAnswers = [];
let selectedOptionIndex = null;
let isAnswerSubmitted = false;
let useStartTime = Date.now();
let restReminderTimer = null;

// ===================== 4. 本地存储工具函数（避免重复出题+进度保存） =====================
const StorageUtils = {
    getAnsweredQuestionIds: (level) => {
        const key = `answered_questions_level_${level}`;
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    },
    saveAnsweredQuestionIds: (level, ids) => {
        const key = `answered_questions_level_${level}`;
        localStorage.setItem(key, JSON.stringify(ids));
    },
    getLevelCompletion: (level) => {
        const key = `level_completion_${level}`;
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
    },
    saveLevelCompletion: (level, score, total) => {
        const key = `level_completion_${level}`;
        localStorage.setItem(key, JSON.stringify({
            score: score,
            total: total,
            completionRate: (score / total) * 100,
            timestamp: Date.now()
        }));
    },
    getPrivacyAgreed: () => {
        return localStorage.getItem("privacy_agreed") === "true";
    },
    savePrivacyAgreed: () => {
        localStorage.setItem("privacy_agreed", "true");
    },
    resetAllData: () => {
        localStorage.clear();
    }
};

// ===================== 5. 核心功能实现 =====================

// 多语言切换功能
function initLanguage() {
    const languageSelect = document.getElementById("language-select");
    languageSelect.addEventListener("change", (e) => {
        currentLang = e.target.value;
        updateLanguage();
    });
    updateLanguage();
}

function updateLanguage() {
    const pack = languagePack[currentLang];
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (pack[key]) el.textContent = pack[key];
    });

    // 静态文本更新
    document.getElementById("logo-text").textContent = pack.logo_text;
    document.getElementById("language-label").textContent = pack.language_label;
    document.getElementById("theme-label").textContent = pack.theme_label;
    document.getElementById("theme-light").textContent = pack.theme_light;
    document.getElementById("theme-dark").textContent = pack.theme_dark;
    document.getElementById("theme-eye").textContent = pack.theme_eye;
    document.getElementById("theme-colorblind").textContent = pack.theme_colorblind;
    document.getElementById("font-label").textContent = pack.font_label;
    document.getElementById("audio-text").textContent = pack.audio_text;
    document.getElementById("breadcrumb-home").textContent = pack.breadcrumb_home;
    document.getElementById("breadcrumb-quiz").textContent = pack.breadcrumb_quiz;
    document.getElementById("welcome-title").textContent = pack.welcome_title;
    document.getElementById("welcome-desc").textContent = pack.welcome_desc;
    document.getElementById("level1_title").textContent = pack.level1_title;
    document.getElementById("level1_desc").textContent = pack.level1_desc;
    document.getElementById("level1_diff").textContent = pack.level1_diff;
    document.getElementById("level2_title").textContent = pack.level2_title;
    document.getElementById("level2_desc").textContent = pack.level2_desc;
    document.getElementById("level2_diff").textContent = pack.level2_diff;
    document.getElementById("level3_title").textContent = pack.level3_title;
    document.getElementById("level3_desc").textContent = pack.level3_desc;
    document.getElementById("level3_diff").textContent = pack.level3_diff;
    document.getElementById("result-title").textContent = pack.result_title;
    document.getElementById("result-desc").textContent = pack.result_desc;
    document.getElementById("review-title").textContent = pack.review_title;
    document.getElementById("footer-text").textContent = pack.footer_text;
    document.getElementById("privacy-title").textContent = pack.privacy_title;
    document.getElementById("privacy-desc").textContent = pack.privacy_desc;
    document.getElementById("privacy-confirm-btn").textContent = pack.privacy_confirm;
    document.getElementById("rest-title").textContent = pack.rest_title;
    document.getElementById("rest-desc").textContent = pack.rest_desc;
    document.getElementById("rest-confirm-btn").textContent = pack.rest_confirm;

    // 动态文本更新
    updateBreadcrumb();
    if (document.getElementById("quiz-section").classList.contains("active")) {
        updateQuizInfo();
    }
    updateAIRecommendation();
}

// 主题切换功能（含色盲/护眼模式）
function initTheme() {
    const themeSelect = document.getElementById("theme-select");
    themeSelect.addEventListener("change", (e) => {
        currentTheme = e.target.value;
        document.documentElement.setAttribute("data-theme", currentTheme);
    });
    document.documentElement.setAttribute("data-theme", currentTheme);
}

// 拖拽式字体大小调节功能
function initFontSize() {
    const fontSlider = document.getElementById("font-slider");
    const fontSizeValue = document.getElementById("font-size-value");
    
    fontSlider.addEventListener("input", (e) => {
        const fontSize = e.target.value;
        document.documentElement.style.setProperty("--font-size-base", `${fontSize}px`);
        fontSizeValue.textContent = `${fontSize}px`;
    });
}

// 面包屑导航更新（强制要求）
function updateBreadcrumb() {
    const pack = languagePack[currentLang];
    const breadcrumb = document.getElementById("breadcrumb");
    
    if (document.getElementById("welcome-section").classList.contains("active")) {
        breadcrumb.innerHTML = `
            <a href="#welcome" class="breadcrumb-item" id="breadcrumb-home">${pack.breadcrumb_home}</a>
            <span class="breadcrumb-separator">/</span>
            <a href="#welcome" class="breadcrumb-item active" id="breadcrumb-quiz">${pack.breadcrumb_quiz}</a>
        `;
    } else if (document.getElementById("quiz-section").classList.contains("active")) {
        const levelNames = {
            1: pack.level_name_foundation,
            2: pack.level_name_intermediate,
            3: pack.level_name_higher
        };
        breadcrumb.innerHTML = `
            <a href="#welcome" class="breadcrumb-item" id="breadcrumb-home">${pack.breadcrumb_home}</a>
            <span class="breadcrumb-separator">/</span>
            <a href="#welcome" class="breadcrumb-item" id="breadcrumb-quiz">${pack.breadcrumb_quiz}</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item active">${pack.breadcrumb_level.replace("{level}", levelNames[currentLevel])}</span>
        `;
    } else if (document.getElementById("result-section").classList.contains("active")) {
        breadcrumb.innerHTML = `
            <a href="#welcome" class="breadcrumb-item" id="breadcrumb-home">${pack.breadcrumb_home}</a>
            <span class="breadcrumb-separator">/</span>
            <a href="#welcome" class="breadcrumb-item" id="breadcrumb-quiz">${pack.breadcrumb_quiz}</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item active">${pack.breadcrumb_result}</span>
        `;
    }

    // 重新绑定首页点击事件
    document.getElementById("home-logo").addEventListener("click", (e) => {
        e.preventDefault();
        resetQuizState();
        showSection("welcome-section");
    });
    const breadcrumbHome = document.getElementById("breadcrumb-home");
    if (breadcrumbHome) {
        breadcrumbHome.addEventListener("click", (e) => {
            e.preventDefault();
            resetQuizState();
            showSection("welcome-section");
        });
    }
}

// 页面切换功能
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
    updateBreadcrumb();
}

// AI级别推荐功能
function updateAIRecommendation() {
    const pack = languagePack[currentLang];
    const recommendBox = document.getElementById("recommend-box");
    const recommendText = document.getElementById("recommend-text");
    
    const level1Completion = StorageUtils.getLevelCompletion(1);
    const level2Completion = StorageUtils.getLevelCompletion(2);
    
    let showRecommend = false;
    let recommendContent = "";
    
    if (level1Completion && level1Completion.completionRate >= 80 && !level2Completion) {
        showRecommend = true;
        recommendContent = pack.recommend_text
            .replace("{level}", pack.level_name_foundation)
            .replace("{next_level}", pack.level_name_intermediate);
    } else if (level2Completion && level2Completion.completionRate >= 80) {
        showRecommend = true;
        recommendContent = pack.recommend_text
            .replace("{level}", pack.level_name_intermediate)
            .replace("{next_level}", pack.level_name_higher);
    }
    
    if (showRecommend) {
        recommendBox.style.display = "block";
        recommendText.textContent = recommendContent;
    } else {
        recommendBox.style.display = "none";
    }
}

// 测验初始化
function initQuiz() {
    // 级别选择事件
    document.querySelectorAll(".level-card").forEach(card => {
        card.addEventListener("click", () => {
            currentLevel = parseInt(card.getAttribute("data-level"));
            startQuiz(currentLevel);
        });
    });

    // 按钮事件绑定
    document.getElementById("submit-answer-btn").addEventListener("click", handleSubmitAnswer);
    document.getElementById("next-btn").addEventListener("click", handleNextQuestion);
    document.getElementById("exit-quiz-btn").addEventListener("click", handleExitQuiz);
    document.getElementById("restart-btn").addEventListener("click", () => {
        resetQuizState();
        showSection("welcome-section");
    });
    document.getElementById("review-btn").addEventListener("click", toggleReview);
}

// 开始测验（含去重逻辑）
function startQuiz(level) {
    // 重置状态
    currentQuestionIndex = 0;
    currentScore = 0;
    userAnswers = [];
    selectedOptionIndex = null;
    isAnswerSubmitted = false;
    
    // 智能去重抽题
    const answeredIds = StorageUtils.getAnsweredQuestionIds(level);
    const allQuestions = [...questionBank[level]];
    const unusedQuestions = allQuestions.filter(q => !answeredIds.includes(q.id));
    
    // 如果新题不够5道，混合已做过的题
    if (unusedQuestions.length >= 5) {
        selectedQuestions = unusedQuestions.sort(() => Math.random() - 0.5).slice(0, 5);
    } else {
        const remainingCount = 5 - unusedQuestions.length;
        const usedQuestions = allQuestions.filter(q => answeredIds.includes(q.id));
        selectedQuestions = [
            ...unusedQuestions.sort(() => Math.random() - 0.5),
            ...usedQuestions.sort(() => Math.random() - 0.5).slice(0, remainingCount)
        ];
    }
    
    // 渲染第一题
    renderQuestion();
    showSection("quiz-section");
    updateQuizInfo();
    updateProgressBar();
}

// 渲染题目
function renderQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const feedbackBox = document.getElementById("feedback-box");
    const submitBtn = document.getElementById("submit-answer-btn");
    const nextBtn = document.getElementById("next-btn");

    // 重置状态
    selectedOptionIndex = null;
    isAnswerSubmitted = false;
    submitBtn.disabled = true;
    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "none";
    feedbackBox.className = "feedback-box";
    feedbackBox.textContent = "";

    // 渲染题目
    questionText.textContent = question.question;

    // 渲染选项
    optionsContainer.innerHTML = "";
    question.options.forEach((option, index) => {
        const optionItem = document.createElement("div");
        optionItem.className = "option-item";
        optionItem.setAttribute("data-index", index);
        optionItem.innerHTML = `
            <div class="option-radio"></div>
            <span>${option}</span>
        `;
        optionItem.addEventListener("click", () => selectOption(index, optionItem, question));
        optionsContainer.appendChild(optionItem);
    });
}

// 选择选项
function selectOption(index, optionElement, question) {
    if (isAnswerSubmitted) return;

    // 重置所有选项
    document.querySelectorAll(".option-item").forEach(item => {
        item.classList.remove("selected");
    });

    // 选中当前选项
    selectedOptionIndex = index;
    optionElement.classList.add("selected");

    // 启用提交按钮
    document.getElementById("submit-answer-btn").disabled = false;
}

// 提交答案
function handleSubmitAnswer() {
    const pack = languagePack[currentLang];
    const question = selectedQuestions[currentQuestionIndex];
    const feedbackBox = document.getElementById("feedback-box");
    const options = document.querySelectorAll(".option-item");
    const submitBtn = document.getElementById("submit-answer-btn");
    const nextBtn = document.getElementById("next-btn");

    isAnswerSubmitted = true;
    submitBtn.style.display = "none";
    nextBtn.style.display = "inline-block";

    // 记录用户答案
    userAnswers[currentQuestionIndex] = {
        question: question.question,
        userAnswer: question.options[selectedOptionIndex],
        correctAnswer: question.options[question.correct],
        isCorrect: selectedOptionIndex === question.correct,
        explanation: question.explanation
    };

    // 显示反馈
    if (selectedOptionIndex === question.correct) {
        currentScore++;
        feedbackBox.className = "feedback-box correct";
        feedbackBox.textContent = pack.feedback_correct.replace("{explanation}", question.explanation);
    } else {
        feedbackBox.className = "feedback-box incorrect";
        feedbackBox.textContent = pack.feedback_incorrect
            .replace("{answer}", question.options[question.correct])
            .replace("{explanation}", question.explanation);
    }

    // 标记正确/错误选项
    options.forEach((option, index) => {
        option.classList.add("disabled");
        if (index === question.correct) {
            option.classList.add("correct");
        } else if (index === selectedOptionIndex && index !== question.correct) {
            option.classList.add("incorrect");
        }
    });

    // 更新按钮文本
    if (currentQuestionIndex === selectedQuestions.length - 1) {
        nextBtn.textContent = pack.btn_submit_quiz;
    } else {
        nextBtn.textContent = pack.btn_next;
    }

    updateQuizInfo();
    updateProgressBar();
}

// 进入下一题/结果页
function handleNextQuestion() {
    if (currentQuestionIndex === selectedQuestions.length - 1) {
        // 保存完成记录
        StorageUtils.saveLevelCompletion(currentLevel, currentScore, selectedQuestions.length);
        // 保存已做题目ID
        const answeredIds = StorageUtils.getAnsweredQuestionIds(currentLevel);
        const newAnsweredIds = [...new Set([...answeredIds, ...selectedQuestions.map(q => q.id)])];
        StorageUtils.saveAnsweredQuestionIds(currentLevel, newAnsweredIds);
        showResult();
    } else {
        currentQuestionIndex++;
        renderQuestion();
        updateQuizInfo();
        updateProgressBar();
    }
}

// 更新测验信息
function updateQuizInfo() {
    const pack = languagePack[currentLang];
    const levelNames = {
        1: pack.level_name_foundation,
        2: pack.level_name_intermediate,
        3: pack.level_name_higher
    };

    document.getElementById("quiz-level-info").textContent = pack.quiz_level_info
        .replace("{level}", levelNames[currentLevel])
        .replace("{current}", currentQuestionIndex + 1)
        .replace("{total}", selectedQuestions.length);
    document.getElementById("quiz-score-info").textContent = pack.quiz_score_info.replace("{score}", currentScore);
    document.getElementById("current-question").textContent = currentQuestionIndex + 1;
    document.getElementById("total-questions").textContent = selectedQuestions.length;
    document.getElementById("current-score").textContent = currentScore;
}

// 更新进度条
function updateProgressBar() {
    const progress = ((currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)) / selectedQuestions.length) * 100;
    document.getElementById("quiz-progress-bar").style.width = `${progress}%`;
}

// 退出测验（含确认）
function handleExitQuiz() {
    const pack = languagePack[currentLang];
    if (confirm(pack.confirm_exit)) {
        resetQuizState();
        showSection("welcome-section");
    }
}

// 重置测验状态
function resetQuizState() {
    currentLevel = 1;
    currentQuestionIndex = 0;
    currentScore = 0;
    selectedQuestions = [];
    userAnswers = [];
    selectedOptionIndex = null;
    isAnswerSubmitted = false;

    // 重置按钮事件
    const submitBtn = document.getElementById("submit-answer-btn");
    const nextBtn = document.getElementById("next-btn");
    submitBtn.disabled = true;
    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "none";
    nextBtn.textContent = languagePack[currentLang].btn_next;
    nextBtn.removeEventListener("click", showResult);

    // 隐藏回顾区域
    document.getElementById("review-container").style.display = "none";
    document.getElementById("review-btn").textContent = languagePack[currentLang].btn_review;
    
    // 重置进度条
    document.getElementById("quiz-progress-bar").style.width = "0%";
    
    // 更新AI推荐
    updateAIRecommendation();
}

// 显示结果
function showResult() {
    document.getElementById("final-score").textContent = currentScore;
    document.getElementById("final-total").textContent = `/ ${selectedQuestions.length}`;
    showSection("result-section");
}

// 切换答案回顾
function toggleReview() {
    const pack = languagePack[currentLang];
    const reviewContainer = document.getElementById("review-container");
    const reviewBtn = document.getElementById("review-btn");
    const reviewList = document.getElementById("review-list");

    if (reviewContainer.style.display === "none") {
        // 渲染回顾内容
        reviewList.innerHTML = "";
        userAnswers.forEach((answer, index) => {
            const reviewItem = document.createElement("div");
            reviewItem.className = "question-card";
            reviewItem.innerHTML = `
                <h3 class="question-title">${index + 1}. ${answer.question}</h3>
                <p style="margin-bottom: 0.5rem; color: ${answer.isCorrect ? 'var(--accent-success)' : 'var(--accent-error)'};">
                    <strong>${pack.feedback_correct.split("!")[0]}:</strong> ${answer.isCorrect ? answer.userAnswer : answer.correctAnswer}
                </p>
                <p style="margin-bottom: 0.5rem; color: var(--text-secondary);">
                    <strong>${pack.feedback_incorrect.split(".")[0]}:</strong> ${answer.userAnswer}
                </p>
                <p style="color: var(--text-secondary);">${answer.explanation}</p>
            `;
            reviewList.appendChild(reviewItem);
        });

        reviewContainer.style.display = "block";
        reviewBtn.textContent = pack.btn_hide_review;
    } else {
        reviewContainer.style.display = "none";
        reviewBtn.textContent = pack.btn_review;
    }
}

// 隐私政策弹窗
function initPrivacyModal() {
    const modal = document.getElementById("privacy-modal");
    const confirmBtn = document.getElementById("privacy-confirm-btn");

    if (!StorageUtils.getPrivacyAgreed()) {
        modal.classList.add("active");
    }

    confirmBtn.addEventListener("click", () => {
        StorageUtils.savePrivacyAgreed();
        modal.classList.remove("active");
    });
}

// 护眼休息提醒
function initRestReminder() {
    restReminderTimer = setInterval(() => {
        const elapsed = Date.now() - useStartTime;
        if (elapsed >= 20 * 60 * 1000) { // 20分钟
            document.getElementById("rest-modal").classList.add("active");
            useStartTime = Date.now(); // 重置计时
        }
    }, 60000); // 每分钟检查一次

    document.getElementById("rest-confirm-btn").addEventListener("click", () => {
        document.getElementById("rest-modal").classList.remove("active");
    });
}

// 音频朗读功能（听力障碍辅助）
function initAudioRead() {
    const audioBtn = document.getElementById("audio-read-btn");
    const captionContainer = document.getElementById("caption-container");
    const captionText = document.getElementById("caption-text");

    audioBtn.addEventListener("click", () => {
        if (!document.getElementById("quiz-section").classList.contains("active")) return;
        
        const question = selectedQuestions[currentQuestionIndex];
        const textToRead = `${question.question}. Options: ${question.options.join(", ")}`;
        
        // 显示字幕
        captionContainer.style.display = "block";
        captionText.textContent = textToRead;
        
        // 浏览器TTS朗读
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = currentLang === "zh" ? "zh-CN" : 
                             currentLang === "es" ? "es-ES" :
                             currentLang === "fr" ? "fr-FR" :
                             currentLang === "ja" ? "ja-JP" : "en-US";
            speechSynthesis.speak(utterance);
            
            utterance.onend = () => {
                setTimeout(() => {
                    captionContainer.style.display = "none";
                }, 2000);
            };
        } else {
            setTimeout(() => {
                captionContainer.style.display = "none";
            }, 5000);
        }
    });
}

// ===================== 6. 页面初始化 =====================
document.addEventListener("DOMContentLoaded", () => {
    initPrivacyModal();
    initLanguage();
    initTheme();
    initFontSize();
    initQuiz();
    initRestReminder();
    initAudioRead();
    updateAIRecommendation();
});