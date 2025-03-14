import { Client, Databases, ID, Query } from 'appwrite'

import {
  Movie,
  TrendingMovieDocument,
  TrendingMovieDocumentRequest,
} from './api.types'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

const database = new Databases(client)

const listDocuments = (queries?: string[]) =>
  database.listDocuments<TrendingMovieDocument>(
    DATABASE_ID,
    COLLECTION_ID,
    queries,
  )

const updateDocument = (
  id: string,
  data: Partial<TrendingMovieDocumentRequest>,
) =>
  database.updateDocument<TrendingMovieDocument>(
    DATABASE_ID,
    COLLECTION_ID,
    id,
    data,
  )

const createDocument = (data: TrendingMovieDocumentRequest) =>
  database.createDocument<TrendingMovieDocument>(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    data,
  )

export const updateSearchCount = async (
  movie: Movie,
  query: string,
): Promise<void> => {
  try {
    const {
      documents: [existingDocument],
    } = await listDocuments([Query.equal('movie_id', movie.id)])

    if (existingDocument) {
      await updateDocument(existingDocument.$id, {
        count: existingDocument.count + 1,
      })
    } else {
      await createDocument({
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        query,
      })
    }
  } catch (error) {
    console.error(error)
  }
}

export const getTrendingMovies = async (): Promise<TrendingMovieDocument[]> => {
  try {
    const { documents } = await listDocuments([
      Query.limit(5),
      Query.orderDesc('count'),
    ])

    return documents
  } catch (error) {
    console.error(error)
  }

  return []
}
