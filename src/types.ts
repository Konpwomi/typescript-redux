export interface User {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
  }
  
  export interface UserState {
    user: User[];
    currentUser: User | null;
  }
  
  export interface RootState {
    user: UserState;
  }