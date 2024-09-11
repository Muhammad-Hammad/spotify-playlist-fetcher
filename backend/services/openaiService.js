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
        content: `give me one word or group of words of concise Spotify search query to find playlists or tracks that fit the mood or activity described as "${moodInput} without any other text".`,
      },
    ];

   
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', 
      messages: messages,
      max_tokens: 5,
    });

    const moodOutput = completion.choices[0].message.content.trim();
    return moodOutput;
  } catch (error) {
    console.error('Error in determining mood using ChatGPT', error);
    throw new Error('Unable to determine mood');
  }
};

const generateMoodPlaylistName = async (userPrompt) => {
  
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({
      apiKey,
    });
    const messages = [
      {
        role: 'system',
        content:
          'You are a music assistant that specializes in creating short playlist names based on mood, activities, or themes.',
      },
      {
        role: 'user',
        content: `Generate a concise Spotify playlist name for this input: "${userPrompt}". Please return just one word or a short group of words with no additional text.`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', 
      messages: messages,
      max_tokens: 5,
    });

    const playlistName = completion.choices[0].message.content.trim();
    return playlistName;
  } catch (error) {
    console.error('Error generating playlist name using OpenAI:', error);
    throw new Error('Unable to generate playlist name');
  }
};

const generatePlaylistNameForSongMatch = async (songName) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({
      apiKey,
    });

    const messages = [
      {
        role: 'system',
        content:
          'You are a music playlist assistant that specializes in creating playlist names based on a song\'s theme, genre, and mood. Ensure the song\'s name or theme is reflected in the playlist name.',
      },
      {
        role: 'user',
        content: `Give me a concise playlist name that suggests that the song "${songName}" is part of the playlist. The playlist name should reflect the song's theme, mood, or genre. Only return the playlist name without any other text.`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', 
      messages: messages,
      max_tokens: 10,
    });

    const playlistName = completion.choices[0].message.content.trim();
    return playlistName;
  } catch (error) {
    console.error('Error in generating playlist name for song match:', error);
    throw new Error('Unable to generate playlist name');
  }
};


const generatePlaylistNameForArtistMatch = async (artistName) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({
      apiKey,
    });

    const messages = [
      {
        role: 'system',
        content:
          'You are a music playlist assistant that specializes in creating playlist names based on an artist\'s name, genre, or overall vibe. Ensure the artist\'s name or style is reflected in the playlist name.',
      },
      {
        role: 'user',
        content: `Give me a concise playlist name that suggests that the artist "${artistName}" is the focus of the playlist. The playlist name should reflect their music style, genre, or name. Only return the playlist name without any other text.`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', 
      messages: messages,
      max_tokens: 10,
    });

    const playlistName = completion.choices[0].message.content.trim();
    return playlistName;
  } catch (error) {
    console.error('Error in generating playlist name for artist match:', error);
    throw new Error('Unable to generate playlist name');
  }
};



const generateTrackNamesForMoodGenerator = async (playlistName) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey });

    const messages = [
      {
        role: 'system',
        content: 'You are a music assistant that specializes in generating track names based on moods or activities.',
      },
      {
        role: 'user',
        content: `Give me a list of track names that fit the mood or activity described as "${playlistName}". Only return the names in a comma-separated format without any additional text.`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      max_tokens: 100,
    });

    const trackNames = completion.choices[0].message.content.trim().split(',').map(track => track.trim());
    return trackNames;
  } catch (error) {
    console.error('Error generating track names for Mood Generator using OpenAI:', error);
    throw new Error('Unable to generate track names for Mood Generator');
  }
};
const generateTrackNamesForSongMatch = async (playlistName, originalSongName) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey });

    const messages = [
      {
        role: 'system',
        content: 'You are a music assistant that specializes in generating track names similar to a given song.',
      },
      {
        role: 'user',
        content: `Given the original song "${originalSongName}" and the playlist named "${playlistName}", provide a list of similar track names including the original song. Only return the names in a comma-separated format without any additional text.`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      max_tokens: 100,
    });

    const trackNames = completion.choices[0].message.content.trim().split(',').map(track => track.trim());
    return trackNames;
  } catch (error) {
    console.error('Error generating track names for Song Match using OpenAI:', error);
    throw new Error('Unable to generate track names for Song Match');
  }
};
const generateTrackNamesForArtistMatch = async (playlistName, originalArtistName) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey });

    const messages = [
      {
        role: 'system',
        content: 'You are a music assistant that specializes in generating track names based on an artist and similar tracks.',
      },
      {
        role: 'user',
        content: `Given the original artist "${originalArtistName}" and the playlist named "${playlistName}", provide a list of track names including songs by the artist and similar tracks. Only return the names in a comma-separated format without any additional text.`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      max_tokens: 100,
    });

    const trackNames = completion.choices[0].message.content.trim().split(',').map(track => track.trim());
    return trackNames;
  } catch (error) {
    console.error('Error generating track names for Artist Match using OpenAI:', error);
    throw new Error('Unable to generate track names for Artist Match');
  }
};






module.exports = {
  determineMood,
  generateMoodPlaylistName,
  generatePlaylistNameForSongMatch,
  generatePlaylistNameForArtistMatch,
  generateTrackNamesForMoodGenerator,
  generateTrackNamesForSongMatch,
  generateTrackNamesForArtistMatch
};
