import { gql, type TypedDocumentNode } from "@apollo/client";
import type { GetAllTodosQuery } from "generated/type";

export const GET_ALL_TODO: TypedDocumentNode<GetAllTodosQuery> = gql`
  query GetAllTodos {
    getAllTodos {
      ...TodoFields
    }
  }
`;