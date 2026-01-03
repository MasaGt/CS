import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
  AddTodoMutation,
  AddTodoMutationVariables,
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
} from "generated/type";


export const ADD_TODO: TypedDocumentNode<
  AddTodoMutation,
  AddTodoMutationVariables
> = gql`
  mutation AddTodo($title: String) {
    createTodo(title: $title) {
      ...TodoFields
    }
  }
`;

export const UPDATE_TODO: TypedDocumentNode<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
> = gql`
  mutation UpdateTodo($id: ID!) {
    updateTodo(id: $id) {
      ...TodoFields
    }
  }
`;

export const DELETE_TODO: TypedDocumentNode<
  DeleteTodoMutation,
  DeleteTodoMutationVariables
> = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      ...TodoFields
    }
  }
`;
