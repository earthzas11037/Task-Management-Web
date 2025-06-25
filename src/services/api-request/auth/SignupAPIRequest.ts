import _ from 'lodash';
import { HTTPMethod } from '../../../common/enum/API/HTTPMethod';
import APIConfig from '../../../configs/APIConfig';
import APIRequest from '../../../common/interface/APIRequest';

export interface SignupBody {
  email: string;
  password: string;
}

class SignupAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.POST;
  url: string = `${APIConfig.coreAPI}/auth/signup`;
  data: SignupBody;

  constructor(data: SignupBody) {
    this.data = data;
  }

  makeQuery() {
    return {};
  }

  makeBody() {
    return this.data;
  }
}

export default SignupAPIRequest;
