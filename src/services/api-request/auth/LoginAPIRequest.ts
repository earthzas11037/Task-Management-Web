import _ from 'lodash';
import { HTTPMethod } from '../../../common/enum/API/HTTPMethod';
import APIConfig from '../../../configs/APIConfig';
import APIRequest from '../../../common/interface/APIRequest';

export interface LoginBody {
  email: string;
  password: string;
}

class LoginAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.POST;
  url: string = `${APIConfig.coreAPI}/auth/login`;
  data: LoginBody;

  constructor(data: LoginBody) {
    this.data = data;
  }

  makeQuery() {
    return {};
  }

  makeBody() {
    return this.data;
  }
}

export default LoginAPIRequest;
