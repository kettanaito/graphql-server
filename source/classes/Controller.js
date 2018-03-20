import DataLoader from 'dataloader';

export default class Controller {
  constructor() {
    /**
     * Create a controller-specific instance of DataLoader.
     * https://github.com/facebook/dataloader
     */
    this.loader = new DataLoader((keys) => {
      return Promise.all(keys.map((key) => {
        return this.fetch(key);
      }));
    });

    return this;
  }
}
