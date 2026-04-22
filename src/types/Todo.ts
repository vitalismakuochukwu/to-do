export type Priority = 'Low' | 'Medium' | 'High';

export interface Todo {
  id: string;
  name: string;
  description?: string;
  category?: string;
  date?: string;
  time?: string;
  priority: Priority;
  fulfillment: number;
  completed: boolean;
}