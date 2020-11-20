import { MemeRepository } from '../../core/domain/MemeRepository'
import { MemeDb } from '../../core/infrastructure/model/MemeDb'

const normalizeSearchQuery = (search: string) =>
  search
    .toLowerCase()
    .trim() //quita espacios antes y después
    .replace(/\s+/g, ' ') //si hay más de 1 espacio entre palabras, deja 1

const filterByTags = (searchQuery: string) =>
  function (meme: MemeDb) {
    const tagsIncludingSearchQuery = meme.tags.filter((tag) =>
      tag.toLowerCase().includes(searchQuery),
    )
    return tagsIncludingSearchQuery.length > 0
  }

export const findRecentMemes = (
  memeRepository: MemeRepository,
  searchQuery: string,
  numberOfMemesToReturn: number,
) => {
  //   let memes = memeRepository.getAll()
  //   let memesWithTags = memes.filter(filterByTags(tagFilter))
  //   let mostRecentMemes = memesWithTags.filter(getMostRecent(numberOfMemesToReturn))

  if (searchQuery.length < 3) {
    throw new Error('La busqueda debe de tener más de 3 caracteres')
  }
  memeRepository.filterByTag(normalizeSearchQuery(searchQuery))
  return memeRepository.findRecent(numberOfMemesToReturn)
}
