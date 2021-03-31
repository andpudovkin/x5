import { gql, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Table } from 'semantic-ui-react';

function Authors() {
    const GET_ALL_AUTHORS = gql`
        query {
            getAllAuthors {
                id
                firstName,
                lastName
            }
        }`;
    
    const { data } = useQuery(GET_ALL_AUTHORS);
    const authors = data?.getAllAuthors;

    return(
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    {!!authors && <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Books count</Table.HeaderCell> 
                            </Table.Row>
                        </Table.Header>
                        {authors.map((author) => 
                            <Table.Row>
                                <Table.Cell>
                                    <Link to={`/authors/${author.id}`}>
                                        {`${author.firstName} ${author.lastName}`}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>&nbsp;</Table.Cell>
                            </Table.Row>
                        )}
                    </Table>}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default Authors;