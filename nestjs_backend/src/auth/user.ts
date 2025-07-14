import { Role } from '../usuario/role.enum';

export class User {
  constructor(name: string, roles: Role[]) {
    this.name = name;
    this.roles = roles;
  }

  name: string;
  roles: Role[];
}
