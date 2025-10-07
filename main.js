// 网站加载成功提示
console.log('Portfolio site loaded successfully!');

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化哆啦A梦功能
    initDoraemon();
    
    // 初始化滚动功能
    initScrolling();
    
    // 初始化灯箱功能
    initLightbox();
    
    // 获取所有静态数据
    loadAllStaticData();
    
    // 默认显示主页
    showSection('home');
    
    // 初始化计算器
    initCalculator();
});

// 初始化哆啦A梦功能
function initDoraemon() {
    const doraemonAvatar = document.getElementById('doraemon-avatar');
    const doraemonDialog = document.getElementById('doraemon-dialog');
    const toolMenu = document.getElementById('tool-menu');
    const toolSteam = document.getElementById('tool-steam');
    const toolGithub = document.getElementById('tool-github');
    const toolCalculator = document.getElementById('tool-calculator');
    const menuBubbles = document.getElementById('menu-bubbles');
    
    // 延迟显示哆啦A梦
    setTimeout(() => {
        doraemonAvatar.style.opacity = '1';
        doraemonAvatar.style.transform = 'translateY(0)';
    }, 1000);
    
    // 页面加载后立即显示一次对话框
    setTimeout(() => {
        fetchAndShowRandomMessage();
    }, 2000);
    
    // 每30秒显示一次对话框
    setInterval(() => {
        fetchAndShowRandomMessage();
    }, 30000);
    
    // 点击哆啦A梦显示工具菜单
    doraemonAvatar.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // 隐藏所有其他元素
        doraemonDialog.classList.remove('show');
        menuBubbles.classList.remove('show');
        toolSteam.classList.remove('show');
        toolGithub.classList.remove('show');
        toolCalculator.classList.remove('show');
        
        // 显示工具菜单
        toolMenu.classList.add('show');
        
        // 添加按压动画
        doraemonAvatar.classList.add('pressed');
        setTimeout(() => {
            doraemonAvatar.classList.remove('pressed');
        }, 300);
    });
    
    // 点击页面其他地方隐藏对话框和工具
    document.addEventListener('click', (e) => {
        if (e.target !== doraemonAvatar && !doraemonAvatar.contains(e.target) && 
            e.target !== doraemonDialog && !doraemonDialog.contains(e.target) &&
            e.target !== toolMenu && !toolMenu.contains(e.target) &&
            e.target !== toolSteam && !toolSteam.contains(e.target) &&
            e.target !== toolGithub && !toolGithub.contains(e.target) &&
            e.target !== toolCalculator && !toolCalculator.contains(e.target) &&
            e.target !== menuBubbles && !menuBubbles.contains(e.target)) {
            doraemonDialog.classList.remove('show');
            toolMenu.classList.remove('show');
            toolSteam.classList.remove('show');
            toolGithub.classList.remove('show');
            toolCalculator.classList.remove('show');
            menuBubbles.classList.remove('show');
        }
    });
    
    // 点击"电视君"按钮显示Steam工具
    const openSteamBtn = document.getElementById('open-steam');
    openSteamBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toolMenu.classList.remove('show');
        toolSteam.classList.add('show');
        // 加载Steam数据
        loadSteamData();
    });
    
    // 点击"时间望远镜"按钮显示GitHub工具
    const openGithubBtn = document.getElementById('open-github');
    openGithubBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toolMenu.classList.remove('show');
        toolGithub.classList.add('show');
        // 加载GitHub数据
        loadGithubData();
    });
    
    // 点击"算术糖果"按钮显示计算器工具
    const openCalculatorBtn = document.getElementById('open-calculator');
    openCalculatorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toolMenu.classList.remove('show');
        toolCalculator.classList.add('show');
    });
    
    // 点击Steam工具的"返回"按钮
    const closeSteamBtn = document.getElementById('close-steam');
    closeSteamBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toolSteam.classList.remove('show');
        toolMenu.classList.add('show');
    });
    
    // 点击GitHub工具的"返回"按钮
    const closeGithubBtn = document.getElementById('close-github');
    closeGithubBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toolGithub.classList.remove('show');
        toolMenu.classList.add('show');
    });
    
    // 点击计算器工具的"返回"按钮
    const closeCalculatorBtn = document.getElementById('close-calculator');
    closeCalculatorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toolCalculator.classList.remove('show');
        toolMenu.classList.add('show');
    });
    
    // 为菜单选项添加点击事件
    const bubbleOptions = document.querySelectorAll('.bubble-option');
    bubbleOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = option.getAttribute('data-target');
            showSection(target);
            
            // 隐藏菜单选项
            menuBubbles.classList.remove('show');
        });
    });
}

// 加载Steam数据（静态版本）
function loadSteamData() {
    const steamDisplay = document.getElementById('steam-display');
    
    // 显示加载状态
    showSteamLoading();
    
    // 加载静态Steam数据
    loadStaticSteamData();
}

// 显示Steam加载状态
function showSteamLoading() {
    const loadingState = document.getElementById('steam-loading');
    const successState = document.getElementById('steam-success');
    const errorState = document.getElementById('steam-error');
    
    // 隐藏其他状态
    successState.style.display = 'none';
    errorState.style.display = 'none';
    
    // 显示加载状态
    loadingState.style.display = 'flex';
}

// 显示Steam成功状态
function showSteamSuccess(data) {
    const loadingState = document.getElementById('steam-loading');
    const successState = document.getElementById('steam-success');
    const errorState = document.getElementById('steam-error');
    
    // 隐藏其他状态
    loadingState.style.display = 'none';
    errorState.style.display = 'none';
    
    // 更新成功状态内容
    updateSteamInfo(data);
    
    // 显示成功状态
    successState.style.display = 'block';
}

// 显示Steam错误状态
function showSteamError(error) {
    const loadingState = document.getElementById('steam-loading');
    const successState = document.getElementById('steam-success');
    const errorState = document.getElementById('steam-error');
    
    // 隐藏其他状态
    loadingState.style.display = 'none';
    successState.style.display = 'none';
    
    // 显示错误状态
    errorState.style.display = 'flex';
    
    console.error('Steam API错误:', error);
}

// 加载GitHub数据（静态版本）
function loadGithubData() {
    const githubDisplay = document.getElementById('github-display');
    githubDisplay.innerHTML = '<div class="loading">正在加载GitHub信息...</div>';
    
    loadStaticGithubInfo();
}

// 获取并显示随机消息（长久显示版本）
async function fetchAndShowRandomMessage() {
    const doraemonDialog = document.getElementById('doraemon-dialog');
    
    try {
        // 从txt文件中获取消息
        const response = await fetch('messages.txt');
        const text = await response.text();
        const messages = text.split('\n').filter(msg => msg.trim() !== '');
        
        // 随机选择一条消息
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // 显示消息
        const messageElement = doraemonDialog.querySelector('.dialog-content');
        messageElement.textContent = randomMessage;
        doraemonDialog.classList.add('show');
        
        // 不再自动隐藏，而是让用户点击其他地方来隐藏
    } catch (error) {
        console.error('获取消息时出错:', error);
        // 使用默认消息
        const messageElement = doraemonDialog.querySelector('.dialog-content');
        messageElement.textContent = '嘿，我是哆啦A梦！我可以带你去任何地方哦！';
        doraemonDialog.classList.add('show');
        
        // 不再自动隐藏，而是让用户点击其他地方来隐藏
    }
}

// 显示指定部分，隐藏其他部分
function showSection(target) {
    // 隐藏所有部分（除了footer）
    const sections = document.querySelectorAll('section:not(.footer)');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // 显示目标部分
    let targetElement;
    switch(target) {
        case 'home':
            targetElement = document.getElementById('hero');
            break;
        case 'projects':
            targetElement = document.getElementById('projects');
            break;
        case 'steam':
            targetElement = document.getElementById('steam');
            break;
        case 'about':
            targetElement = document.getElementById('about');
            break;
        case 'contact':
            targetElement = document.getElementById('contact');
            break;
        default:
            targetElement = document.getElementById('hero');
    }
    
    if (targetElement) {
        targetElement.style.display = 'block';
        // 滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// 初始化滚动功能
function initScrolling() {
    // 滚动到顶部功能
    window.addEventListener('scroll', () => {
        const scrollTopButton = document.getElementById('scroll-top');
        if (window.pageYOffset > 300) {
            if (!scrollTopButton) {
                // 创建滚动到顶部按钮
                const button = document.createElement('button');
                button.id = 'scroll-top';
                button.innerHTML = '<i class="fas fa-arrow-up"></i>';
                button.onclick = () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                };
                document.body.appendChild(button);
            }
        } else {
            if (scrollTopButton) {
                scrollTopButton.remove();
            }
        }
    });
}

// ========== 旧API函数（已弃用） ========== 
// 这些函数保留是为了向后兼容，但实际使用的是静态数据版本
// 获取所有数据（静态版本）
async function fetchAllData() {
    await Promise.all([
        loadStaticGitHubProjects(),
        loadStaticGitHubUserInfo(),
        loadStaticSteamData()
    ]);
}

// 更新Steam信息显示
function updateSteamInfo(data) {
    const steamInfo = document.getElementById('steam-info');
    const gamesGrid = document.getElementById('recent-games-grid');
    
    // 更新玩家信息
    steamInfo.innerHTML = `
        <img src="${data.playerInfo.avatarfull}" alt="Steam头像" class="player-avatar">
        <h3 class="player-name">${data.playerInfo.personaname}</h3>
        <span class="player-status ${data.playerInfo.personastate > 0 ? 'online' : 'offline'}">
            ${data.playerInfo.personastate > 0 ? '在线' : '离线'}
        </span>
        <div class="info-item">
            <span class="info-label">游戏数量:</span>
            <span class="info-value">${data.gameCount}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Steam ID:</span>
            <span class="info-value">76561199123840298</span>
        </div>
        <div class="info-item">
            <span class="info-label">个人资料:</span>
            <span class="info-value"><a href="https://steamcommunity.com/profiles/76561199123840298" target="_blank">查看</a></span>
        </div>
    `;
    
    // 更新最近游戏列表
    gamesGrid.innerHTML = '';
    if (data.recentGames && data.recentGames.length > 0) {
        data.recentGames.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `
                <div class="game-info">
                    <div class="game-name">${game.name}</div>
                    <div class="game-hours">${Math.round(game.playtime_2weeks / 60 * 100) / 100} 小时 (两周)</div>
                </div>
            `;
            gamesGrid.appendChild(gameCard);
        });
    } else {
        gamesGrid.innerHTML = '<div class="no-games">最近没有玩过游戏</div>';
    }
    
    // 更新游戏计数
    document.getElementById('steam-games').textContent = data.gameCount || 0;
}

// 显示Steam错误信息
function showSteamError() {
    const steamInfo = document.getElementById('steam-info');
    steamInfo.innerHTML = `
        <div class="error-message">
            <p>无法加载Steam信息</p>
            <p><a href="https://steamcommunity.com/profiles/76561199123840298" target="_blank">点击查看我的Steam个人资料</a></p>
        </div>
    `;
    
    const gamesGrid = document.getElementById('recent-games-grid');
    gamesGrid.innerHTML = '<div class="error-message">无法加载游戏列表</div>';
}

// 联系表单提交处理
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 简单验证并显示错误
            let valid = true;
            const errorName = document.getElementById('error-name');
            const errorEmail = document.getElementById('error-email');
            const errorMessage = document.getElementById('error-message');
            errorName.textContent = '';
            errorEmail.textContent = '';
            errorMessage.textContent = '';

            if (!name.trim()) {
                errorName.textContent = '请输入姓名';
                valid = false;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                errorEmail.textContent = '请输入有效的邮箱地址';
                valid = false;
            }
            if (!message.trim() || message.trim().length < 5) {
                errorMessage.textContent = '留言内容不少于 5 个字符';
                valid = false;
            }

            const feedback = document.getElementById('contact-feedback');

            if (!valid) {
                feedback.textContent = '请修正表单错误后再提交。';
                feedback.classList.add('error');
                return;
            }

            // 模拟异步提交（因为没有后端），显示友好反馈
            feedback.textContent = '正在发送...';
            feedback.classList.remove('error');

            setTimeout(() => {
                feedback.textContent = `谢谢你的消息，${name}！我会尽快回复你。`;
                contactForm.reset();
            }, 800);
        });
    }
});

// 社交链接 tooltip 与地图初始化
document.addEventListener('DOMContentLoaded', () => {
    // 社交自定义 tooltip（使用 data-tooltip 属性，替换 title）
    (function setupSocialTooltips(){
        // 创建 tooltip 元素（单例）
        let tooltipEl = document.getElementById('custom-tooltip');
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'custom-tooltip';
            tooltipEl.setAttribute('role', 'tooltip');
            document.body.appendChild(tooltipEl);
        }

        const showTooltip = (el, text, rect) => {
            tooltipEl.textContent = text;
            tooltipEl.style.display = 'block';
            // 基于元素位置设置 tooltip（尽量在上方）
            const top = rect.top - tooltipEl.offsetHeight - 8;
            const left = rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2);
            tooltipEl.style.top = (top > 8 ? top : rect.bottom + 8) + 'px';
            tooltipEl.style.left = Math.max(8, left) + 'px';
            tooltipEl.classList.add('visible');
        };

        const hideTooltip = () => {
            tooltipEl.classList.remove('visible');
            // 保持 display none 一会儿以允许动画
            setTimeout(() => tooltipEl.style.display = 'none', 200);
        };

        const socialCards = document.querySelectorAll('.social-card');
        socialCards.forEach(card => {
            const tip = card.getAttribute('data-tooltip') || card.querySelector('span')?.textContent || '';
            // hover
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                showTooltip(card, tip, rect);
            });
            card.addEventListener('mouseleave', hideTooltip);
            // keyboard focus
            card.addEventListener('focus', (e) => {
                const rect = card.getBoundingClientRect();
                showTooltip(card, tip, rect);
            });
            card.addEventListener('blur', hideTooltip);
            // touch / click: toggle tooltip for accessibility on small devices
            card.addEventListener('click', (e) => {
                // prevent default for placeholders
                const rect = card.getBoundingClientRect();
                if (tooltipEl.style.display === 'block') {
                    hideTooltip();
                } else {
                    showTooltip(card, tip, rect);
                }
            });
        });
    })();

    // 初始化 Leaflet 地图（如果容器存在）
    const mapEl = document.getElementById('contact-map');
    if (mapEl && window.L) {
        // 先加载 contact-data.json
        fetch('./data/contact-data.json')
            .then(r => r.json())
            .then(data => {
                const locations = data.locations || [];
                const defaultCenter = locations.length ? [locations[0].lat, locations[0].lng] : [39.9042, 116.4074];

                const map = L.map('contact-map', { scrollWheelZoom: false }).setView(defaultCenter, 12);

                // 使用 OpenStreetMap 瓦片
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(map);

                // 添加标记
                locations.forEach(loc => {
                    const marker = L.marker([loc.lat, loc.lng]).addTo(map);
                    const popupHtml = `<strong>${loc.name}</strong><br>${loc.description || ''}`;
                    marker.bindPopup(popupHtml);
                });

                // 若只有一个标记，打开弹窗
                if (locations.length === 1) {
                    const single = locations[0];
                    L.marker([single.lat, single.lng]).openPopup();
                }
            })
            .catch(err => {
                console.error('加载 contact-data.json 失败:', err);
                mapEl.innerHTML = '<div class="map-error">无法加载地图数据</div>';
            });
    }
});

// 添加按钮点击效果
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.cta-button, .demo-link, .code-link, .submit-button, .outline-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 添加点击效果
            this.classList.add('clicked');
            
            // 移除点击效果
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
});

// ========== 静态数据加载函数 ==========

// 加载所有静态数据
function loadAllStaticData() {
    loadStaticGitHubProjects();
    loadStaticGitHubUserInfo();
    loadStaticSteamData();
    loadAboutData();
    loadAchievementsData();
}

// 加载关于部分的数据
async function loadAboutData() {
    try {
        const response = await fetch('./data/about-data.json');
        if (!response.ok) {
            throw new Error('无法加载关于数据');
        }
        const data = await response.json();
        
        // 更新个人简介
        updatePersonalInfo(data.personalInfo);
        
        // 更新技能展示
        updateSkillsDisplay(data.skills);
        
        // 更新兴趣爱好
        updateInterestsDisplay(data.interests);
        
    } catch (error) {
        console.error('加载关于数据时出错:', error);
    }
}

// 更新个人简介信息
function updatePersonalInfo(info) {
    document.getElementById('personal-name').textContent = info.name;
    document.getElementById('personal-title').textContent = info.title;
    document.getElementById('personal-bio').textContent = info.bio;
    document.getElementById('personal-location').textContent = info.location;
    document.getElementById('personal-email').textContent = info.email;
    document.getElementById('personal-experience').textContent = info.experience + '经验';
    document.getElementById('personal-projects').textContent = info.projects + '项目';
}

// 更新技能展示
function updateSkillsDisplay(skills) {
    const skillsGrid = document.getElementById('skills-grid');
    skillsGrid.innerHTML = '';
    
    skills.forEach((skill, index) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        // 计算进度条偏移
        const circumference = 2 * Math.PI * 54; // 半径54的圆周长
        const offset = circumference - (skill.level / 100) * circumference;
        
        skillItem.innerHTML = `
            <div class="skill-circle">
                <svg viewBox="0 0 120 120">
                    <circle class="bg-circle" cx="60" cy="60" r="54"></circle>
                    <circle class="progress-circle" cx="60" cy="60" r="54" 
                            style="stroke: ${skill.color}; stroke-dashoffset: ${offset};"></circle>
                </svg>
                <i class="${skill.icon} skill-icon" style="color: ${skill.color};"></i>
            </div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">${skill.level}%</div>
        `;
        
        skillsGrid.appendChild(skillItem);
        
        // 动画效果：当元素进入视口时触发进度条动画
        setTimeout(() => {
            const progressCircle = skillItem.querySelector('.progress-circle');
            if (progressCircle) {
                progressCircle.style.strokeDashoffset = offset;
            }
        }, 100 + index * 200);
    });
}

// 更新兴趣爱好显示
function updateInterestsDisplay(interests) {
    const interestsTags = document.getElementById('interests-tags');
    interestsTags.innerHTML = '';
    
    interests.forEach(interest => {
        const interestTag = document.createElement('span');
        interestTag.className = 'interest-tag';
        interestTag.textContent = interest;
        interestsTags.appendChild(interestTag);
    });
}

// 加载成就证书数据
async function loadAchievementsData() {
    try {
        const response = await fetch('./data/achievements-data.json');
        if (!response.ok) {
            throw new Error('无法加载成就数据');
        }
        const data = await response.json();
        
        updateAchievementsDisplay(data.achievements);
        
    } catch (error) {
        console.error('加载成就数据时出错:', error);
    }
}

// 更新成就证书显示
function updateAchievementsDisplay(achievements) {
    const achievementsGrid = document.getElementById('achievements-grid');
    achievementsGrid.innerHTML = '';
    
    achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = 'achievement-card';
        
        achievementCard.innerHTML = `
            <div class="achievement-category">${achievement.category}</div>
            <img src="${achievement.image}" alt="${achievement.title}" class="achievement-image">
            <div class="achievement-info">
                <h3 class="achievement-title">${achievement.title}</h3>
                <div class="achievement-meta">
                    <span class="achievement-issuer">${achievement.issuer}</span>
                    <span class="achievement-date">${achievement.date}</span>
                </div>
            </div>
        `;
        
        // 添加点击事件，打开灯箱
        achievementCard.addEventListener('click', () => {
            openLightbox(achievement);
        });
        
        achievementsGrid.appendChild(achievementCard);
    });
}

// 打开灯箱
function openLightbox(achievement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxIssuer = document.getElementById('lightbox-issuer');
    const lightboxDate = document.getElementById('lightbox-date');
    
    // 设置灯箱内容
    lightboxImage.src = achievement.image;
    lightboxImage.alt = achievement.title;
    lightboxTitle.textContent = achievement.title;
    lightboxDescription.textContent = achievement.description;
    lightboxIssuer.textContent = achievement.issuer;
    lightboxDate.textContent = achievement.date;
    
    // 显示灯箱
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

// 关闭灯箱
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto'; // 恢复背景滚动
}

// 初始化灯箱功能
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.close-lightbox');
    
    // 点击关闭按钮关闭灯箱
    closeBtn.addEventListener('click', closeLightbox);
    
    // 点击灯箱背景关闭灯箱
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // 按ESC键关闭灯箱
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
}

// 加载静态Steam数据
async function loadStaticSteamData() {
    try {
        const response = await fetch('./data/steam-data.json');
        if (!response.ok) {
            throw new Error('无法加载Steam数据');
        }
        const data = await response.json();
        showSteamSuccess(data);
    } catch (error) {
        console.error('加载Steam数据时出错:', error);
        showSteamError(error);
    }
}

// 加载静态GitHub项目数据
async function loadStaticGitHubProjects() {
    const projectsGrid = document.getElementById('github-projects-grid');
    
    try {
        const response = await fetch('./data/github-data.json');
        if (!response.ok) {
            throw new Error('无法加载GitHub项目数据');
        }
        const data = await response.json();
        
        // 清空加载提示
        projectsGrid.innerHTML = '';
        
        // 显示项目，最多只显示6个
        data.repositories.slice(0, 6).forEach(repo => {
            const projectCard = document.createElement('article');
            projectCard.className = 'project-card';
            
            // 处理项目描述，如果为空则显示默认文本
            const description = repo.description || '暂无项目描述';
            
            // 获取主要语言
            const language = repo.language || '未知';
            
            projectCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${description}</p>
                <div class="tech-tags">
                    <span>${language}</span>
                </div>
                <div class="project-links">
                    ${repo.html_url ? `<a href="${repo.html_url}" class="code-link" target="_blank" rel="noopener noreferrer">查看代码</a>` : ''}
                    ${repo.homepage ? `<a href="${repo.homepage}" class="demo-link" target="_blank" rel="noopener noreferrer">查看演示</a>` : ''}
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        // 更新项目计数
        document.getElementById('project-count').textContent = data.repositories.length;
    } catch (error) {
        console.error('加载GitHub项目数据时出错:', error);
        projectsGrid.innerHTML = '<div class="error">加载项目失败，请访问我的 <a href="https://github.com/OwnApple" target="_blank" rel="noopener noreferrer">GitHub 主页</a> 查看更多项目。</div>';
    }
}

// 加载静态GitHub用户信息
async function loadStaticGitHubUserInfo() {
    try {
        const response = await fetch('./data/github-data.json');
        if (!response.ok) {
            throw new Error('无法加载GitHub用户数据');
        }
        const data = await response.json();
        
        // 更新关注者数量
        document.getElementById('github-followers').textContent = data.userInfo.followers;
    } catch (error) {
        console.error('加载GitHub用户数据时出错:', error);
        // 如果获取失败，显示默认值
        document.getElementById('github-followers').textContent = 'N/A';
    }
}

// 加载静态GitHub数据（用于工具容器）
function loadGithubData() {
    const githubDisplay = document.getElementById('github-display');
    githubDisplay.innerHTML = '<div class="loading">正在加载GitHub信息...</div>';
    
    loadStaticGithubInfo();
}

// 加载静态GitHub信息（用于工具容器）
async function loadStaticGithubInfo() {
    try {
        const response = await fetch('./data/github-data.json');
        if (!response.ok) {
            throw new Error('无法加载GitHub信息');
        }
        const data = await response.json();
        
        // 更新GitHub显示
        updateStaticGithubInfo(data.userInfo, data.repositories.slice(0, 3));
    } catch (error) {
        console.error('加载GitHub信息时出错:', error);
        const githubDisplay = document.getElementById('github-display');
        githubDisplay.innerHTML = `
            <div class="error-message">
                <p>无法加载GitHub信息</p>
                <p><a href="https://github.com/OwnApple" target="_blank">点击查看我的GitHub主页</a></p>
            </div>
        `;
    }
}

// 更新静态GitHub信息显示
function updateStaticGithubInfo(userInfo, reposData) {
    const githubDisplay = document.getElementById('github-display');
    
    // 构建GitHub信息HTML
    githubDisplay.innerHTML = `
        <div class="github-stats">
            <div class="stat-item">
                <div class="stat-number">${userInfo.followers}</div>
                <div class="stat-label">关注者</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${userInfo.public_repos}</div>
                <div class="stat-label">公开仓库</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${userInfo.public_gists}</div>
                <div class="stat-label">Gist</div>
            </div>
        </div>
        <div class="recent-repos">
            <h4>最近的项目</h4>
            ${reposData.map(repo => `
                <div class="repo-item">
                    <div class="repo-name">${repo.name}</div>
                    <div class="repo-description">${repo.description || '暂无描述'}</div>
                    ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

// 初始化计算器
function initCalculator() {
    const display = document.getElementById('calc-display');
    const buttons = document.querySelectorAll('.calc-buttons button');
    
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let shouldResetDisplay = false;
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.value;
            
            // 如果需要重置显示，则清空当前输入
            if (shouldResetDisplay) {
                currentInput = '';
                shouldResetDisplay = false;
            }
            
            // 处理不同类型的按钮
            if (value === 'C') {
                // 清空所有
                currentInput = '';
                operator = '';
                previousInput = '';
                display.value = '';
            } else if (value === '=') {
                // 计算结果
                if (operator && previousInput !== '' && currentInput !== '') {
                    try {
                        let expression = previousInput + operator + currentInput;
                        let result;
                        
                        // 使用eval计算表达式（在这里使用是安全的，因为是简易计算器）
                        result = eval(expression);
                        
                        // 处理除零错误
                        if (!isFinite(result)) {
                            display.value = 'Error';
                        } else {
                            // 保留合适的小数位数
                            if (result % 1 === 0) {
                                display.value = result;
                            } else {
                                display.value = parseFloat(result.toFixed(8));
                            }
                        }
                        
                        // 为下一次计算准备
                        previousInput = result.toString();
                        currentInput = '';
                        operator = '';
                        shouldResetDisplay = true;
                    } catch (e) {
                        display.value = 'Error';
                        currentInput = '';
                        operator = '';
                        previousInput = '';
                    }
                }
            } else if (['+', '-', '*', '/', '%'].includes(value)) {
                // 处理运算符
                if (currentInput !== '' || previousInput !== '') {
                    if (previousInput !== '' && operator !== '' && currentInput !== '') {
                        // 如果已经有表达式，先计算
                        try {
                            let expression = previousInput + operator + currentInput;
                            let result = eval(expression);
                            
                            if (!isFinite(result)) {
                                display.value = 'Error';
                                currentInput = '';
                                operator = '';
                                previousInput = '';
                                return;
                            }
                            
                            previousInput = result.toString();
                            currentInput = '';
                            operator = value;
                            display.value = previousInput + ' ' + value;
                        } catch (e) {
                            display.value = 'Error';
                            currentInput = '';
                            operator = '';
                            previousInput = '';
                        }
                    } else if (currentInput !== '') {
                        // 保存当前输入作为前一个数
                        previousInput = currentInput;
                        currentInput = '';
                        operator = value;
                        display.value = previousInput + ' ' + value;
                    } else if (previousInput !== '') {
                        // 只有前一个数，更新运算符
                        operator = value;
                        display.value = previousInput + ' ' + value;
                    }
                } else if (previousInput !== '' && operator !== '') {
                    // 更新运算符
                    operator = value;
                    display.value = previousInput + ' ' + value;
                }
            } else {
                // 处理数字和小数点
                if (value === '.' && currentInput.includes('.')) {
                    // 防止多个小数点
                    return;
                }
                currentInput += value;
                display.value = currentInput;
            }
        });
    });
}

// ========== 代码清理完成 ========== 
// 所有重复的函数已移除，现在只保留静态数据版本
// 旧API函数已标记为已弃用，实际使用静态数据版本
