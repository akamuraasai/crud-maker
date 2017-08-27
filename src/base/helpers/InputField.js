import React  from 'react';
import { Form } from 'semantic-ui-react';

export default class InputField extends React.Component
{
    render() {
        const { meta, ...rest } = this.props;
        return (
            <Form.Field {...rest}/>
        );
    }
}