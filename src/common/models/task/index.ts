import get from 'lodash/get';
import Files from '../files';
import { TaskStatusEnum } from '../../enum/TaskStatusEnum';

class Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatusEnum;
  images: Files[];
  createdAt: string;
  updatedAt: string;

  constructor(json: any) {
    this.id = get(json, 'id');
    this.title = get(json, 'title');
    this.description = get(json, 'description');
    this.status = get(json, 'status');
    this.images = get(json, 'images', []).map((x: any) => new Files(x));
    this.createdAt = get(json, 'createdAt');
    this.updatedAt = get(json, 'updatedAt');
  }
}

export default Task;
