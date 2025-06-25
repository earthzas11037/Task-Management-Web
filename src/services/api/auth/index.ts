import get from 'lodash/get';
import { fetch } from '../../utils/FetchAPI';
import LoginAPIRequest, { LoginBody } from '../../api-request/auth/LoginAPIRequest';
import LoginResponse from '../../../common/models/auth/login.model';
import LogoutAPIRequest from '../../api-request/auth/LogoutAPIRequest';
import SignupAPIRequest, { SignupBody } from '../../api-request/auth/SignupAPIRequest';
import SignupResponse from '../../../common/models/auth/sign-up.model';

export function login(body: LoginBody): Promise<{ token: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new LoginAPIRequest(body);
      const dataJSON = await fetch(apiReuqest);
      const result: LoginResponse = new LoginResponse(get(dataJSON, 'data.data'));

      resolve({
        token: result.accessToken,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function logout(): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new LogoutAPIRequest();
      await fetch(apiReuqest);
      resolve(true);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function signup(body: SignupBody): Promise<{ token: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new SignupAPIRequest(body);
      const dataJSON = await fetch(apiReuqest);
      const result: SignupResponse = new SignupResponse(get(dataJSON, 'data.data'));

      resolve({
        token: result.accessToken,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
