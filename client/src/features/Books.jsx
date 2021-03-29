import { gql, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Table } from 'semantic-ui-react';

function Books() {
    const GET_ALL_BOOKS = gql`
        query {
            getAllBooks {
                id
                title
                author {
                    firstName
                    lastName
                }
            }
        }`;
    
    const { data } = useQuery(GET_ALL_BOOKS);
    const books = data?.getAllBooks;

    return(
        <Grid>
            <Grid.Row>
                <Grid.Column><h3>Books page</h3></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    {!!books && <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Author</Table.HeaderCell> 
                            </Table.Row>
                        </Table.Header>
                        {books.map((book) => 
                            <Table.Row>
                                <Table.Cell>
                                    <Link to={`/books/${book.id}`}>{book.title}</Link>
                                </Table.Cell>
                                <Table.Cell>
                                    {`${book.author.firstName} ${book.author.lastName}`}
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table>}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default Books;