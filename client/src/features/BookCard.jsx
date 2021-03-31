import { gql, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Card, Container, Header } from 'semantic-ui-react';
import Comments from './Comments';

const BookCard = ({match: {params: {id}}}) => {
    const GET_BOOK = gql`
        query ($id: ID!) {
            getBook(id: $id) {
                title
                description
                author {
                    firstName
                    lastName
                }
            }
        }`;
    
    const { loading, data, error } = useQuery(GET_BOOK, {
        variables: {
            id: id
        }
    });

    if (loading) {
        return <Header as='h3'>Loading...</Header>
    }

    if (error) {
        console.log(error);
        return <Header as='h3'>Error while loading book card</Header>;
    }

    const { title, description, author: { firstName, lastName } } = data?.getBook;

    return(
        <Container>
            <Card style={{width: '100%'}}>
                <Card.Content 
                    header={title} 
                    meta={`${firstName} ${lastName}`} 
                    description={description} 
                />
            </Card>
            <Comments entityId={id} />
        </Container>
    );
}

export default BookCard;