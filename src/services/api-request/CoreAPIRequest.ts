import APIConfig from '../../configs/APIConfig';
import { HTTPMethod } from '../../common/enum/API/HTTPMethod';
import APIRequest from '../../common/interface/APIRequest';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE } from '../../common/contants';

class CoreAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.GET;
  url: string = '';
  setPrefixToken: string = 'Bearer ';
  baseUrl: string = APIConfig.coreAPI || '';

  makeQuery() {}

  makeBody() {}

  makeHeader() {
    const token = this.getToken();
    return {
      Authorization: token ? `Bearer ${token}` : '',
    };
  }

  private getToken(): string | undefined {
    return Cookies.get(TOKEN_COOKIE);
  }
}

export default CoreAPIRequest;
