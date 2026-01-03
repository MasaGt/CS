import { useState, type ReactNode } from "react";
import { todoTitleContext } from "./TodoTitleContext";

const TodoTitleProvider = ({children}: {children: ReactNode}) => {

    const [todoTitle, setTodoTitle] = useState("");

    return <todoTitleContext.Provider value={{todoTitle, setTodoTitle}}>
        {children}
    </todoTitleContext.Provider>
};

export default TodoTitleProvider;