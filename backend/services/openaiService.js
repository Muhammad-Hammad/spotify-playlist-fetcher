const OpenAI = require('openai');

const determineMood = async (moodInput) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({
      apiKey,
    });
    const messages = [
      {
        role: 'system',
        content:
          'You are a music recommendation assistant with expertise in creating search queries for music streaming platforms.',
      },
      {
        role: 'user',
        content: `Generate a concise Spotify search query to find playlists or tracks that fit the mood or activity described as "${moodInput}".`,
      },
    ];

   
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', 
      messages: messages,
      max_tokens: 50,
    });

    // Extract the response message content
    const moodOutput = completion.choices[0].message.content.trim();
    return moodOutput;
  } catch (error) {
    console.error('Error in determining mood using ChatGPT', error);
    throw new Error('Unable to determine mood');
  }
};

module.exports = {
  determineMood,
};
