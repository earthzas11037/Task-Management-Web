import { get } from 'lodash';
import Files from '../../../common/models/files';
import UploadImageAPIReuqest from '../../api-request/upload/UploadImageAPIReuqest';
import { fetch } from '../../utils/FetchAPI';
import QueryOption from '../../../common/models/query-option';
import Task from '../../../common/models/task';
import Pagination from '../../../common/models/pagination';
import GetListTaskAPIRequest from '../../api-request/task/GetListTaskAPIRequest';
import CreateTaskAPIRequest, { CreateTaskBody } from '../../api-request/task/CreateTaskAPIRequest';
import UpdateTaskAPIRequest from '../../api-request/task/UpdateTaskAPIRequest';
import DeleteTaskAPIRequest from '../../api-request/task/DeleteTaskAPIRequest';
import GetTaskDetailAPIRequest from '../../api-request/task/GetTaskDetailAPIRequest';

export function getListTask(query: QueryOption): Promise<{ data: Task[]; pagination: Pagination }> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new GetListTaskAPIRequest(query);
      const dataJSON = await fetch(apiReuqest);
      const result: Task[] = get(dataJSON, 'data.data', []).map((x: any) => new Task(x));
      const pagination: Pagination = new Pagination(get(dataJSON, 'data.pagination'));

      resolve({
        data: result,
        pagination: pagination,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function getDetailTask(id: string | number): Promise<Task> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new GetTaskDetailAPIRequest(id);
      const dataJSON = await fetch(apiReuqest);
      const result: Task = new Task(get(dataJSON, 'data.data'));

      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function createTask(data: CreateTaskBody): Promise<Task> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new CreateTaskAPIRequest(data);
      const dataJSON = await fetch(apiReuqest);
      const result: Task = new Task(get(dataJSON, 'data.data'));

      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function updateTask(data: CreateTaskBody, id: string | number): Promise<Task> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new UpdateTaskAPIRequest(data, id);
      const dataJSON = await fetch(apiReuqest);
      const result: Task = new Task(get(dataJSON, 'data.data'));

      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function deleteTask(ids: number[]): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new DeleteTaskAPIRequest(ids);
      await fetch(apiReuqest);
      resolve(true);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function uploadFilesImage(data: File): Promise<Files> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiRequest = new UploadImageAPIReuqest(data);
      const dataJSON = await fetch(apiRequest);
      const result: Files = new Files(get(dataJSON, 'data.data'));

      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
