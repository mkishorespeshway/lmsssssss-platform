
export const getVideoPlatform = (url: string): 'youtube' | 'vimeo' | 'other' => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  if (url.includes('vimeo.com')) {
    return 'vimeo';
  }
  return 'other';
};

export const getYouTubeVideoId = (url: string): string | null => {
  const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
};

export const getVimeoVideoId = (url: string): string | null => {
  const vimeoRegex = /(?:vimeo\.com\/(?:video\/)?)([^"&?/ ]+)/i;
  const match = url.match(vimeoRegex);
  return match ? match[1] : null;
};

// Helper to convert YouTube's ISO 8601 duration to HH:MM:SS
const convertYouTubeDurationToISO = (isoDuration: string): string => {
  const regex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  if (!matches) {
    return "00:00";
  }

  const days = parseInt(matches[1] || "0", 10);
  const hours = parseInt(matches[2] || "0", 10) + days * 24;
  const minutes = parseInt(matches[3] || "0", 10);
  const seconds = parseInt(matches[4] || "0", 10);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const format = (num: number) => num.toString().padStart(2, "0");

  if (h > 0) {
    return `${format(h)}:${format(m)}:${format(s)}`;
  }
  return `${format(m)}:${format(s)}`;
};

export const fetchYouTubeVideoDuration = async (videoId: string): Promise<string | null> => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!API_KEY) {
    console.error("YouTube API key is not set.");
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const duration = data.items[0].contentDetails.duration;
      return convertYouTubeDurationToISO(duration);
    }
    return null;
  } catch (error) {
    console.error("Error fetching YouTube video duration:", error);
    return null;
  }
};

export const fetchVimeoVideoDuration = async (videoId: string): Promise<string | null> => {
  const ACCESS_TOKEN = import.meta.env.VITE_VIMEO_ACCESS_TOKEN;
  if (!ACCESS_TOKEN) {
    console.error("Vimeo access token is not set.");
    return null;
  }

  try {
    const response = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();

    if (data.duration) {
      const totalSeconds = data.duration;
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      const format = (num: number) => num.toString().padStart(2, "0");

      if (h > 0) {
        return `${format(h)}:${format(m)}:${format(s)}`;
      }
      return `${format(m)}:${format(s)}`;
    }
    return null;
  } catch (error) {
    console.error("Error fetching Vimeo video duration:", error);
    return null;
  }
};
