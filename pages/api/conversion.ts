import Claude from 'claude-ai';

export default async function handler(req, res) {
  if(req.method === 'GET') {
    try {
      const claude = new Claude({sessionKey: req.headers.token});
      await claude.init()
      const conversations = await claude.getConversations();
      res.status(200).json(conversations);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to get conversations' }); 
    }
  }
}
