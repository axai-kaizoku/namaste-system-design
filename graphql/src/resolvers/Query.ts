import { Resolvers } from "../__generated__/resolvers-types";
import { authorsSource } from "./authorsSource";
import { booksSource } from "./booksSource";
import { productsSource } from "./productsSource";

// Resolver functions must be in a map that follows the same hierarchy and naming structure as the schema
// Learn more about writing resolver functions:  🔗 https://www.apollographql.com/docs/apollo-server/data/resolvers

export const Query: Resolvers = {
	Query: {
		// This resolver function takes the `id` argument and uses it to find the correct product to return
		product(_parent, { id }, _context) {
			// Learn more about how to fetch data from external data sources 🔗 https://www.apollographql.com/docs/apollo-server/data/fetching-data
			const product = productsSource.find((p) => String(p.id) === String(id));
			return product ? { ...product } : null;
		},
		products() {
			return productsSource.map((p) => ({ ...p }));
		},
		book(_parent: any, { id }: { id: string }, _context: any) {
			const book = booksSource.find((b) => String(b.id) === String(id));
			return book ? { ...book } : null;
		},
		books() {
			return booksSource.map((b) => ({ ...b }));
		},
		author(_parent: any, { id }: { id: string }, _context: any) {
			const author = authorsSource.find((a) => String(a.id) === String(id));
			return author ? { ...author } : null;
		},
		authorBooks(_parent: any, { id }: { id: string }, _context: any) {
			const author = authorsSource.find((a) => String(a.id) === String(id));
			const books = booksSource.filter(
				(b) => String(b.author.id) === String(id),
			);
			return { author, books };
		},
		authors() {
			return authorsSource.map((a) => ({ ...a }));
		},
	},
};
