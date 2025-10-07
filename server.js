const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3002; // 更改端口号

// 设置静态文件目录
app.use(express.static(path.join(__dirname)));

// 中间件
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Steam API配置（从环境变量读取以避免在仓库中泄露密钥）
const STEAM_API_KEY = process.env.STEAM_API_KEY || null; // 请在本地通过 .env 或环境变量提供
const STEAM_ID = process.env.STEAM_ID || '76561199123840298';

if (!STEAM_API_KEY) {
    console.warn('WARNING: STEAM_API_KEY is not set. /api/steam/info will return an error. For local dev you can set STEAM_API_KEY in your environment or use fetch-steam.js to populate data/steam-data.json.');
}

// 获取Steam信息的端点
app.get('/api/steam/info', async (req, res) => {
    try {
        // 获取玩家摘要信息
        const playerResponse = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`);
        
        // 获取游戏列表
        const gamesResponse = await axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`);
        
        // 获取最近玩过的游戏
        const recentGamesResponse = await axios.get(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`);
        
        const playerInfo = playerResponse.data.response.players[0];
        const gameCount = gamesResponse.data.response?.game_count || 0;
        const recentGames = recentGamesResponse.data.response?.games || [];
        
        res.json({
            success: true,
            data: {
                playerInfo: {
                    personaname: playerInfo.personaname,
                    profileurl: playerInfo.profileurl,
                    avatarfull: playerInfo.avatarfull,
                    personastate: playerInfo.personastate, // 0: offline, 1: online, etc.
                    timecreated: playerInfo.timecreated
                },
                gameCount: gameCount,
                recentGames: recentGames.slice(0, 5) // 只返回最近5个游戏
            }
        });
    } catch (error) {
        console.error('获取Steam信息时出错:', error.message);
        res.status(500).json({ 
            success: false, 
            error: '无法获取Steam信息',
            details: error.message 
        });
    }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 接收联系表单（仅本地开发使用）
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, message } = req.body || {};
        // 简单验证
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: '缺少必要字段' });
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ success: false, error: '邮箱格式不正确' });
        }

        const contactsPath = path.join(__dirname, 'data', 'contacts.json');
        let contacts = [];
        if (fs.existsSync(contactsPath)) {
            try {
                const raw = fs.readFileSync(contactsPath, 'utf8');
                contacts = JSON.parse(raw || '[]');
            } catch (e) {
                contacts = [];
            }
        }

        const entry = {
            id: Date.now(),
            name: String(name).trim(),
            email: String(email).trim(),
            message: String(message).trim(),
            createdAt: new Date().toISOString()
        };

        contacts.push(entry);
        fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');

        return res.json({ success: true, data: entry });
    } catch (err) {
        console.error('处理 /api/contact 时出错:', err);
        return res.status(500).json({ success: false, error: '服务器错误' });
    }
});

// 所有其他路由都返回index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
    console.log(`访问 http://localhost:${PORT} 查看你的作品集`);
});

module.exports = app;