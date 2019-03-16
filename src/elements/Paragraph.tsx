import * as React from 'react'
import ElementContainer from '../containers/ElementContainer'
import {Subscribe} from 'unstated'
import styled from 'styled-components'

const $input = styled.input`
	border: 1px solid red;
    padding: 5px;
`
export interface Props {
    data: {
        text?: string
    }
}
class Paragraph extends React.Component<Props, {}> {
    focused: boolean = false
    inputRef: HTMLInputElement | null
    handleBlur = () => {
        this.focused = false
    }

    handleFocus = () => {
        this.focused = true
    }
    
    render() {
        const {data} = this.props
        return (
            <Subscribe to={ [ElementContainer] }>
                { (container: ElementContainer) => (
                    <$input ref={ e => (this.inputRef = e)} defaultValue={ data.text } onChange={ (e) => {
                        // container.setData(e.target.value) 
                    }} onBlur={ this.handleBlur } onFocus={ this.handleFocus }/>
                )}
            </Subscribe>
        )
    }
}

export default Paragraph