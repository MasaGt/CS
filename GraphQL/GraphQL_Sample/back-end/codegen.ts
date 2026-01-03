//codegen用設定ファイル
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "schema/**/*.gql",
    generates: {
    './codegen_types/types.ts': {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
  ignoreNoDocuments: true,
}

export default config