import { gql } from "@apollo/client";

export const TODO_FRAGMENT = gql`
    fragment TodoFields on Todo {
        id
        title
        completed
    }
`;