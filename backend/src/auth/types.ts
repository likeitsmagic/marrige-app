import { Permission } from 'src/users/enums/permissions/permission.enum';

export type JWTUser = {
  id: string;
  email: string;
  permissions: Permission[];
};
