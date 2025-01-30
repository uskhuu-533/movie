
import { parseAsFloat, createLoader } from 'nuqs/server'
 
// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const genrePageParsers = {
  genre: parseAsFloat,
  page: parseAsFloat.withDefault(1)
}
 
export const loadChangeParams = createLoader(genrePageParsers)