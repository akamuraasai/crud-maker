import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InputField from '../helpers/InputField';

import { inserir, alterar, carregar } from './Formulario.actions';

class Formulario extends Component
{
    handleEvento = e => {
        e.preventDefault();

        const { inserir, alterar, model, reset } = this.props;
        const dados = this.props.campos_form.formulario.values;
        const item = this.props.initialValues || '';

        if (item.id === undefined || item.id === '')
            inserir(model, dados);
        else
            alterar(model, item.id, dados);

        reset();
    };

    render() {
        const { initialValues } = this.props;
        const campos = this.props.campos || [];
        const id = initialValues === undefined ? undefined : initialValues.id;

        if (id === undefined)
            return false;

        return (
            <div style={{ marginTop: 20 }}>
                <Form onSubmit={this.handleEvento}>
                    {campos.map((campo, index) => (
                        <Field
                            key={index}
                            component={InputField}
                            name={campo.slug}
                            as={Form.Field}
                            control={Input}
                            label={campo.nome}
                            className={campo.classes}
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

Formulario = reduxForm({ form: 'formulario', enableReinitialize: true })(Formulario);

const mapStateToProps = state => ({ campos_form: state.form, initialValues: state.main_form.item });
const mapDispatchToProps = dispatch => bindActionCreators({ inserir, alterar, carregar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);