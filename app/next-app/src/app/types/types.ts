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

export type SearchCondition = {
  name?: {
    contains: string;
    mode?: "insensitive" | "default";
  };
  completed?: boolean;
  favorite?: boolean;
};

export type CreateCondition = {
  name?: string;
  completed?: boolean;
  favorite?: boolean;
  groupId?: number;
};