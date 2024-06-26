export interface User {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
}

// Define the initial state using that type
export interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}