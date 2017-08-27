import React, { Component } from 'react';
import { Container, Menu, Segment } from 'semantic-ui-react'

import Lista from './base/pages/Lista';
import Formulario from './base/pages/Formulario';

import campos from './schema.json';

class App extends Component {
    render() {
        return (
            <div>
                <Segment style={{ minHeight: 700, padding: '1em 0em' }} vertical>
                    <Container>
                        <Menu pointing secondary size='large'>
                            <Menu.Item as='a' active>Inicio</Menu.Item>
                        </Menu>
                    </Container>
                    <Container>
                        <Lista model="trucks" campos={campos.filter(campo => campo.header)}/>
                        <Formulario model="trucks" evento={1} campos={campos.filter(campo => campo.form)}/>
                    </Container>
                </Segment>
            </div>
        );
    }
}

export default App;
