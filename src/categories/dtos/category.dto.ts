import { UserDTO } from 'src/users/dtos/user.dto';

export interface CategoryDTO {
  id: string;

  user_id: string;

  name: string;

  created_at: Date;

  owner?: UserDTO;
}
