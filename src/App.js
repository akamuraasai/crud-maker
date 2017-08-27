import React, { Component } from 'react';
import { Container, Menu, Segment } from 'semantic-ui-react'

import Lista from './base/pages/ListPage';
import Formulario from './base/pages/FormPage';

import fields from './schema.json';

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
                        <Lista model="trucks" fields={fields.filter(field => field.show.header)}/>
                        <Formulario model="trucks" evento={1} fields={fields.filter(field => field.show.form)}/>
                    </Container>
                </Segment>
            </div>
        );
    }
}

export default App;
