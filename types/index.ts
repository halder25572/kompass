export interface Book {
  id: string;
  title: string;
  pages: number;
  dueDate: string;
  status: "In Progress" | "Completed" | "Draft";
  progress: number;
}

export interface Activity {
  id: string;
  message: string;
  timeAgo: string;
  color: "rose" | "blue" | "green";
}

export interface User {
  name: string;
  email: string;
}