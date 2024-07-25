export interface UserItem {
  userId: number,
  username: string,
  password: string,
  lastName: string,
  firstName: string,
  permissions: string,
}

export interface VacuumItem {
  id: number;
  name: string;
  status: string;
  createdDate: string;
  addedBy: {
    username: string;
  };
  active: boolean;
}

export interface ErrorMessage {
  date: string;
  usisivacId: number;
  user:{
    name: string;
  }
  operation: string;
  message: string;
}
