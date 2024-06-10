export type AdminRequest = {
  name: string;
  email: string;
  password: string;
  id_school: string;
};

export type AdminLoginRequest = {
  email: string;
  password: string;
};
