import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InputField from '../helpers/InputField';

import { insert, update, load } from './CRUD.actions';

class FormPage extends Component
{
    handleEvento = e => {
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

    render() {
        const { initialValues } = this.props;
        const fields = this.props.fields || [];
        const id = initialValues === undefined ? undefined : initialValues.id;

        if (id === undefined)
            return false;

        return (
            <div style={{ marginTop: 20 }}>
                <Form onSubmit={this.handleEvento}>
                    {fields.map((field, index) => (
                        <Field
                            key={index}
                            component={InputField}
                            name={field.slug}
                            as={Form.Field}
                            control={Input}
                            label={field.nome}
                            type={field.tipo}
                            className={field.classes}
                        />
                    ))}
                    <Button
                        type="submit"
                        primary
                        icon="save"
                        content={id === undefined || id === '' ? 'Salvar' : 'Alterar'}
                    />
                </Form>
            </div>
        );
    }
}

FormPage = reduxForm({ form: 'mainForm', enableReinitialize: true })(FormPage);

const mapStateToProps = state => ({ formFields: state.form, initialValues: state.crudReducer.item });
const mapDispatchToProps = dispatch => bindActionCreators({ insert, update, load }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);