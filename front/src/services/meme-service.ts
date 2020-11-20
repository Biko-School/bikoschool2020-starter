import { MemeThumb } from '../dtos/MemeThumb';
import apiUrl from './api-url';

export async function getRecentMemes(): Promise<Array<MemeThumb>> {
  let promise = new Promise<Array<MemeThumb>>((resolve, reject) => {
    fetch(apiUrl.recentMemes())
      .then((rsp) => rsp.json())
      .then((memesData) => resolve(memesData.memes))
      .catch((err) => reject(err));
  });
  return promise;
}

export async function getMemesBySearchTerm(
  term: string,
): Promise<Array<MemeThumb>> {
  let promise = new Promise<Array<MemeThumb>>((resolve, reject) => {
    fetch(apiUrl.searchMemes(term))
      .then((rsp) => rsp.json())
      .then((memesData) => resolve(memesData.memes))
      .catch((err) => reject(err));
  });
  return promise;
}
