export interface UserDTO {
  id: string;

  email: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  deleted_at: Date | null;
}
