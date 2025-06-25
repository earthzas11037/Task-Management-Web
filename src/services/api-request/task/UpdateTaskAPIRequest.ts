import _ from 'lodash';
import CoreAPIRequest from '../CoreAPIRequest';
import { HTTPMethod } from '../../../common/enum/API/HTTPMethod';
import APIConfig from '../../../configs/APIConfig';
import { CreateTaskBody } from './CreateTaskAPIRequest';

class UpdateTaskAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.PUT;
  url: string = `${APIConfig.coreAPI}/tasks/:id`;
  data: CreateTaskBody;

  constructor(data: CreateTaskBody, id: string | number) {
    super();
    this.url = this.url.replace(':id', String(id));
    this.data = data;
  }

  makeQuery() {
    return {};
  }

  makeBody() {
    return this.data;
  }
}

export default UpdateTaskAPIRequest;
