export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
}
