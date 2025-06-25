import get from 'lodash/get';

class Files {
  id: number;
  name: string;
  ext: string;
  size: number;
  width: string;
  height: string;
  url: string;

  constructor(json: any) {
    this.id = get(json, 'id');
    this.name = get(json, 'name');
    this.ext = get(json, 'ext');
    this.size = get(json, 'size');
    this.width = get(json, 'width');
    this.height = get(json, 'height');
    this.url = get(json, 'url', '');
  }
}

export default Files;
