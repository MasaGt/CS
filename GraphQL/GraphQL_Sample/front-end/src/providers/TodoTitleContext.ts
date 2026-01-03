import { createContext } from "react";

type todoTitleContextType = {
todoTitle: string;
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
}
export const todoTitleContext = createContext<todoTitleContextType>({});