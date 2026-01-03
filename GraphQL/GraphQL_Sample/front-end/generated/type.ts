export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  deleteAll?: Maybe<Scalars['Boolean']['output']>;
  deleteTodo: Todo;
  updateTodo: Todo;
};


export type MutationCreateTodoArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllTodos?: Maybe<Array<Todo>>;
};

export type Todo = {
  __typename?: 'Todo';
  completed?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type GetAllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTodosQuery = { __typename?: 'Query', getAllTodos?: Array<{ __typename?: 'Todo', id: string, title?: string | null, completed?: boolean | null }> | null };

export type AddTodoMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: string, title?: string | null, completed?: boolean | null } };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo: { __typename?: 'Todo', id: string, title?: string | null, completed?: boolean | null } };

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: string, title?: string | null, completed?: boolean | null } };
