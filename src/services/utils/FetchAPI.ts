import Axios, { type AxiosRequestConfig } from 'axios';
import _, { isEmpty } from 'lodash';
import type APIRequest from '../../common/interface/APIRequest';
import APIResponse from '../../common/models/api/APIResponse';
import { StatusCode } from '../../common/enum/API/StatusCodeEnum';

export function fetch(apiRequest: APIRequest): Promise<APIResponse> {
  const options = createAxiosOptions(apiRequest);
  const startTime = new Date().valueOf();
  return new Promise((resolve, reject) => {
    Axios(options)
      .then((response) => {
        const responseModel = new APIResponse(response.data, response.status == StatusCode.SUCCESS);
        resolve(responseModel);
      })
      .catch(async (err) => {
        if (Axios.isCancel(err)) {
          console.log('REQUEST Cancelled', options);
        }
        try {
          const statusCode = _.get(err, 'response.status');
          if ((statusCode === 403 || statusCode === 401) && !!apiRequest.refreshToken) {
            await apiRequest.refreshToken();
            return resolve(fetch(apiRequest));
          }
        } catch (error) {}
        if (err.response) {
          reject(new APIResponse(err.response.data, false));
        } else {
          reject(new APIResponse(err, false));
        }
      })
      .finally(() => {
        const isServer = typeof window === 'undefined';
        if (!isServer) return;
        console.log(`API Response Time: ${apiRequest.url}`);
        console.log(`API Response Time: ${new Date().valueOf() - startTime} ms`);
        console.log('-----');
      });
  });
}

function createAxiosOptions(apiRequest: APIRequest): AxiosRequestConfig {
  const body = apiRequest.makeBody();
  const isFormData = body instanceof FormData;
  return {
    baseURL: apiRequest.baseUrl ? apiRequest.baseUrl : '',
    url: apiRequest.url,
    timeout: 60000,
    headers: {
      ...(!!apiRequest.makeHeader ? apiRequest.makeHeader() : {}),
    },
    // cancelToken: new CancelToken(c => cancelTokens.push(c)),
    method: apiRequest.method,
    data: isFormData ? body : !isEmpty(body) ? body : undefined,
    params: {
      ...(apiRequest.makeQuery() || {}),
    },
  };
}

export default { fetch };
