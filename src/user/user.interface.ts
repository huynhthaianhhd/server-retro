export interface UserData {
    email: string;
    name:string;
    token: string;
  }
  
  export interface UserRO {
    user: UserData;
  }