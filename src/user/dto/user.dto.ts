export interface UserDto {
  id: number;
  name: string;
  surname: string;
  email: string;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date;
}
