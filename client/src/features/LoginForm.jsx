import React from 'react';
import { gql, useLazyQuery } from '@apollo/react-hooks';
import { history } from '../App';
import { Grid, Button, Input, Container, Form, Label } from 'semantic-ui-react';

function LoginForm() {  

    const LOGIN = gql`
        query login($login: String!, $password: String!) {
            login(login: $login, password: $password) {
                token,
                userName
            }
        }`;

    const [doLogin, {loading, data, error}] = useLazyQuery(LOGIN);

    if (data && data.login) {
        localStorage.setItem('token', data.login.token);
        history.push('/');
    }

    const styles = {
        height: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        zIndex: "9999",
        display: "block",
        backgroundColor: "white",
    }

    return (
        <div style={styles}>
            <Container style={{ marginTop: '10em' }}>
                <Form onSubmit={ (e) => { doLogin( { variables: {login: e.target[0].value, password: e.target[1].value} } ) }  }>
                    <Grid>
                        <Grid.Row centered>
                            <Grid.Column width={4} >
                                <Input type="text" placeholder="login" ></Input>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={4} >
                            <Input type="password" placeholder="password" ></Input>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={4} >
                                <Button positive type="submit" >login</Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={4} >
                                {error && (
                                    <Label color='red' >Failed to log in.</Label>
                                )}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
                
            </Container>
        </div>
        
    );
};

export default LoginForm;