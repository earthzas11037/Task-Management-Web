import get from 'lodash/get';

class QueryOption {
  page: number;
  pageSize: number;
  sort?: string;
  _search?: string;
  locale?: string;
  fetchType?: 'AXIOS' = 'AXIOS';

  constructor(json: any) {
    this.page = get(json, 'page');
    this.pageSize = get(json, 'pageSize');
    this.sort = get(json, 'sort');
    this._search = get(json, '_search');
    this.locale = get(json, 'locale');
  }
}

export default QueryOption;
