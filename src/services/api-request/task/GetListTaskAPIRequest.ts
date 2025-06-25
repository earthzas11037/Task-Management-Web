import _ from 'lodash';
import CoreAPIRequest from '../CoreAPIRequest';
import { HTTPMethod } from '../../../common/enum/API/HTTPMethod';
import APIConfig from '../../../configs/APIConfig';
import QueryOption from '../../../common/models/query-option';

class GetListTaskAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.GET;
  url: string = `${APIConfig.coreAPI}/tasks`;
  query: QueryOption;

  constructor(query: QueryOption) {
    super();
    this.query = query;
  }

  makeQuery() {
    return { ...this.query };
  }

  makeBody() {
    return {};
  }
}

export default GetListTaskAPIRequest;
