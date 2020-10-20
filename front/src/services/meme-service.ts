export interface MemeThumb {
  id: string;
  title: string;
  url: string;
}

export interface RecentMemesData {
  memes: Array<MemeThumb>;
}

export async function getRecentMemes(): Promise<RecentMemesData> {
  const response = await fetch("/memes/recent");
  const memesData: RecentMemesData = await response.json();
  return memesData;
}
