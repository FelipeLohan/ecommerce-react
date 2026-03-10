export type UserDTO = {
  id: number;
  name: string;
  email: string;
};

export type RegisterDTO = {
  name: string;
  email: string;
  phone: string;
  birthDate: string; // "YYYY-MM-DD"
  password: string;
};