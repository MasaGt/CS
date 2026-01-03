import type { CodegenConfig } from "@graphql-codegen/cli";
import 'dotenv/config';

const config: CodegenConfig = {
    schema: process.env.VITE_SCHEMA,
    documents: "src/**/*.{ts,tsx}",
    generates: {
        "./generated/type.ts": {
            plugins: [
                'typescript',
                'typescript-operations'
            ]
        }
    }
};

export default config;