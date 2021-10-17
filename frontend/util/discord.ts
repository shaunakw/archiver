export async function api(endpoint: string): Promise<Record<string, string>> {
  const res = await fetch(`https://discord.com/api/v9${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
      'User-Agent': 'DiscordBot',
    },
  });
  return res.json();
}