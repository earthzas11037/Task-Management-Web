import get from 'lodash/get';

class SignupResponse {
  accessToken: string;

  constructor(json: any) {
    this.accessToken = get(json, 'accessToken');
  }
}

export default SignupResponse;
