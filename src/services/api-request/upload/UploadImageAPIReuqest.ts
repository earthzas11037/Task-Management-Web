import _ from 'lodash';
import CoreAPIRequest from '../CoreAPIRequest';
import { HTTPMethod } from '../../../common/enum/API/HTTPMethod';
import APIConfig from '../../../configs/APIConfig';

class UploadImageAPIReuqest extends CoreAPIRequest {
  method: HTTPMethod = HTTPMethod.POST;
  url: string = `${APIConfig.coreAPI}/files/upload`;
  formData: FormData;

  constructor(file: File) {
    super();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    this.formData = formData;
  }

  makeQuery() {
    return {};
  }

  makeBody() {
    return this.formData;
  }
}

export default UploadImageAPIReuqest;
