import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { prisma } from "../lib/prisma.ts";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import type { Resolvers } from "../codegen_types/types.ts";

const result = loadFilesSync(
  `schema/**/*.gql`
);
const typeDefs = mergeTypeDefs(result);

const resolvers: Resolvers = {
  Query: {
    getAllTodos: async() => {
        return await prisma.todo.findMany();
    },
  },
  Mutation: {
    //TODOの新規作成
    createTodo: async(_: unknown, args) => {
      if (!args.title) {
        throw Error("No title is sent");
      }
      return await prisma.todo.create({
        data: {
          title: args.title,
          completed: false
        }
      });
    },
    //TODOの更新
    updateTodo: async(_: unknown, args) => {
      if (!args.id) {
        throw Error("No ID is sent");
      }

      //トランザクション処理
      return prisma.$transaction(async(tx) => {
        //まずはidでデータ取得
        const todo = await tx.todo.findUnique({
          where: {
            id: args.id
          }
        });

        //取得したデータのcompletedの状態を反転
        return await tx.todo.update({
          where: {
            id: args.id
          },
          data: {
            completed: !todo?.completed
          }
        })
      });
    },
    //TODOの削除
    deleteTodo: async(_: Object, args: {id: string}) => {
        return await prisma.todo.delete({
          where: {
            id: args.id
          }
        });
    },
    //TODOの全削除
    deleteAll: async() => {
      await prisma.todo.deleteMany({});
      return true;
    }
  }
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  // context: async (req) => {
  //   console.log(req);
  //   return {};
  // },
  listen: { port: 4000 }
});

console.log(`🚀  Server ready at: ${url}`);