import { readFileSync } from "node:fs";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import resolvers from "./resolvers";

const port = "4001";

async function main() {
	const typeDefs = gql(
		readFileSync("schema.graphql", {
			encoding: "utf-8",
		}),
	);
	const server = new ApolloServer({
		schema: buildSubgraphSchema({ typeDefs, resolvers }),
	});
	const { url } = await startStandaloneServer(server, {
		listen: { port: Number.parseInt(port) },
	});

	console.log(`🚀  Subgraph ready at ${url}`);
}

main();
