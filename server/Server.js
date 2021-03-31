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
		description: 'Some description',
		author: {
			id: '1',
			firstName: 'Alex',
			lastName: 'Kislov',
			bio: 'Very interesting biography!'
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
			},
			{
				id: '3',
				author: 'Vlad',
				text: 'Like it'
			},
			{
				id: '4',
				author: 'Alexa',
				text: 'Really awesome book'
			},
			{
				id: '5',
				author: 'Some guy',
				text: 'Like it'
			},
			{
				id: '6',
				author: 'Julian the King',
				text: 'Really awesome book'
			},
			{
				id: '7',
				author: 'Alisa',
				text: 'Like it'
			},
			{
				id: '8',
				author: 'Siri',
				text: 'Really awesome book'
			},
			{
				id: '9',
				author: 'Cortana',
				text: 'Like it'
			},
			{
				id: '10',
				author: 'Illidan',
				text: 'Really awesome book'
			},
			{
				id: '11',
				author: 'Artas',
				text: 'Like it'
			},
			{
				id: '12',
				author: 'Ultramarine',
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
			lastName: 'Kislov',
			bio: 'Very interesting biography!'
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
	getAllBooks: ({authorId = null}) => {
		if (!authorId) {
			return allBooks;
		}
		return allBooks.filter((item) => item.author.id === authorId)
	},
	getAllAuthors: () => {
		return allBooks
			.map((item) => item.author)
			.filter((item, i, self) => self.findIndex((selfItem) => selfItem.id === item.id) === i)
			.map((author) => {
				return { ...author, booksCount: allBooks.filter((book) => book.author.id === author.id).length }
			});
	},
	getBook: ({id}) => {
		return allBooks.find((item) => item.id === id);
	},
	getAuthor: ({id}) => {
		return allBooks.map((item) => item.author).find((item) => item.id === id);
	},
	getComments: ({entityId, limit, offset}) => {
		const searchResult = allBooks.find((item) => item.id === entityId);
		if (!searchResult) {
			return [];
		}

		const {comments} = searchResult;

		return { 
			comments: comments.slice(offset, limit + offset),
			pageInfo: {
				totalCount: comments.length,
				totalPages: Math.ceil(comments.length / limit),
				currentPage: Math.ceil((offset + 1) / limit),
			}
		};
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