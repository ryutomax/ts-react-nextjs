export type Todo = {
  id: number;
  name: string;
  completed: boolean;
  favorite: boolean;
  createdAt: Date;
};

export type Group = {
  id: number;
  name: string;
  createdAt: Date;
};