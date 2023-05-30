import { jsonRequest } from "../helpers/api.request.helper";
import { baseUrl } from "../helpers/baseUrl";

export const fetchUsers = () => jsonRequest(`${baseUrl}/users`, false, null);

export const fetchUsersPosts = (id: string) =>
  jsonRequest(`${baseUrl}/posts?userId=${id}`, false, null);
