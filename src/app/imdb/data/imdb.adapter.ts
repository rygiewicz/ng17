import { Movie } from './imdb.model';

export function adaptMovieList(data: any): Movie[] {
  data = data || {};

  if (!Array.isArray(data.results)) {
    return [];
  }

  return data.results.map(adaptMovie);
}

export function adaptMovie(data: any): Movie {
  data = data || {};

  return {
    id: adaptId(data),
    title: String(data.title || ''),
    description: adaptDescription(data),
    imageUrl: adaptImageUrl(data),
  };
}

function adaptId(data: any): string {
  data = data || {};

  const id = String(data.id || '');

  return id.split('/').slice(2, 3).pop() || '';
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
