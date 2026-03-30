const i18n = {
            en: {
                home: "Home", game: "Game", themeDark: "🌙 Dark Mode", themeLight: "☀️ Light Mode",
                langBtn: "🌐 中文", title: "Circle Master", 
                desc: "Pop the correct circle based on the GCSE Math formula!",
                score: "Score", lives: "Lives", level: "Level", 
                startText: "Click [Start Game] to begin!", startBtn: "▶ Start Game",
                resetBtn: "↺ Reset", hintBtn: "❓ Hint", gameOver: "Game Over!",
                hintText: "Area = π × r²\nCircumference = 2 × π × r\n(π ≈ 3.14)",
                qArea: "Find the circle with Area ≈ ",
                qCircum: "Find the circle with Circumference ≈ "
            },
            zh: {
                home: "主页", game: "游戏", themeDark: "🌙 开启暗黑", themeLight: "☀️ 开启明亮",
                langBtn: "🌐 English", title: "圆形大师", 
                desc: "根据数学公式戳破正确的圆球！",
                score: "得分", lives: "生命", level: "关卡", 
                startText: "点击【开始游戏】！", startBtn: "▶ 开始游戏",
                resetBtn: "↺ 重置", hintBtn: "❓ 提示", gameOver: "游戏结束！",
                hintText: "面积 = π × r²\n周长 = 2 × π × r\n(π ≈ 3.14)",
                qArea: "找出面积约为 的圆：",
                qCircum: "找出周长约为 的圆："
            }
        };

        let currentLang = 'en';

        function updateLang() {
            const t = i18n[currentLang];
            document.getElementById('nav-home').innerText = t.home;
            document.getElementById('nav-game').innerText = t.game;
            document.getElementById('btn-lang').innerText = t.langBtn;
            document.getElementById('title').innerText = t.title;
            document.getElementById('desc').innerText = t.desc;
            document.getElementById('txt-score').innerText = t.score;
            document.getElementById('txt-lives').innerText = t.lives;
            document.getElementById('txt-level').innerText = t.level;
            document.getElementById('btn-start').innerText = t.startBtn;
            document.getElementById('btn-reset').innerText = t.resetBtn;
            document.getElementById('btn-hint').innerText = t.hintBtn;
            document.getElementById('game-over').innerText = t.gameOver;
            
            // 更新按钮文本以适应当前主题
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            document.getElementById('btn-theme').innerText = isDark ? t.themeLight : t.themeDark;
            
            if(!isPlaying) document.getElementById('question-box').innerText = t.startText;
            else generateQuestionText(); // 如果游戏中则更新题目语言
        }

        function toggleLang() {
            currentLang = currentLang === 'en' ? 'zh' : 'en';
            updateLang();
        }

        // ================= 2. 包容性设计 (Theme & Font Size) =================
        function toggleTheme() {
            const body = document.body;
            const isDark = body.getAttribute('data-theme') === 'dark';
            body.setAttribute('data-theme', isDark ? 'light' : 'dark');
            updateLang();
        }

        let baseFontSize = 16;
        function changeFontSize(step) {
            baseFontSize += step * 2;
            if (baseFontSize < 12) baseFontSize = 12;
            if (baseFontSize > 24) baseFontSize = 24;
            document.documentElement.style.setProperty('--font-size-base', baseFontSize + 'px');
        }

        function alertHint() {
            alert(i18n[currentLang].hintText);
        }

        // ================= 3. 游戏引擎与逻辑 =================
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        let circles = [];
        let targetCircle = null;
        let animationId;
        
        let score = 0;
        let lives = 3;
        let level = 1;
        let isPlaying = false;
        let questionType = 'area'; // 'area' or 'circumference'

        // 圆形类
        class Circle {
            constructor(r, color) {
                this.r = r;
                this.x = Math.random() * (canvas.width - r * 2) + r;
                this.y = Math.random() * (canvas.height - r * 2) + r;
                this.dx = (Math.random() - 0.5) * 2;
                this.dy = (Math.random() - 0.5) * 2;
                this.color = color;
                
                // 计算数学属性 (GCSE 知识点)
                this.area = Math.PI * Math.pow(this.r, 2);
                this.circumference = 2 * Math.PI * this.r;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
                
                // 绘制半径提示
                ctx.fillStyle = "white";
                ctx.font = "14px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`r=${this.r}`, this.x, this.y);
            }

            update() {
                // 碰壁反弹物理效果
                if (this.x + this.r > canvas.width || this.x - this.r < 0) this.dx = -this.dx;
                if (this.y + this.r > canvas.height || this.y - this.r < 0) this.dy = -this.dy;
                
                this.x += this.dx;
                this.y += this.dy;
                this.draw();
            }
        }

        function generateLevel() {
            circles = [];
            const colors = ['#e91e63', '#9c27b0', '#3f51b5', '#00bcd4', '#ffeb3b', '#ff9800'];
            let numCircles = 3 + level; // 难度递增
            if (numCircles > 6) numCircles = 6;

            for (let i = 0; i < numCircles; i++) {
                // 随机生成 10 到 50 之间的整数半径
                let radius = Math.floor(Math.random() * 40) + 10;
                circles.push(new Circle(radius, colors[i % colors.length]));
            }

            // 随机选择一个目标圆
            targetCircle = circles[Math.floor(Math.random() * circles.length)];
            
            // 等级1求面积，等级2及以后随机求面积或周长
            questionType = (level === 1) ? 'area' : (Math.random() > 0.5 ? 'area' : 'circumference');
            generateQuestionText();
        }

        function generateQuestionText() {
            if(!targetCircle) return;
            const t = i18n[currentLang];
            let qText = "";
            if (questionType === 'area') {
                qText = t.qArea + targetCircle.area.toFixed(2);
            } else {
                qText = t.qCircum + targetCircle.circumference.toFixed(2);
            }
            document.getElementById('question-box').innerText = qText;
        }

        function animate() {
            if (!isPlaying) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circles.forEach(circle => circle.update());
            animationId = requestAnimationFrame(animate);
        }

        // 交互：点击画布判断
        canvas.addEventListener('click', (e) => {
            if (!isPlaying) return;
            const rect = canvas.getBoundingClientRect();
            // 解决自适应缩放导致的坐标偏移
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const clickX = (e.clientX - rect.left) * scaleX;
            const clickY = (e.clientY - rect.top) * scaleY;

            let hit = false;
            for (let i = 0; i < circles.length; i++) {
                const circle = circles[i];
                const dist = Math.hypot(clickX - circle.x, clickY - circle.y);
                
                if (dist <= circle.r) {
                    hit = true;
                    if (circle === targetCircle) {
                        // 答对
                        score += 10;
                        if (score % 30 === 0) level++; // 每对3题升一级
                        updateHUD();
                        generateLevel();
                    } else {
                        // 答错
                        lives--;
                        updateHUD();
                        document.getElementById('question-box').style.backgroundColor = "rgba(244, 67, 54, 0.3)";
                        setTimeout(() => {
                            document.getElementById('question-box').style.backgroundColor = "rgba(76, 175, 80, 0.1)";
                        }, 300);

                        if (lives <= 0) {
                            endGame();
                        }
                    }
                    break;
                }
            }
        });

        function updateHUD() {
            document.getElementById('score').innerText = score;
            document.getElementById('level').innerText = level;
            document.getElementById('lives').innerText = '❤️'.repeat(lives) + '💔'.repeat(3 - lives);
        }

        function startGame() {
            if (isPlaying) return;
            resetGame();
            isPlaying = true;
            document.getElementById('game-over').style.display = 'none';
            generateLevel();
            animate();
        }

        function resetGame() {
            score = 0;
            lives = 3;
            level = 1;
            isPlaying = false;
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateHUD();
            document.getElementById('question-box').innerText = i18n[currentLang].startText;
            document.getElementById('game-over').style.display = 'none';
        }

        function endGame() {
            isPlaying = false;
            cancelAnimationFrame(animationId);
            document.getElementById('game-over').style.display = 'block';
            document.getElementById('question-box').innerText = i18n[currentLang].gameOver;
        }

        // 初始化
        updateLang();
