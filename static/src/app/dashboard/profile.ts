import {User} from "./user";

export class Profile {
  id: number;
  username: string;
  password: string;
  cellphone: string;
  full_name: string;
  isEmployee: boolean;
  hasRecommAuth: boolean;
  parent_code: string;
  grand_code: string;
  isDeleted: boolean;
  status: boolean;
  user: User;
  created_dt: Date;

}
