import * as React from 'react'
import styled from 'styled-components'
import Catalogue from './Catalogue'

const $List = styled.div`
    border: 2px solid #ddd;
    border-radius: 10px;
    padding: 5px;
`
const $Element = styled.button`
    display: block;
    margin: 5px;
    border-radius: 5px;
    border: 2px solid #ddd;
`

class Elements extends React.Component {

    handleDrag = (e: any, type: any) => {
        // console.log(type)
        e.dataTransfer.setData("isNew", true)
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