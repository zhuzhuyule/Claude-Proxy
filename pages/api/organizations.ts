import Claude from 'claude-ai';

export default async function handler(req, res) {

  try {
    const claude = new Claude({
      sessionKey: req.headers.token as string,
    });
    await claude.init();
    
    const organizations = await claude.getOrganizations();

    res.status(200).json(organizations);

  } catch (err) {

    res.status(500).json({ error: 'Failed to get organizations' })
  
  }

}
