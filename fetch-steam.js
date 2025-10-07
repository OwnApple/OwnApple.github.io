const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Usage:
// - Set env var STEAM_API_KEY and optional STEAM_ID, then run: `node fetch-steam.js`
// - Or pass API key as first arg: `node fetch-steam.js YOUR_KEY`

const STEAM_API_KEY = process.env.STEAM_API_KEY || process.argv[2];
const STEAM_ID = process.env.STEAM_ID || '76561199123840298';

if (!STEAM_API_KEY) {
  console.error('Missing Steam API key. Set STEAM_API_KEY env or pass it as the first argument.');
  process.exit(1);
}

async function fetchSteamData() {
  try {
    const playerUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`;
    const gamesUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`;
    const recentUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`;

    const [playerRes, gamesRes, recentRes] = await Promise.all([
      axios.get(playerUrl),
      axios.get(gamesUrl),
      axios.get(recentUrl)
    ]);

    const player = playerRes.data.response.players && playerRes.data.response.players[0] ? playerRes.data.response.players[0] : {};
    const gameCount = gamesRes.data.response && gamesRes.data.response.game_count ? gamesRes.data.response.game_count : 0;
    const recentGames = recentRes.data.response && recentRes.data.response.games ? recentRes.data.response.games : [];

    const out = {
      playerInfo: {
        personaname: player.personaname || '',
        avatarfull: player.avatarfull || '',
        personastate: player.personastate || 0,
        profileurl: player.profileurl || ''
      },
      gameCount: gameCount,
      recentGames: recentGames.map(g => ({
        name: g.name,
        appid: g.appid,
        playtime_2weeks: g.playtime_2weeks || 0,
        playtime_forever: g.playtime_forever || 0,
        img_icon_url: g.img_icon_url || '',
        img_logo_url: g.img_logo_url || ''
      }))
    };

    const outPath = path.join(__dirname, 'data', 'steam-data.json');
    fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
    console.log(`Saved Steam data to ${outPath}`);
  } catch (err) {
    console.error('Failed to fetch Steam data:', err.message || err);
    process.exit(2);
  }
}

fetchSteamData();
