export interface User {
  id: string;
  userName: string;
  email: string;
  isAdmin: boolean;
  taskIds?: string[];  // Optional property to store task IDs
  noOfTasks: number; // Add this line to include noOfTasks
}
