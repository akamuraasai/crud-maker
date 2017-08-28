import React  from 'react';
import { Form } from 'semantic-ui-react';

export default class InputField extends React.Component
{
    render() {
        const { meta, ...rest } = this.props;
        const { touched } = meta;
        const error = meta.error !== undefined;
        return (
            <Form.Field {...rest} error={touched && error}/>
        );
    }
}