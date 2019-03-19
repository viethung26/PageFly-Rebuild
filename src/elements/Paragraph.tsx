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
    onDrop: any
    mouseDown: any
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
    componentDidUpdate(prevProps: Props, prevState: any) {
        if(!this.focused && this.inputRef) this.inputRef.value = this.props.data.text
    }
    
    render() {
        const { container, data, mouseDown } = this.props
        return (
                <$input className = {container.state.selector} defaultValue={ data.text } ref={ e => (this.inputRef = e)} onChange={ (e) => {
                    container.setData({text: e.target.value})
                }} onBlur={ this.handleBlur } onFocus={ this.handleFocus }
                onDropCapture={ e => this.props.onDrop(e, container)}
                onMouseDown = { (e)=> mouseDown(e,container) }
                />
        )
    }
}

export default EnhancedElement(Paragraph)