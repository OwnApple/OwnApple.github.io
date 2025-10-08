// GitHub API helper and loader for projects section
// Provides getGitHubRepos(username) and loadRealGithubData(username)

async function getGitHubRepos(username) {
    const endpoint = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;
    try {
        const headers = { 'Accept': 'application/vnd.github.v3+json' };
        if (window.GITHUB_TOKEN && typeof window.GITHUB_TOKEN === 'string') {
            headers['Authorization'] = `token ${window.GITHUB_TOKEN}`;
        }
        const res = await fetch(endpoint, { headers });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`GitHub API error ${res.status}: ${text}`);
        }
        const repos = await res.json();
        // map to minimal shape
        return repos.map(r => ({
            id: r.id,
            name: r.name,
            html_url: r.html_url,
            description: r.description,
            language: r.language,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            updated_at: r.updated_at
        }));
    } catch (err) {
        console.error('getGitHubRepos error:', err);
        throw err;
    }
}

// Load real GitHub data and render into the projects tool/container
async function loadRealGithubData(username) {
    const githubDisplay = document.getElementById('github-display');
    const projectsGrid = document.getElementById('github-projects-grid');
    const ghchart = document.getElementById('ghchart');

    if (githubDisplay) githubDisplay.innerHTML = '<div class="loading">正在从 GitHub 拉取数据...</div>';
    if (projectsGrid) projectsGrid.innerHTML = '';

    try {
        const repos = await getGitHubRepos(username);
        if (!repos || repos.length === 0) {
            if (projectsGrid) projectsGrid.innerHTML = '<div class="empty">未找到仓库</div>';
            if (githubDisplay) githubDisplay.innerHTML = '';
            return;
        }

        // render top 10 repos by updated_at or stars
        const top = repos.sort((a,b) => (b.stargazers_count - a.stargazers_count)).slice(0, 10);
        if (projectsGrid) {
            projectsGrid.innerHTML = top.map(r => `
                <article class="project-card">
                    <h3><a href="${r.html_url}" target="_blank" rel="noopener noreferrer">${r.name}</a></h3>
                    <p>${r.description ? r.description : ''}</p>
                    <div class="meta">
                        <span class="lang">${r.language || '—'}</span>
                        <span class="stars">⭐ ${r.stargazers_count}</span>
                        <span class="forks">🍴 ${r.forks_count}</span>
                    </div>
                </article>
            `).join('');
        }

        // show gh chart
        if (ghchart) {
            ghchart.src = `https://ghchart.rshah.org/${encodeURIComponent(username)}`;
            ghchart.style.display = 'block';
        }

        if (githubDisplay) githubDisplay.innerHTML = '';
    } catch (err) {
        console.error('loadRealGithubData error', err);
        if (projectsGrid) projectsGrid.innerHTML = `<div class="error">无法加载 GitHub 数据：${err.message}</div>`;
        if (githubDisplay) githubDisplay.innerHTML = `
            <div class="error-message">
                <p>无法加载GitHub信息</p>
                <p><a href="https://github.com/${username}" target="_blank">点击查看我的GitHub主页</a></p>
            </div>
        `;
    }
}

// Export for environments that support modules (not required), otherwise functions are global
window.getGitHubRepos = getGitHubRepos;
window.loadRealGithubData = loadRealGithubData;
