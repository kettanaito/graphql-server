import { Controller } from '@classes';
import { normalizeSong } from './selectors';
import { arrayUtils } from '@utils';

export default class SongController extends Controller {
  url = 'https://itunes.apple.com/search'

  getByTitle({ term, first }) {
    const params = {
      url: this.url,
      query: {
        term: term
      },
      transformResponse(res) {
        return arrayUtils.takeFirst(res.results, first).map(normalizeSong);
      }
    };

    return this.request(params);
  }
}
