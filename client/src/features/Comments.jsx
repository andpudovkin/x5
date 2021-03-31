import { gql, useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { Container, Comment, Header, Pagination } from 'semantic-ui-react';

const PAGE_SIZE = 10;

const Comments = ({ entityId, pageSize = PAGE_SIZE }) => {
    const GET_COMMENTS = gql`
        query ($entityId: ID!, $limit: Int!, $offset: Int!) {
            getComments(entityId: $entityId, limit: $limit, offset: $offset) {
                comments {
                    id
                    author
                    text
                }
                pageInfo {
                    totalPages
                    totalCount
                    currentPage
                }
            }
        }`;

    const [currentPage, setCurrentPage] = useState(1);

    const { loading, data, error, fetchMore } = useQuery(GET_COMMENTS, {
        variables: { 
            entityId: entityId,
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
        }
    });

    if (loading) {
        return <Header as='h3'>Loading...</Header>
    }

    if (error) {
        console.log(error);
        return <Header as='h3'>Error while loading comments</Header>;
    }

    const { pageInfo: { totalPages, totalCount }, comments } = data.getComments;


    const handlePageChange = (e, { activePage }) => {
        setCurrentPage(activePage)
        
        fetchMore({
        variables: { 
            entityId: entityId,
            limit: pageSize,
            offset: ((activePage ?? 0) - 1) * pageSize
        }
    });}

    return(
        <Container>
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments ({totalCount} total)
                </Header>
                {comments.map(({id, author, text}) => 
                    <Comment key={id}>
                        <Comment.Content key={id}>
                            <Comment.Author as='a'>{author}</Comment.Author>
                            <Comment.Metadata>
                                Yesterday at 12:30AM
                            </Comment.Metadata>
                            <Comment.Text>{text}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                )}
            </Comment.Group>
            {comments.length > 0 && <Pagination
                boundaryRange={0}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={totalPages}
                activePage={currentPage}
                onPageChange={handlePageChange}
            />}
        </Container>
    );
}

export default Comments;