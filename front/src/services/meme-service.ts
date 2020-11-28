import { MemeDetail } from '../dtos/MemeDetail';
import { MemeThumb } from '../dtos/MemeThumb';

const apiUrl = process.env.REACT_APP_DEV_API;

export async function getRecentMemes(): Promise<Array<MemeThumb>> {
  let promise = new Promise<Array<MemeThumb>>((resolve, reject) => {
    fetch(`${apiUrl}/memes`)
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
    fetch(`${apiUrl}/search/${term}`)
      .then((rsp) => rsp.json())
      .then((memesData) => resolve(memesData.memes))
      .catch((err) => reject(err));
  });
  return promise;
}

export async function getMemeById(id: string): Promise<MemeDetail> {
  let promise = new Promise<MemeDetail>((resolve, reject) => {
    fetch(`${apiUrl}/meme/${id}`)
      .then((rsp) => rsp.json())
      .then((memeData) => resolve(memeData))
      .catch((err) => reject(err));
  });
  return promise;
}
