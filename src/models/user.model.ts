export interface User {
  id: string;
  userName: string;
  email: string;
  isAdmin: boolean;
  noOfTasks: number;
  taskIds?: string[];
  password?: string; // Add this line
}
