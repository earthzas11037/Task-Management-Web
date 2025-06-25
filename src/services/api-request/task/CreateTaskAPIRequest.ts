import _ from 'lodash';
import CoreAPIRequest from '../CoreAPIRequest';
import { HTTPMethod } from '../../../common/enum/API/HTTPMethod';
import APIConfig from '../../../configs/APIConfig';
import { TaskStatusEnum } from '../../../common/enum/TaskStatusEnum';

export interface CreateTaskBody {
  title: string;
  description?: string;
  status?: TaskStatusEnum;
  imageIds?: number[];
}

class CreateTaskAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.POST;
  url: string = `${APIConfig.coreAPI}/tasks`;
  data: CreateTaskBody;

  constructor(data: CreateTaskBody) {
    super();
    this.data = data;
  }

  makeQuery() {
    return {};
  }

  makeBody() {
    return this.data;
  }
}

export default CreateTaskAPIRequest;
