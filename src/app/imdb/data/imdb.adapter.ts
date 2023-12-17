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
    description: adaptDescription(data),
    imageUrl: adaptImageUrl(data),
  };
}

function adaptDescription(data: any): string {
  data = data || {};

  return `${data.titleType || ''} (${data.year || ''})`;
}

function adaptImageUrl(data: any): string {
  data = data || {};

  if (!data.image) {
    return '';
  }

  return String(data.image.url || '');
}
