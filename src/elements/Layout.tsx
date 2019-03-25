import * as React from 'react'
import styled from 'styled-components'
import { EnhancedElement, EnhancedElement2 } from './enhancedElement';
import ElementContainer from 'src/containers/ElementContainer';

const $Layout = styled.div`
    box-sizing: border-box;
    display: inline-block;
    padding: 10px;
    border: 1px dashed black;
    margin: 1px;
    min-height: 50px;
    min-width: 100px;
    background-color: #ddd;
    text-align: center;
    line-height: 50px;
`

export interface LayoutProps {
    container: ElementContainer
    chilren: any
    mouseDown: any
}

class Layout extends React.Component<LayoutProps, any> {
    render() {
        const { container, children } = this.props
        return (
            <$Layout 
            >
                { children }
            </$Layout>
        )
    }
}

export default EnhancedElement(Layout)