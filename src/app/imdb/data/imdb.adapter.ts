import { Movie } from './imdb.model';

export function adaptAutocomplete(data: any): Movie[] {
  data = data || {};

  if (!Array.isArray(data.d)) {
    return [];
  }

  return data.d.map(adaptAutocompleteItem);
}

function adaptAutocompleteItem(data: any): Movie {
  data = data || {};

  return {
    id: String(data.id || ''),
    title: String(data.l || ''),
    description: `${data.qid || ''} (${data.y || ''})`,
    imageUrl: '',
    synopsis: '',
  };
}

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
    id: adaptId(data),
    title: String(data.title || ''),
    description: adaptDescription(data),
    imageUrl: adaptImageUrl(data),
    synopsis: '',
  };
}

export function adaptMovieDetails(movieData: any, synopsisData: any): Movie {
  const movie = adaptMovie(movieData);

  movie.synopsis = adaptSynopsis(synopsisData);

  return movie;
}

function adaptSynopsis(data: any): string {
  if (!Array.isArray(data) || !data.length) {
    return '';
  }

  return String(data[0].text || '');
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
