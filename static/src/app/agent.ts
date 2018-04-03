import {User} from "./dashboard/user";

export class Agent1 {
  id: number;
  username: string;
  password: string;
  cellphone: string;
  full_name: string;
  isEmployee: boolean;
  hasRecommAuth: boolean;
  parent_cellphone: string;
  grand_code: string;
  isDeleted: boolean;
  status: boolean;
  user: User;
  created_dt: Date;
}
