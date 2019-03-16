import * as React from 'react'
import Catalogue from './Catalogue'
import {v1 as uuid} from 'uuid'
import ElementContainer from '../containers/ElementContainer'

const handleDrop = (e: any, parent: ElementContainer) => {
    const id = uuid()
    const type = e.dataTransfer.getData("type")
    const data = {
        text: "test"
    }
    const elementContainer = new ElementContainer({
        id, type, data, children: []
    })
    parent.appendChild(id)

}

export const renderElement = (id: string) => {
    const container: ElementContainer | undefined = ElementContainer.get(id)
    if(!container) return null 
    const { children } = container.state
    const $Element = Catalogue[container.state.type]
    return (
        <$Element key={ id } elementContainer = { container }
        onDrop={ (e: Event) => handleDrop( e, container) } onDragOver={ (e: Event) => {e.preventDefault()} } 
        >
            { children.map(childId => renderElement(childId)) }
        </$Element>
    )
}