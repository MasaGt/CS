import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//TODOデータ
const todos = [
    {
        id: "1",
        title: "GraphQLの学習",
        completed: false
    },
    {
        id: "2",
        title: "Reactの学習",
        completed: true
    },
]

//operation names
const queryOperation = {
    getAllTodos: "getAllTodos"
}
// const getAllTodos = "getAllTodos";

const mutationOperation = {
    createTodo: "createTodo",
    updateTodo: "updateTodo",
    deleteTodo: "deleteTodo"
}
// const createTodo = "createTodo";
// const updateTodo = "updateTodo";
// const deleteTodo = "deleteTodo";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  #多分スキーマ定義
  type Todo {
    id: ID!
    title: String
    completed: Boolean
  }

  type Query {
    ${queryOperation.getAllTodos}: [Todo!]
  }

  type Mutation {
    ${mutationOperation.createTodo} (title: String): Todo!
    ${mutationOperation.updateTodo} (id: ID!, completed: Boolean): Todo!
    ${mutationOperation.deleteTodo} (id: ID!): Todo!
  }
`;

const resolvers = {
  Query: {
    [queryOperation.getAllTodos]: () => {
        return todos
    },
  },
  Mutation: {
    //TODOの新規作成
    [mutationOperation.createTodo]: (_: Object, args: { title: string }) => {
        console.log(`createTodoのargs: ${args}`);
        const newTodo = {
            id: String(todos.length + 1),
            title: args.title,
            completed: false
        }
        todos.push(newTodo);
        return newTodo;
    },
    //TODOの更新
    [mutationOperation.updateTodo]: (_: Object, args: {id: string, completed: boolean}) => {

        const target = todos.find((todo) => {
            return todo.id === args.id;
        });

        //update対象のTODOがない場合はエラー
        if (!target) {
            throw new Error("TODO not found")
        }

        target.completed = args.completed;
        return target;
    },
    //TODOの削除
    [mutationOperation.deleteTodo]: (_: Object, args: {id: string}) => {
        const targetIndex: number = todos.findIndex((todo) => {
            return todo.id === args.id
        })
        //update対象のTODOがない場合はエラー
        if (targetIndex < 0) {
            throw new Error("TODO not found")
        }
        
        const deletedTodos = todos.splice(targetIndex, 1);
        const deletedTodo = deletedTodos.shift();
        return deletedTodo;
    }
  }
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);