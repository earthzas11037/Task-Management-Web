import _ from 'lodash';
import CoreAPIRequest from '../CoreAPIRequest';
import { HTTPMethod } from '../../../common/enum/API/HTTPMethod';
import APIConfig from '../../../configs/APIConfig';

class DeleteTaskAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.DELETE;
  url: string = `${APIConfig.coreAPI}/tasks`;
  ids: number[];

  constructor(ids: number[]) {
    super();
    this.ids = ids;
  }

  makeQuery() {
    return {};
  }

  makeBody() {
    return {
      ids: this.ids,
    };
  }
}

export default DeleteTaskAPIRequest;
