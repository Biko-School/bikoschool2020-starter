import { MemeThumbList } from '../../../api/memesInterfaces';

export async function getRecentMemes(): Promise<MemeThumbList> {
  const response = await fetch('http://localhost:3001/api/memes');
  const memesData: MemeThumbList = await response.json();
  return memesData;
}
