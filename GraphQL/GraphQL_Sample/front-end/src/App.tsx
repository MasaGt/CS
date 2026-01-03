import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ALL_TODO } from "./graphql/queries/todo.query";
import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from "./graphql/mutations/todo.mutation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, PlusCircle, MinusCircle } from "lucide-react";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";

function App() {
  const [todoTitle, setTodoTitle] = useState("");

  //TODO全件取得
  const {
    loading: getTodoLoading,
    error: getTodoError,
    data,
  } = useQuery(GET_ALL_TODO);

  //TODO登録
  const [addTodo] = useMutation(ADD_TODO, {
    variables: { title: todoTitle },
    refetchQueries: [GET_ALL_TODO],
  });
  
  //TODO更新
  const [updateTodo] = useMutation(UPDATE_TODO, { refetchQueries: [GET_ALL_TODO] });

  //TODO削除
  const [deleteTodo] = useMutation(DELETE_TODO, { refetchQueries: [GET_ALL_TODO] });

  //TODO登録処理(クライアント側)
  const registerTodo = async () => {
    addTodo().catch((e) => {
      alert(e.message);
    });
    setTodoTitle("");
  };

  if (getTodoLoading) return <p>loading....</p>;

  if (getTodoError) return <p>Error: {getTodoError.message}</p>;

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-teal-50 to-mint-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="bg-linear-to-r from-teal-400 to-emerald-500 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">TODO List</h1>
            <div className="p-6">
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="TODOを追加してください"
                  value={todoTitle}
                  onChange={(e) => setTodoTitle(e.target.value.trim())}
                  className="grow mr-2 bg-teal-50 border-teal-200 focus:ring-2 focus:ring-teal-300 focus:border-transparent"
                />
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={registerTodo}
                >
                  <PlusCircle className="w-5 h-5" />
                </Button>
              </div>

              <AnimatePresence>
                {data?.getAllTodos?.map((todo) => {
                  return (
                    <motion.div
                      key={todo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -100 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center mb-4  p-4 rounded-lg shadow-sm ${
                        todo.completed ? "bg-mint-100" : "bg-white"
                      }`}
                    >
                      <Checkbox
                        id={`todo-${todo.id}`}
                        checked={todo.completed ? true : false}
                        onClick={() =>
                          updateTodo({ variables: { id: todo.id } })
                        }
                        className="mr-3 border-teal-400 text-teal-500"
                      />

                      <label
                        htmlFor={`todo-${todo.id}`}
                        className={`grow text-lg ${
                          todo.completed
                            ? "line-through text-teal-600"
                            : "text-gray-800"
                        }`}
                      >
                        {todo.title}
                      </label>

                      {todo.completed && (
                        <CheckCircle2 className="w-5 h-5 text-amber-500 mx-2" />
                      )}

                      <Button
                        className="bg-rose-500 hover:bg-rose-600 text-white"
                        onClick={() =>
                          deleteTodo({ variables: { id: todo.id } })
                        }
                      >
                        <MinusCircle className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            {data?.getAllTodos?.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white mt-6"
              >
                タスクがありません
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default App;
