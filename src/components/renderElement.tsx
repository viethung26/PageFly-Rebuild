import * as React from 'react'
import Catalogue from './Catalogue'
import {v1 as uuid} from 'uuid'
import ElementContainer from '../containers/ElementContainer'
import { Subscribe } from 'unstated';

const handleDrop = (e: any, parent: ElementContainer) => {
    e.stopPropagation()
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
        <Subscribe key={ id } to={ [container] }>
            {eContainer => (
                <$Element elementContainer = { eContainer } onDrop={ handleDrop } onDragOver={ (e: Event) => {e.preventDefault()} } >
                    { children.map(childId => renderElement(childId as string)) }
                </$Element>        
            )}
        </Subscribe>
        
    )
}