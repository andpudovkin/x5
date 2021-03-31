import { gql, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Card, Container, Divider, Header } from 'semantic-ui-react';
import Books from './Books';
import Comments from './Comments';

const AuthorCard = ({match: {params: {id}}}) => {
    const GET_AUTHOR = gql`
        query ($id: ID!) {
            getAuthor(id: $id) {
                firstName
                lastName,
                bio
            }
        }`;
    
    const { loading, data, error } = useQuery(GET_AUTHOR, {
        variables: {
            id: id
        }
    });

    if (loading) {
        return <Header as='h3'>Loading...</Header>
    }

    if (error) {
        console.log(error);
        return <Header as='h3'>Error while loading author card</Header>;
    }

    const { firstName, lastName, bio } = data?.getAuthor;

    return(
        <Container>
            <Card 
                image='../../../../avatar.jpg'
                header={`${firstName} ${lastName}`} 
                description={bio}
            />
            <Divider />
            <Books authorId={id} />
        </Container>
    );
}

export default AuthorCard;