export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  favorite: boolean;
  createdAt: Date;
};

export type Group = {
  id: number;
  title: string;
  createdAt: Date;
};