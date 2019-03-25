import * as React from 'react'
import styled from 'styled-components'
import {EnhancedElement} from './enhancedElement'
import ElementContainer from 'src/containers/ElementContainer';
import { registryToTemplateStores } from 'src/modules/templateStores';

const $input = styled.input`
    padding: 5px;
    margin: 2px;
`
export interface Props {
    elementContainer: ElementContainer
}

class Paragraph extends React.Component<Props, any> {
    static defaultProps = {
        value: "Paragraph"
    }
    focused: boolean = false
    inputRef: HTMLInputElement | null

    handleBlur = () => {
        this.focused = false
    }

    handleFocus = () => {
        this.focused = true
    }
    componentDidUpdate(prevProps: Props, prevState: any) {
        // if(!this.focused && this.inputRef) this.inputRef.value = this.props.data.text
    }
    
    render() {
        const { elementContainer } = this.props
        return (
                <$input className = {elementContainer.state.selector} defaultValue={ elementContainer.state.data.value } ref={ e => (this.inputRef = e)} onChange={ (e) => {
                    elementContainer.setData({text: e.target.value})
                }} onBlur={ this.handleBlur } onFocus={ this.handleFocus }
                />
        )
    }
}

export default EnhancedElement(Paragraph)

registryToTemplateStores({
    name: "Paragraph",
    items: [
        {
            type: "Paragraph",
            id: 0,
            data: {
                value: "This is a paragraph"
            },
            children: []
        }

    ]
})