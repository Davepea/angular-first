// export interface Task {
//   id: string;
//   name: string;
// }

// export interface Task {
//   id: string;
//   name: string;
//   description: string;
//   assignedTo: string;
// }

export interface Task {
  id: string;
  name: string;
  description: string;
  userIds: string[];  // or string[] or whatever type it should be
  // other properties
}

