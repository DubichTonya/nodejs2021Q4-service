export interface IUsersResponse {
  id: string;
  name: string;
  login: string;
}

export interface IUsersBody {
  name?: string;
  login: string;
  password: string;
}
