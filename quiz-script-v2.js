// ==============================
// GeoCircle Interactive - Quiz Script v2
// Simplified & Stable Version
// ==============================

// 配置
const QUESTIONS_PER_LEVEL = 10;
let currentLang = "en";
let currentTheme = "light";
let currentFontSize = "medium";
let currentColorBlind = "normal";
let isMobileView = false;

// 状态
let currentLevel = 1;
let currentQuestion = null;
let usedQuestions = [];
let questionIndex = 0;
let selectedAnswer = null;
let totalScore = 0;
let correctCount = 0;
let streak = 0;
let confirmCallback = null;

// DOM元素
const el = {
    levelPage: document.getElementById("levelPage"),
    quizPage: document.getElementById("quizPage"),
    resultPage: document.getElementById("resultPage"),
    levelBtns: document.querySelectorAll(".level-btn"),
    qNum: document.getElementById("qNum"),
    qText: document.getElementById("qText"),
    diagram: document.getElementById("diagram"),
    options: document.getElementById("options"),
    submitBtn: document.getElementById("submitBtn"),
    nextBtn: document.getElementById("nextBtn"),
    backBtn: document.getElementById("backBtn"),
    restartBtn: document.getElementById("restartBtn"),
    homeBtn: document.getElementById("homeBtn"),
    feedback: document.getElementById("feedback"),
    feedbackTitle: document.getElementById("feedbackTitle"),
    feedbackText: document.getElementById("feedbackText"),
    score: document.getElementById("score"),
    correct: document.getElementById("correct"),
    streak: document.getElementById("streak"),
    progress: document.getElementById("progress"),
    breadcrumb: document.getElementById("breadcrumb"),
    resultText: document.getElementById("resultText"),
    settingsPanel: document.getElementById("settingsPanel"),
    fontBtn: document.getElementById("fontBtn"),
    colorBtn: document.getElementById("colorBtn"),
    themeBtn: document.getElementById("themeBtn"),
    langBtn: document.getElementById("langBtn"),
    mobileBtn: document.getElementById("mobileBtn"),
    smallBtns: document.querySelectorAll(".small-btn"),
    confirmDialog: document.getElementById("confirmDialog"),
    dialogTitle: document.getElementById("dialogTitle"),
    dialogMsg: document.getElementById("dialogMsg"),
    yesBtn: document.getElementById("yesBtn"),
    noBtn: document.getElementById("noBtn"),
    mainContainer: document.getElementById("mainContainer")
};

// 多语言
const i18n = {
    en: {
        title: "Circle Geometry Quiz",
        subtitle: "Master GCSE circle theorems with interactive practice",
        level1: "Basic Definitions",
        level2: "Core Theorems",
        level3: "Advanced Problems",
        score: "Score",
        correct: "Correct",
        streak: "Streak",
        progress: "Progress",
        submit: "Submit Answer",
        next: "Next Question",
        back: "Back to Levels",
        restart: "Try Again",
        resultTitle: "Quiz Complete!",
        correctFeedback: "✅ Correct! Great job!",
        incorrectFeedback: "❌ Incorrect. Let's learn from this:",
        selectAnswer: "Please select an answer first!",
        confirmBackTitle: "Confirm Navigation",
        confirmBackMsg: "Are you sure you want to leave? Your progress will be lost.",
        confirmRestartTitle: "Confirm Restart",
        confirmRestartMsg: "Are you sure you want to restart? Your progress will be lost."
    },
    zh: {
        title: "圆几何测验",
        subtitle: "通过互动练习掌握GCSE圆定理",
        level1: "基础定义",
        level2: "核心定理",
        level3: "进阶难题",
        score: "分数",
        correct: "正确",
        streak: "连击",
        progress: "进度",
        submit: "提交答案",
        next: "下一题",
        back: "返回等级",
        restart: "再试一次",
        resultTitle: "测验完成！",
        correctFeedback: "✅ 回答正确！做得好！",
        incorrectFeedback: "❌ 回答错误。让我们来学习一下：",
        selectAnswer: "请先选择一个答案！",
        confirmBackTitle: "确认离开",
        confirmBackMsg: "确定要离开吗？当前进度将丢失。",
        confirmRestartTitle: "确认重启",
        confirmRestartMsg: "确定要重新开始吗？当前进度将丢失。"
    }
};

// 题库（每级10题，共30题）
const quizData = {
    en: {
        level1: [
            { q: "Diameter = ? × Radius", options: ["2", "3", "1", "4"], a: "2", exp: "📌 Theorem: Basic Definition\n• Diameter = 2 × Radius\n• The diameter is the longest chord through the center\n• Example: r=5 → d=10", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Center angle = ? × Circumference angle", options: ["Twice", "Half", "Equal", "Triple"], a: "Twice", exp: "📌 Theorem: Central vs Inscribed\n• Central angle = 2 × Inscribed angle\n• Applies when both angles subtend the same arc\n• Example: 30° → 60°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Tangent ⊥ radius at contact", options: ["True", "False"], a: "True", exp: "📌 Theorem: Tangent-Radius\n• A tangent is always perpendicular to the radius at contact\n• Forms a right angle (90°)\n• Fundamental tangent theorem", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Radius = 6 cm, Diameter = ?", options: ["12 cm", "6 cm", "3 cm", "24 cm"], a: "12 cm", exp: "📌 Calculation: Diameter\n• Formula: d = 2r\n• Given r = 6 cm\n• d = 2 × 6 = 12 cm", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Longest chord in a circle", options: ["Diameter", "Radius", "Tangent", "Arc"], a: "Diameter", exp: "📌 Definition: Longest Chord\n• A chord connects two points on a circle\n• The diameter is the only chord through the center\n• All other chords are shorter", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Circumference angle on diameter", options: ["90°", "180°", "45°", "60°"], a: "90°", exp: "📌 Theorem: Thales' Theorem\n• Any angle subtended by a diameter is a right angle (90°)\n• Triangles in a semicircle are always right-angled", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Perpendicular from center bisects chord", options: ["True", "False"], a: "True", exp: "📌 Theorem: Perpendicular Bisector\n• A line from center perpendicular to a chord bisects the chord\n• Converse is also true: perpendicular bisector passes through center", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Equal chords = ? distance from center", options: ["Equal", "Double", "Half", "Triple"], a: "Equal", exp: "📌 Theorem: Equal Chords\n• In the same circle, equal chords are equidistant from center\n• Conversely, chords equidistant from center are equal", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Total center angle for full circle", options: ["360°", "180°", "90°", "270°"], a: "360°", exp: "📌 Basic Geometry: Full Rotation\n• A complete rotation around a point is 360 degrees\n• This is why the total angle around center is 360°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Half of a diameter is a", options: ["Radius", "Tangent", "Arc", "Chord"], a: "Radius", exp: "📌 Definition: Radius\n• The radius is the distance from center to circumference\n• It is exactly half the diameter", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" }
        ],
        level2: [
            { q: "Inscribed angle = 40°, center = ?", options: ["80°", "40°", "20°", "100°"], a: "80°", exp: "📌 Theorem: Central Angle\n• Central angle = 2 × Inscribed angle\n• Given inscribed = 40°\n• Central = 2 × 40° = 80°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Cyclic quadrilateral: opposite angles sum to", options: ["180°", "90°", "360°", "270°"], a: "180°", exp: "📌 Theorem: Cyclic Quadrilateral\n• A cyclic quadrilateral has all vertices on a circle\n• Opposite angles sum to 180°\n• They are supplementary", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Tangents from same external point are", options: ["Equal", "Double", "Half", "Unequal"], a: "Equal", exp: "📌 Theorem: Equal Tangents\n• If two tangents are drawn from the same external point, they are equal\n• Very useful for solving tangent problems", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Angle between tangent & chord = angle in", options: ["Alternate segment", "Center", "Diameter", "Arc"], a: "Alternate segment", exp: "📌 Theorem: Alternate Segment\n• The angle between tangent and chord at contact equals the angle in the alternate segment\n• One of the more challenging theorems", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Chord length 24, distance 5, radius=?", options: ["13", "12", "5", "10"], a: "13", exp: "📌 Calculation: Radius from Chord\n• Use Pythagoras: r² = (chord/2)² + distance²\n• Chord/2 = 12\n• r² = 12² + 5² = 144 + 25 = 169\n• r = 13", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Center angle 120°, inscribed = ?", options: ["60°", "120°", "240°", "30°"], a: "60°", exp: "📌 Theorem: Central Angle\n• Inscribed angle = Central angle ÷ 2\n• Given central = 120°\n• Inscribed = 120° ÷ 2 = 60°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Right angle in semicircle is", options: ["90°", "180°", "45°", "60°"], a: "90°", exp: "📌 Theorem: Thales' Theorem\n• Any triangle inscribed in a semicircle with diameter as side is right-angled\n• Right angle is at the circumference", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Two radii form a/an", options: ["Isosceles triangle", "Equilateral", "Scalene", "Right"], a: "Isosceles triangle", exp: "📌 Property: Radii Triangle\n• Any triangle formed by two radii and a chord is isosceles\n• Because the two radii are equal\n• Base angles are therefore equal", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Arc length depends on", options: ["Angle & radius", "Only radius", "Only angle", "Chord"], a: "Angle & radius", exp: "📌 Formula: Arc Length\n• Arc length = (θ/360) × 2πr\n• θ is the central angle in degrees\n• So arc length depends on both angle and radius", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Angle between two tangents + center angle =", options: ["180°", "90°", "360°", "270°"], a: "180°", exp: "📌 Theorem: Tangents and Center\n• The quadrilateral formed by two radii and two tangents has two right angles\n• Sum of angles in quadrilateral = 360°\n• So angle between tangents + center angle = 180°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" }
        ],
        level3: [
            { q: "Combined theorem: Tangent + Cyclic quadrilateral", options: ["180° total", "90° total", "360° total", "270° total"], a: "180° total", exp: "📌 Combined Theorem\n• Tangent-chord angle = angle in alternate segment\n• Cyclic quadrilateral opposite angles sum to 180°\n• When combined, these often lead to angles adding to 180°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Concyclic points lie on", options: ["Same circle", "Different circles", "Line", "Triangle"], a: "Same circle", exp: "📌 Definition: Concyclic Points\n• Concyclic points all lie on the same circle\n• Three non-collinear points are always concyclic\n• Four points are concyclic if they form a cyclic quadrilateral", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Angle between two tangents + center angle =", options: ["180°", "90°", "360°", "270°"], a: "180°", exp: "📌 Theorem: Tangents and Center\n• The quadrilateral has two right angles (90° each)\n• Sum of angles = 360°\n• So angle between tangents + center angle = 180°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Perpendicular bisectors meet at", options: ["Center", "Circumference", "Chord", "Tangent"], a: "Center", exp: "📌 Property: Perpendicular Bisectors\n• The perpendicular bisector of any chord passes through the center\n• Therefore, perpendicular bisectors of any two chords intersect at center", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "If two secants intersect externally, product of whole and external are", options: ["Equal", "Double", "Half", "Zero"], a: "Equal", exp: "📌 Theorem: Intersecting Secants\n• If two secants are drawn from an external point, then (whole secant) × (external part) = (other whole) × (other external)", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "A tangent and a secant from external point: tangent² =", options: ["Whole × External", "Whole × Internal", "External × Internal", "Radius²"], a: "Whole × External", exp: "📌 Theorem: Tangent-Secant\n• If a tangent and secant are drawn from an external point, then tangent² = (whole secant) × (external part)", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "In a cyclic quadrilateral, exterior angle =", options: ["Interior opposite angle", "Adjacent angle", "Right angle", "Straight angle"], a: "Interior opposite angle", exp: "📌 Theorem: Cyclic Quadrilateral Exterior\n• The exterior angle of a cyclic quadrilateral equals the interior opposite angle\n• Very useful extension of the cyclic quadrilateral theorem", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "The line joining centers of two intersecting circles", options: ["Bisects the common chord", "Is parallel to common chord", "Is equal to common chord", "Is perpendicular to common chord"], a: "Bisects the common chord", exp: "📌 Property: Intersecting Circles\n• The line joining centers of two intersecting circles is the perpendicular bisector of their common chord\n• It cuts the common chord exactly in half at right angles", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "Number of common tangents to two circles touching externally", options: ["3", "2", "1", "4"], a: "3", exp: "📌 Property: Common Tangents\n• Two circles touching externally have 3 common tangents\n• Two circles touching internally have 1 common tangent\n• Two separate circles have 4 common tangents", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "In a circle, angle subtended by an arc at center is", options: ["Twice the angle at circumference", "Half the angle at circumference", "Equal to the angle at circumference", "Three times the angle at circumference"], a: "Twice the angle at circumference", exp: "📌 Theorem: Central Angle Theorem\n• This is the most fundamental circle theorem\n• All other angle-related theorems are derived from this one\n• Applies to any arc in any circle", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" }
        ]
    },
    zh: {
        level1: [
            { q: "直径 = ? × 半径", options: ["2", "3", "1", "4"], a: "2", exp: "📌 定理：基本定义\n• 直径 = 2 × 半径\n• 直径是通过圆心的最长弦\n• 示例：r=5 → d=10", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "圆心角 = ? × 圆周角", options: ["两倍", "一半", "相等", "三倍"], a: "两倍", exp: "📌 定理：圆心角与圆周角\n• 圆心角 = 2 × 圆周角\n• 当两个角对着同一段弧时成立\n• 示例：30° → 60°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "切线与切点处的半径垂直", options: ["正确", "错误"], a: "正确", exp: "📌 定理：切线半径垂直\n• 切线总是与切点处的半径垂直\n• 形成直角（90°）\n• 基本切线定理", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "半径 = 6厘米，直径 = ?", options: ["12厘米", "6厘米", "3厘米", "24厘米"], a: "12厘米", exp: "📌 计算：直径\n• 公式：d = 2r\n• 已知r = 6厘米\n• d = 2 × 6 = 12厘米", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "圆中最长的弦", options: ["直径", "半径", "切线", "弧"], a: "直径", exp: "📌 定义：最长弦\n• 弦连接圆上的两个点\n• 直径是唯一通过圆心的弦\n• 所有其他弦都更短", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "直径所对的圆周角", options: ["90°", "180°", "45°", "60°"], a: "90°", exp: "📌 定理：泰勒斯定理\n• 直径所对的任何圆周角都是直角（90°）\n• 半圆内的三角形总是直角三角形", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "圆心到弦的垂线平分弦", options: ["正确", "错误"], a: "正确", exp: "📌 定理：垂直平分线\n• 从圆心向弦作垂线平分弦\n• 反之亦然：垂直平分线通过圆心", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "等弦到圆心的距离", options: ["相等", "两倍", "一半", "三倍"], a: "相等", exp: "📌 定理：等弦\n• 在同圆中，等弦到圆心的距离相等\n• 反之，到圆心距离相等的弦相等", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "整个圆的圆心角总和", options: ["360°", "180°", "90°", "270°"], a: "360°", exp: "📌 基础几何：完整旋转\n• 绕一点完整旋转一周是360度\n• 这就是为什么圆心的总角度是360°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "直径的一半是", options: ["半径", "切线", "弧", "弦"], a: "半径", exp: "📌 定义：半径\n• 半径是从圆心到圆周的距离\n• 它正好是直径的一半", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" }
        ],
        level2: [
            { q: "圆周角 = 40°，圆心角 = ?", options: ["80°", "40°", "20°", "100°"], a: "80°", exp: "📌 定理：圆心角\n• 圆心角 = 2 × 圆周角\n• 已知圆周角 = 40°\n• 圆心角 = 2 × 40° = 80°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "圆内接四边形：对角之和为", options: ["180°", "90°", "360°", "270°"], a: "180°", exp: "📌 定理：圆内接四边形\n• 圆内接四边形的所有顶点都在圆上\n• 对角之和为180°\n• 它们是补角", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "同一点引出的两条切线", options: ["相等", "两倍", "一半", "不等"], a: "相等", exp: "📌 定理：等切线\n• 如果从同一点向圆引两条切线，它们相等\n• 解决切线问题非常有用", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "切线与弦的夹角等于哪个角", options: ["内错角", "圆心角", "直径角", "弧角"], a: "内错角", exp: "📌 定理：弦切角\n• 切线与弦在切点处的夹角等于弦所对的内错角\n• 比较有挑战性的定理之一", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "弦长24，距圆心5，半径=?", options: ["13", "12", "5", "10"], a: "13", exp: "📌 计算：由弦求半径\n• 使用勾股定理：r² = (弦长/2)² + 距离²\n• 弦长/2 = 12\n• r² = 12² + 5² = 144 + 25 = 169\n• r = 13", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "圆心角120°，圆周角 = ?", options: ["60°", "120°", "240°", "30°"], a: "60°", exp: "📌 定理：圆心角\n• 圆周角 = 圆心角 ÷ 2\n• 已知圆心角 = 120°\n• 圆周角 = 120° ÷ 2 = 60°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "半圆中的角是", options: ["90°", "180°", "45°", "60°"], a: "90°", exp: "📌 定理：泰勒斯定理\n• 任何以直径为一边的半圆内接三角形都是直角三角形\n• 直角在圆周上", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "两条半径组成一个", options: ["等腰三角形", "等边三角形", "不等边三角形", "直角三角形"], a: "等腰三角形", exp: "📌 性质：半径三角形\n• 由两条半径和一条弦组成的任何三角形都是等腰三角形\n• 因为两条半径相等\n• 因此底角相等", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "弧长取决于", options: ["角度和半径", "仅半径", "仅角度", "弦长"], a: "角度和半径", exp: "📌 公式：弧长\n• 弧长 = (θ/360) × 2πr\n• θ是圆心角（度）\n• 所以弧长取决于角度和半径", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "两条切线的夹角 + 圆心角 =", options: ["180°", "90°", "360°", "270°"], a: "180°", exp: "📌 定理：切线与圆心角\n• 由两条半径和两条切线形成的四边形有两个直角\n• 四边形内角和 = 360°\n• 所以切线夹角 + 圆心角 = 180°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" }
        ],
        level3: [
            { q: "综合定理：切线 + 圆内接四边形", options: ["总和180°", "总和90°", "总和360°", "总和270°"], a: "总和180°", exp: "📌 综合定理\n• 弦切角 = 内错角\n• 圆内接四边形对角和为180°\n• 结合使用时，这些通常会导致角度相加为180°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "共圆点位于", options: ["同一个圆上", "不同圆上", "直线上", "三角形上"], a: "同一个圆上", exp: "📌 定义：共圆点\n• 共圆点都在同一个圆上\n• 三个不共线的点总是共圆的\n• 四个点共圆当且仅当它们构成圆内接四边形", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "两条切线的夹角 + 圆心角 =", options: ["180°", "90°", "360°", "270°"], a: "180°", exp: "📌 定理：切线与圆心角\n• 四边形有两个直角（各90°）\n• 内角和 = 360°\n• 所以切线夹角 + 圆心角 = 180°", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "垂直平分线交于", options: ["圆心", "圆周", "弦", "切线"], a: "圆心", exp: "📌 性质：垂直平分线\n• 任何弦的垂直平分线都通过圆心\n• 因此，任意两条弦的垂直平分线相交于圆心", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "两割线相交于圆外，整体与外部乘积", options: ["相等", "两倍", "一半", "零"], a: "相等", exp: "📌 定理：相交割线\n• 如果从圆外一点引两条割线，那么（整条割线）×（外部部分）=（另一条整条）×（另一条外部）", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "外点引切线和割线：切线² =", options: ["整体×外部", "整体×内部", "外部×内部", "半径²"], a: "整体×外部", exp: "📌 定理：切割线\n• 如果从圆外一点引一条切线和一条割线，那么切线² =（整条割线）×（外部部分）", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "圆内接四边形的外角等于", options: ["内对角", "邻角", "直角", "平角"], a: "内对角", exp: "📌 定理：圆内接四边形外角\n• 圆内接四边形的外角等于它的内对角\n• 圆内接四边形定理非常有用的扩展", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "两个相交圆的连心线", options: ["垂直平分公共弦", "平行于公共弦", "等于公共弦", "垂直于公共弦"], a: "垂直平分公共弦", exp: "📌 性质：相交圆\n• 两个相交圆的连心线是它们公共弦的垂直平分线\n• 它以直角将公共弦恰好分成两半", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "两个外切圆的公切线数量", options: ["3", "2", "1", "4"], a: "3", exp: "📌 性质：公切线\n• 两个外切圆有3条公切线\n• 两个内切圆有1条公切线\n• 两个相离圆有4条公切线", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" },
            { q: "在圆中，弧在圆心所对的角是", options: ["圆周角的两倍", "圆周角的一半", "等于圆周角", "圆周角的三倍"], a: "圆周角的两倍", exp: "📌 定理：圆心角定理\n• 这是最基本的圆定理\n• 所有其他与角度相关的定理都由此推导而来\n• 适用于任何圆中的任何弧", svg: "<circle cx='70' cy='70' r='45' stroke='black' fill='none'/>" }
        ]
    }
};

// 初始化
function init() {
    updateLanguage();
    bindEvents();
    window.onerror = function(msg, src, lineno, colno, error) {
        console.error("Error:", msg, src, lineno, colno);
        alert("An error occurred. Please refresh the page.");
        return true;
    };
}

// 绑定事件
function bindEvents() {
    // 等级选择
    el.levelBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentLevel = parseInt(btn.dataset.level);
            startQuiz();
        });
    });

    // 答题按钮
    el.submitBtn.addEventListener("click", submitAnswer);
    el.nextBtn.addEventListener("click", nextQuestion);
    el.backBtn.addEventListener("click", () => {
        showConfirm(i18n[currentLang].confirmBackTitle, i18n[currentLang].confirmBackMsg, goHome);
    });
    el.restartBtn.addEventListener("click", () => {
        showConfirm(i18n[currentLang].confirmRestartTitle, i18n[currentLang].confirmRestartMsg, startQuiz);
    });
    el.homeBtn.addEventListener("click", goHome);

    // 设置按钮
    el.fontBtn.addEventListener("click", () => el.settingsPanel.classList.toggle("hidden"));
    document.addEventListener("click", (e) => {
        if (!el.settingsPanel.contains(e.target) && !el.fontBtn.contains(e.target)) {
            el.settingsPanel.classList.add("hidden");
        }
    });

    // 字体大小
    document.querySelectorAll(".small-btn[data-size]").forEach(btn => {
        btn.addEventListener("click", () => {
            currentFontSize = btn.dataset.size;
            document.documentElement.setAttribute("data-font-size", currentFontSize);
            updateActive(document.querySelectorAll(".small-btn[data-size]"), btn);
        });
    });

    // 色盲模式
    document.querySelectorAll(".small-btn[data-color]").forEach(btn => {
        btn.addEventListener("click", () => {
            currentColorBlind = btn.dataset.color;
            document.documentElement.setAttribute("data-colorblind", currentColorBlind);
            updateActive(document.querySelectorAll(".small-btn[data-color]"), btn);
        });
    });

    // 主题
    el.themeBtn.addEventListener("click", () => {
        const themes = ["light", "dark", "eye-care"];
        const icons = ["🌙", "👁️", "☀️"];
        const idx = themes.indexOf(currentTheme);
        currentTheme = themes[(idx + 1) % themes.length];
        document.documentElement.setAttribute("data-theme", currentTheme);
        el.themeBtn.textContent = icons[(idx + 1) % themes.length];
    });

    // 语言
    el.langBtn.addEventListener("click", () => {
        currentLang = currentLang === "en" ? "zh" : "en";
        updateLanguage();
    });

    // 手机视图
    el.mobileBtn.addEventListener("click", () => {
        isMobileView = !isMobileView;
        if (isMobileView) {
            el.mainContainer.classList.add("mobile-view");
            el.mobileBtn.textContent = "💻";
        } else {
            el.mainContainer.classList.remove("mobile-view");
            el.mobileBtn.textContent = "📱";
        }
    });

    // 对话框
    el.yesBtn.addEventListener("click", () => {
        if (confirmCallback) confirmCallback();
    });
    el.noBtn.addEventListener("click", hideConfirm);
}

// 更新语言
function updateLanguage() {
    document.querySelector(".title").textContent = i18n[currentLang].title;
    document.querySelector(".subtitle").textContent = i18n[currentLang].subtitle;
    const descs = document.querySelectorAll(".level-desc");
    descs[0].textContent = i18n[currentLang].level1;
    descs[1].textContent = i18n[currentLang].level2;
    descs[2].textContent = i18n[currentLang].level3;
    el.submitBtn.textContent = i18n[currentLang].submit;
    el.nextBtn.textContent = i18n[currentLang].next;
    el.backBtn.textContent = i18n[currentLang].back;
    el.restartBtn.textContent = i18n[currentLang].restart;
    el.homeBtn.textContent = i18n[currentLang].back;
    document.querySelector(".result-title").textContent = i18n[currentLang].resultTitle;
    const labels = document.querySelectorAll(".score-item .label");
    labels[0].textContent = i18n[currentLang].score;
    labels[1].textContent = i18n[currentLang].correct;
    labels[2].textContent = i18n[currentLang].streak;
    labels[3].textContent = i18n[currentLang].progress;
}

// 更新激活按钮
function updateActive(buttons, active) {
    buttons.forEach(b => b.classList.remove("active"));
    active.classList.add("active");
}

// 开始测验
function startQuiz() {
    usedQuestions = [];
    questionIndex = 0;
    totalScore = 0;
    correctCount = 0;
    streak = 0;
    
    el.levelPage.classList.add("hidden");
    el.quizPage.classList.remove("hidden");
    el.resultPage.classList.add("hidden");
    el.breadcrumb.textContent = `Home > Quiz > Level ${currentLevel}`;
    
    updateScore();
    loadQuestion();
    hideConfirm();
}

// 加载题目
function loadQuestion() {
    const allQuestions = quizData[currentLang][`level${currentLevel}`];
    if (usedQuestions.length >= allQuestions.length) usedQuestions = [];
    
    const available = allQuestions.filter(q => !usedQuestions.includes(q));
    const randomIdx = Math.floor(Math.random() * available.length);
    currentQuestion = available[randomIdx];
    usedQuestions.push(currentQuestion);
    
    el.qNum.textContent = `Question ${questionIndex + 1}/${QUESTIONS_PER_LEVEL}`;
    el.qText.textContent = currentQuestion.q;
    el.diagram.innerHTML = `<svg width='140' height='140'>${currentQuestion.svg}</svg>`;
    
    renderOptions();
    resetState();
}

// 渲染选项
function renderOptions() {
    el.options.innerHTML = "";
    const shuffled = [...currentQuestion.options].sort(() => Math.random() - 0.5);
    
    shuffled.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = (e) => selectOption(e, opt);
        btn.setAttribute("tabindex", "0");
        btn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectOption(e, opt);
            }
        });
        el.options.appendChild(btn);
    });
}

// 选择选项
function selectOption(e, value) {
    document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
    e.target.classList.add("selected");
    selectedAnswer = value;
}

// 提交答案
function submitAnswer() {
    if (!selectedAnswer) {
        alert(i18n[currentLang].selectAnswer);
        return;
    }
    
    const isCorrect = selectedAnswer === currentQuestion.a;
    if (isCorrect) {
        streak++;
        correctCount++;
        totalScore += 10 + (streak >= 3 ? 5 : 0);
    } else {
        streak = 0;
        totalScore = Math.max(0, totalScore - 2);
    }
    
    updateScore();
    showFeedback(isCorrect);
    el.submitBtn.classList.add("hidden");
    el.nextBtn.classList.remove("hidden");
}

// 显示反馈
function showFeedback(isCorrect) {
    el.feedback.classList.remove("hidden");
    el.feedbackTitle.textContent = isCorrect 
        ? i18n[currentLang].correctFeedback 
        : i18n[currentLang].incorrectFeedback;
    el.feedbackTitle.style.color = isCorrect ? "var(--correct)" : "var(--error)";
    el.feedbackText.textContent = currentQuestion.exp;
}

// 下一题
function nextQuestion() {
    questionIndex++;
    if (questionIndex >= QUESTIONS_PER_LEVEL) {
        endQuiz();
        return;
    }
    loadQuestion();
}

// 结束测验
function endQuiz() {
    const maxScore = QUESTIONS_PER_LEVEL * 10;
    const accuracy = Math.round((correctCount / QUESTIONS_PER_LEVEL) * 100);
    
    el.resultText.textContent = `
    Correct: ${correctCount}/${QUESTIONS_PER_LEVEL}
    Total Score: ${totalScore}/${maxScore}
    Accuracy: ${accuracy}%
    Best Streak: ${streak}
    `;
    
    el.quizPage.classList.add("hidden");
    el.resultPage.classList.remove("hidden");
}

// 返回首页
function goHome() {
    el.levelPage.classList.remove("hidden");
    el.quizPage.classList.add("hidden");
    el.resultPage.classList.add("hidden");
    el.breadcrumb.textContent = "Home > Quiz";
    hideConfirm();
}

// 更新分数
function updateScore() {
    el.score.textContent = totalScore;
    el.correct.textContent = correctCount;
    el.streak.textContent = streak;
    el.progress.textContent = `${questionIndex + 1}/${QUESTIONS_PER_LEVEL}`;
}

// 重置状态
function resetState() {
    selectedAnswer = null;
    el.feedback.classList.add("hidden");
    el.submitBtn.classList.remove("hidden");
    el.nextBtn.classList.add("hidden");
}

// 显示确认对话框
function showConfirm(title, msg, callback) {
    el.dialogTitle.textContent = title;
    el.dialogMsg.textContent = msg;
    confirmCallback = callback;
    el.confirmDialog.classList.remove("hidden");
}

// 隐藏确认对话框
function hideConfirm() {
    el.confirmDialog.classList.add("hidden");
    confirmCallback = null;
}

// 启动
init();