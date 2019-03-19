import * as React from 'react'
import styled from 'styled-components'
import { EnhancedElement } from './enhancedElement';
import ElementContainer from 'src/containers/ElementContainer';

export interface ButtonProps {
    container: ElementContainer
    data?: any
    onDrop: any
    children: any
    mouseDown: any
}
const $Button = styled.button`
    font-size: 40px;
`

class Button extends React.Component<ButtonProps, any> {
    render() {
        const { data, container, children, mouseDown } = this.props
        return (
            <$Button className={ container.state.selector } onDropCapture={ e => this.props.onDrop(e, container)} onMouseDown={ (e) => mouseDown(e,container) } > 
                { data.text }
                { children }
            </$Button>
        )
    }
}

export default EnhancedElement( Button )