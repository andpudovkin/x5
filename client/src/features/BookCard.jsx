import { gql, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Header } from 'semantic-ui-react';
import Comments from './Comments';

const BookCard = ({match: {params: {id}}}) => {
    const GET_BOOK = gql`
        query ($id: ID!) {
            getBook(id: $id) {
                title
                description
                author {
                    id
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

    const { title, description, author: { id: authorId, firstName, lastName } } = data?.getBook;

    return(
        <Container>
            <Card style={{width: '100%'}}>
                <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>
                        <Link to={`/authors/${authorId}`}>
                            {`${firstName} ${lastName}`}
                        </Link>
                    </Card.Meta>
                    <Card.Description>{description}</Card.Description>
                </Card.Content>
            </Card>
            <Comments entityId={id} />
        </Container>
    );
}

export default BookCard;