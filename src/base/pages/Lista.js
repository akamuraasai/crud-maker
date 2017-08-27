import React, { Component } from 'react';
import { Table, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import { database } from "../database/firebase";

import { carregar, remover, novo } from './Formulario.actions';

class Lista extends Component
{
    state = { itens: {} };

    renderRows = () => {
        const itens = this.state.itens || {};
        const campos = this.props.campos || [];
        const { model, carregar, remover } = this.props;

        const itemLista = item => (
            <Table.Row key={item.id}>
                {campos.map((campo, index) => <Table.Cell key={index}>{item[campo.slug]}</Table.Cell>)}
                <Table.Cell textAlign='center'>
                    <Button onClick={() => carregar(item)} size="small" icon="pencil" color="yellow"/>
                    <Button onClick={() => remover(model, item.id)} size="small" icon="trash" color="red"/>
                </Table.Cell>
            </Table.Row>
        );

        return _(itens)
            .mapValues((value, id) => _.merge({}, value, {id}))
            .mapValues(itemLista)
            .values()
            .value();
    };

    renderHeader = () => {
        const itens = this.props.campos || [];
        return itens.map((header, index) => (
            <Table.HeaderCell key={index} className={header.classes_header}>{header.nome}</Table.HeaderCell>
        ));
    }

    lista = database.ref(`${this.props.model}/`);
    componentDidMount = () => this.lista.on('value', snapshot => this.setState({ ...this.state, itens: snapshot.val() }));

    render = () => {
        const { initialValues, novo } = this.props;
        const id = initialValues === undefined ? undefined : initialValues.id;

        if (id === undefined)
            return (
                <div style={{ marginTop: 20 }}>
                    <Header as="h2" dividing>Lista de Itens</Header>
                    <Table unstackable color="black" striped>
                        <Table.Header>
                            <Table.Row>
                                {this.renderHeader()}
                                <Table.HeaderCell className="two wide column" textAlign='center'>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.renderRows()}
                        </Table.Body>
                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan='99'>
                                    <Button
                                        floated="right"
                                        icon="plus"
                                        labelPosition="left"
                                        primary
                                        size='small'
                                        content="Novo"
                                        onClick={novo}
                                    />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
            );

        return false;
    };
}

const mapStateToProps = state => ({ initialValues: state.main_form.item });
const mapDispatchToProps = dispatch => bindActionCreators({ carregar, remover, novo }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Lista);

