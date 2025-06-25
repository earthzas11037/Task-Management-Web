import get from 'lodash/get'

class LoginResponse {
  accessToken: string

  constructor(json: any) {
    this.accessToken = get(json, 'accessToken')
  }
}

export default LoginResponse
