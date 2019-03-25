import * as React from 'react'
import styled from 'styled-components'
import { EnhancedElement } from './enhancedElement';
import ElementContainer from 'src/containers/ElementContainer';
import {registryToTemplateStores} from 'src/modules/templateStores'
export interface ButtonProps {
    container: ElementContainer
    value: string
    children: any
}

class Button extends React.Component<ButtonProps, any> {
    static defaultProps = {
        value: "Button"
    }
    render() {
        const { children } = this.props
        return (
            <$Button> 
                { children }
            </$Button>
        )
    }
}

const $Button = styled.button`
    border-radius: 5px;
    font-size: 20px;
    margin: 2px;
`

registryToTemplateStores({
    name: "Button",
    items: [
        {
            type: "Button",
            id: 0,
            data: {},
            children: [1]
        },
        {
            type: "Text",
            id: 1,
            data: {
                value: "Button"
            },
            children: []
        }
    ]
})

export default EnhancedElement( Button )