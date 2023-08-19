import Claude from 'claude-ai';

export default async function handler(req, res) {

  if(req.method === 'POST') {

    try {
      const claude = new Claude({sessionKey: req.headers.token});

      await claude.init()
      const conversation = await claude.getConversation(req.params.id);

      if (!conversation) {
        return res.status(404).json({error: 'Conversation not found'});
      }

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders();

      const stream = conversation.sendMessage(req.body.message, {
        progress: (data) => res.write(`data: ${JSON.stringify(data)}\\n\\n`)  
      });

      stream.then(data => {
        res.write(`data: ${JSON.stringify(data)}\\n\\n`);
        res.end();
      });

    } catch (err) {
      res.status(500).json({error: 'Failed to send message'});
    }

  }

}
