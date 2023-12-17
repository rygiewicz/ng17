import { Movie } from './imdb.model';

export function adaptMovieList(data: any): Movie[] {
  data = data || {};

  if (!Array.isArray(data.results)) {
    return [];
  }

  return data.results.map(adaptMovie);
}

function adaptMovie(data: any): Movie {
  data = data || {};

  return {
    id: String(data.id || ''),
    title: String(data.title || ''),
    description: `${data.titleType || ''} (${data.year || ''})`,
  };
}
