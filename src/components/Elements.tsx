import * as React from 'react'
import styled from 'styled-components'
import Catalogue from './Catalogue'

const $List = styled.div`
    padding: 5px;
    border: 1px solid black;
`
const $Element = styled.button`
    display: block;
    margin: 5px;
    border: 1px solid;
`

class Elements extends React.Component {

    handleDrag = (e: any, type: any) => {
        // console.log(type)
        e.dataTransfer.setData("type", type)

    }

    listElements = () => {
        const elements = []
        for (const key in Catalogue) {
            elements.push(<$Element key={ key } draggable={ true } onDragStart={ (e) => this.handleDrag(e, key) }>{ key }</$Element>)
        }
        return elements
    }
    
    render() {
        return (
            <$List>
                { this.listElements() }
            </$List>        
        )
    }
}

export default Elements