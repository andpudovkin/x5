import { gql, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Card, Container, Grid, Comment, Header } from 'semantic-ui-react';

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
                comments {
                    author
                    text
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

    const { title, description, author: { firstName, lastName }, comments } = data.getBook;

    return(
        <Container>
            <Card>
                <Card.Content 
                    header={title} 
                    meta={`${firstName} ${lastName}`} 
                    description={description} 
                />
            </Card>
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {comments.map(({author, text}) => 
                    <Comment>
                        <Comment.Content>
                            <Comment.Author as='a'>{author}</Comment.Author>
                            <Comment.Metadata>
                                Yesterday at 12:30AM
                            </Comment.Metadata>
                            <Comment.Text>{text}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                )}
            </Comment.Group>
        </Container>
    );
}

export default BookCard;