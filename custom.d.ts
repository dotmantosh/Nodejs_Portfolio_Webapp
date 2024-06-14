interface User {
  username: string;
  role: 'admin' | 'user';
  emailVerified: boolean;
  tokens: { token: string }[];
  generateAuthToken(): Promise<string>;
  save(): Promise<User>;
}
declare namespace Express {
  export interface Request {
    user: User;
  }

}