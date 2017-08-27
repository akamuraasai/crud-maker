import React, { Component } from 'react';
import { Form, Input, Button, Grid, Segment, Header } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InputField from '../helpers/InputField';

import { insert, update, load, dismiss } from './CRUD.actions';

class FormPage extends Component
{
    handleEvent = e => {
        e.preventDefault();

        const { insert, update, model, reset } = this.props;
        const data = this.props.formFields.mainForm.values;
        const item = this.props.initialValues || '';

        if (item.id === undefined || item.id === '')
            insert(model, data);
        else
            update(model, item.id, data);

        reset();
    };

    cancel = () => {
        const { reset, dismiss } = this.props;

        dismiss();
        reset();
    }

    render = () => {
        const { initialValues } = this.props;
        const groups = this.props.groups || [];
        const id = initialValues === undefined ? undefined : initialValues.id;

        if (id === undefined)
            return false;

        return (
            <div style={{ marginTop: 20 }}>
                <Header as="h3" dividing>Preencha os dados abaixo</Header>
                <Segment>
                    <Form onSubmit={this.handleEvent}>
                        {groups.map((group, index) => (
                            <Form.Group key={index}>
                                {group.fields.map((field, index2) => {
                                    if (!field.show.form)
                                        return false;

                                    return (
                                        <Field
                                            key={index2}
                                            component={InputField}
                                            name={field.slug}
                                            as={Form.Field}
                                            control={Input}
                                            label={field.name}
                                            type={field.type}
                                            className={field.classes.input}
                                            width={field.width}
                                        />
                                    )
                                })}
                            </Form.Group>
                        ))}
                        <Grid columns='equal'>
                            <Grid.Column>
                                <Button
                                    type="reset"
                                    content='Cancelar'
                                    onClick={this.cancel}
                                />
                            </Grid.Column>
                            <Grid.Column className="right aligned">
                                <Button
                                    type="submit"
                                    positive
                                    icon="save"
                                    content={id === undefined || id === '' ? 'Salvar' : 'Alterar'}
                                />
                            </Grid.Column>
                        </Grid>
                    </Form>
                </Segment>
            </div>
        );
    }
}

FormPage = reduxForm({ form: 'mainForm', enableReinitialize: true })(FormPage);

const mapStateToProps = state => ({ formFields: state.form, initialValues: state.crudReducer.item });
const mapDispatchToProps = dispatch => bindActionCreators({ insert, update, load, dismiss }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);