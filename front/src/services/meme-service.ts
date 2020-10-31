import { RecentMemesData } from '../../../api/memesInterfaces';

export async function getRecentMemes(): Promise<RecentMemesData> {
  const response = await fetch('http://localhost:3001/api/memes');
  const memesData: RecentMemesData = await response.json();
  return memesData;
}
