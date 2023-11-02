
import { Data } from '../types/Data';
import { User } from '../types/User';
import { client } from '../utils/fetch';
import axios from 'axios';

//const BASE_URL = 'https://technical-task-api.icapgroupgmbh.com/api';

export const getUsers = () => {
  return client.get<Data>(`/table`);
};
export const getUserById = (id: number) => {
  const url = `https://technical-task-api.icapgroupgmbh.com/api/table/${id}`;

  return axios.get<User>(url)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Failed to fetch user with id ${id}: ${error}`);
    });
};

export const deleteUser= (todoId: number) => {
  return client.delete(`/table/${todoId}`);
};

export const createUser = ({ id, name, birthday_date, email, phone_number, address }: User) => {
  return client.post<User>('/table', { id, name, birthday_date, email, phone_number, address });
};

export const updateUser = (id: number, data: Partial<User>) => {
  return client.patch<User>(`/table/${id}/`, data);
};

export const getUsersByUrl = async (url:string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }};