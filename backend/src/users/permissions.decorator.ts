import { SetMetadata } from '@nestjs/common';
import { Permission } from './enums/permissions/permission.enum';

export const Permissions = (...args: Permission[]) =>
  SetMetadata('permissions', args);
