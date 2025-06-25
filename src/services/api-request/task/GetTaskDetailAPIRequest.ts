import _ from 'lodash';
import CoreAPIRequest from '../CoreAPIRequest';
import { HTTPMethod } from '../../../common/enum/API/HTTPMethod';
import APIConfig from '../../../configs/APIConfig';

class GetTaskDetailAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.GET;
  url: string = `${APIConfig.coreAPI}/tasks/:id`;

  constructor(id: string | number) {
    super();
    this.url = this.url.replace(':id', String(id));
  }

  makeQuery() {
    return {};
  }

  makeBody() {
    return {};
  }
}

export default GetTaskDetailAPIRequest;
