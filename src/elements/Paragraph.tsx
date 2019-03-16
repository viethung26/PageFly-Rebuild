import * as React from 'react'
import styled from 'styled-components'
import {EnhancedElement} from './enhancedElement'
import ElementContainer from 'src/containers/ElementContainer';

const $input = styled.input`
	border: 1px solid red;
    padding: 5px;
`
export interface Props {
    container: ElementContainer
    data?: any
}

class Paragraph extends React.Component<Props, any> {
    focused: boolean = false
    inputRef: HTMLInputElement | null
    handleBlur = () => {
        this.focused = false
    }

    handleFocus = () => {
        this.focused = true
    }
    
    render() {
        const { container, data } = this.props
        return (
                <$input defaultValue={ data.text } ref={ e => (this.inputRef = e)} onChange={ (e) => {
                    container.setData({key: "text", value: e.target.value}) 
                }} onBlur={ this.handleBlur } onFocus={ this.handleFocus }/>
        )
    }
}

export default EnhancedElement(Paragraph)