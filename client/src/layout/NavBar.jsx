import React from 'react';
import { Button, Menu, Container, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { history } from '../App';

export default function NavBar() {    
    return(
        <Menu fixed='top' inverted>
            <Container>
                <Image src='../../../logo.png' size='small' style={{margin: '1em'}} centered />
                <Menu.Item name='Authors' as={NavLink} exact to='/authors' />
                <Menu.Item name='Books' as={NavLink} exact to='/books' />
                <Menu.Item>
                    <Button positive content='Logout' onClick={logout}></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

function logout() {
    localStorage.removeItem('token');
    history.push('/login');
}