import _ from 'lodash';
import CoreAPIRequest from '../CoreAPIRequest';
import { HTTPMethod } from '../../../common/enum/API/HTTPMethod';
import APIConfig from '../../../configs/APIConfig';

class LogoutAPIRequest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.POST;
  url: string = `${APIConfig.coreAPI}/auth/logout`;

  constructor() {
    super();
  }

  makeQuery() {
    return {};
  }

  makeBody() {
    return {};
  }
}

export default LogoutAPIRequest;
