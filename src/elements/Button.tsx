import * as React from 'react'
import styled from 'styled-components'
import { EnhancedElement } from './enhancedElement';

export interface ButtonProps {
    data?: any
}
const $Button = styled.button`
    font-size: 40px;
`

class Button extends React.Component<ButtonProps, any> {
    render() {
        const { data } = this.props
        return (
            <$Button>
                { data.text }
            </$Button>
        )
    }
}

export default EnhancedElement( Button )