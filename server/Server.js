const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

const schemaString = readFileSync('./schema.graphql', { encoding: 'utf8' });

const schema = buildSchema(schemaString);

const allBooks = [
	{
		id: '1',
		title: 'Another awesome book',
		description: '123',
		author: {
			id: '1',
			firstName: 'Alex',
			lastName: 'Kislov'
		},
		comments: [
			{
				id: '1',
				author: 'Mike',
				text: 'Like it'
			},
			{
				id: '2',
				author: 'Alex',
				text: 'Really awesome book'
			}
		]
	},
	{
		id: '2',
		title: 'Awesome book',
		description: '123',
		author: {
			id: '1',
			firstName: 'Alex',
			lastName: 'Kislov'
		},
		comments: []
	}
];

const TOKEN = "auth_token";
const LOGIN = "Admin";
const PASSWORD = "Admin";

const root = {
	login: (args, request) => {	
		if (args.login === LOGIN && args.password === PASSWORD)
			return {token:TOKEN, userName:'admin'};
		else
			return error({message: 'Unauthorized error', statusCode: 401});
	},
	getAllBooks: () => {
		return allBooks;
	},
	getAllAuthors: () => {
		return allBooks
			.map((item) => item.author)
			.filter((item, i, self) => self.findIndex((selfItem) => selfItem.id === item.id) === i);
	},
	getBook: (params) => {
		return allBooks.find((item) => item.id === params.id);
	}
};

const app = express();

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
		formatError: (err) => {
			return ({message: err.message, statusCode: err.statusCode})
		}
	})
);

app.listen(2000);

console.log('Running a GraphQL API server at http://localhost:2000/graphql');