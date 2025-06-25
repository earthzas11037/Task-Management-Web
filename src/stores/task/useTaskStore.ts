import { create } from 'zustand';
import Task from '../../common/models/task';
import Pagination from '../../common/models/pagination';
import QueryOption from '../../common/models/query-option';
import Files from '../../common/models/files';
import { createTask, deleteTask, getDetailTask, getListTask, updateTask, uploadFilesImage } from '../../services/api/task';
import { CreateTaskBody } from '../../services/api-request/task/CreateTaskAPIRequest';

interface TaskStore {
  tasks: Task[];
  taskDetail?: Task;
  pagination: Pagination;
  isInitLoading: boolean;
  isLoading: boolean;
  error: string | null;

  fetchTasks: (query: QueryOption) => Promise<void>;
  fetchTaskDetail: (id: number) => Promise<void>;
  createTask: (data: CreateTaskBody) => Promise<void>;
  updateTask: (data: CreateTaskBody, id: number) => Promise<void>;
  deleteTask: (ids: number[]) => Promise<void>;
  uploadImage: (file: File) => Promise<Files | null>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  taskDetail: undefined,
  pagination: new Pagination({}),
  isInitLoading: false,
  isLoading: false,
  error: null,

  fetchTasks: async (query) => {
    set({ isInitLoading: true, error: null });
    try {
      const { data, pagination } = await getListTask(query);
      set({ tasks: data, pagination });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isInitLoading: false });
    }
  },

  fetchTaskDetail: async (id) => {
    set({ isInitLoading: true, error: null });
    try {
      const task = await getDetailTask(id);
      set({ taskDetail: task });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isInitLoading: false });
    }
  },

  createTask: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const createdTask = await createTask(data);
      set((state) => {
        const newTasks = [...state.tasks, createdTask];
        return {
          tasks: newTasks,
          isLoading: false,
        };
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateTask: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTask = await updateTask(data, id);
      set((state) => {
        const newTasks = [...state.tasks];
        const index = newTasks.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          newTasks.splice(index, 1, updatedTask);
        } else {
          newTasks.push(updatedTask);
        }

        return {
          tasks: newTasks,
          isLoading: false,
          error: null,
        };
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  deleteTask: async (ids) => {
    set({ isLoading: true, error: null });
    try {
      await deleteTask(ids);
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  uploadImage: async (file) => {
    set({ isLoading: true, error: null });
    try {
      const uploaded = await uploadFilesImage(file);
      return uploaded;
    } catch (error: any) {
      set({ error: error.message });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));
