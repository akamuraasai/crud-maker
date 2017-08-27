import React, { Component } from 'react';
import { Table, Header, Button, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import { database } from "../database/firebase";

import { load, remove, add } from './CRUD.actions';

class ListPage extends Component
{
    state = { items: {} };

    renderRows = () => {
        const items = this.state.items;
        const fields = this.props.fields || [];
        const { model, load, remove } = this.props;

        const itemList = item => (
            <Table.Row key={item.id}>
                {fields.map((field, index) => <Table.Cell className={field.classes.tableCell} key={index}>{item[field.slug]}</Table.Cell>)}
                <Table.Cell textAlign='center'>
                    <Button onClick={() => load(item)} size="small" icon="pencil" color="yellow"/>
                    <Button onClick={() => remove(model, item.id)} size="small" icon="trash" color="red"/>
                </Table.Cell>
            </Table.Row>
        );

        return _(items)
            .mapValues((value, id) => _.merge({}, value, {id}))
            .mapValues(itemList)
            .values()
            .value();
    };

    renderHeader = () => {
        const items = this.props.fields || [];
        return items.map((header, index) => (
            <Table.HeaderCell key={index} className={header.classes.tableHeader}>{header.name}</Table.HeaderCell>
        ));
    }

    ref = database.ref(`${this.props.model}/`);
    componentDidMount = () => this.ref.on('value', snapshot => this.setState({ ...this.state, items: snapshot.val() }));

    render = () => {
        const { initialValues, add } = this.props;
        const id = initialValues === undefined ? undefined : initialValues.id;

        if (id === undefined)
            return (
                <div style={{ marginTop: 20 }}>
                    <Header as="h3" dividing>Lista de Registros</Header>
                    <Segment>
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
                                            onClick={add}
                                        />
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Segment>
                </div>
            );

        return false;
    };
}

const mapStateToProps = state => ({ initialValues: state.crudReducer.item });
const mapDispatchToProps = dispatch => bindActionCreators({ load, remove, add }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);

