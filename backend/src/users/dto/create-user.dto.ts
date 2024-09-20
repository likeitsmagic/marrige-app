import { Permission } from '../enums/permissions/permission.enum';

export class CreateUserDto {
  email: string;
  password: string;
  permissions: Permission[];
}
