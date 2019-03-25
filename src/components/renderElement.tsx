import * as React from 'react'
import Catalogue from './Catalogue'
import {v1 as uuid} from 'uuid'
import ElementContainer from '../containers/ElementContainer'
import { Subscribe } from 'unstated';

let placeholderRef:any = React.createRef()
let $Dragging:any = null
let allowed = false
let position = null

const handleDragStart = ({event, dragID, oldParentID}:{event: any, dragID: Number, oldParentID: Number}) =>{
    event.stopPropagation()
    $Dragging = event.target
    event.dataTransfer.setData("isNew", false)
    event.dataTransfer.setData("dragID", dragID)
    event.dataTransfer.setData("oldParentID", oldParentID)
}

const handleDragOver = (e: any) => {
    console.log("dragover", $Dragging)
    // const $ph = placeholderRef.current
    e.preventDefault()
    e.stopPropagation()
    if($Dragging && !$Dragging.contains(e.target)) {
        const targetRect = e.target.getBoundingClientRect()
        // $ph.style.x = targetRect.x + "px"
        // $ph.style.y = targetRect.y + "px"
        // $ph.style.top = targetRect.top + "px"
        // $ph.style.left = targetRect.left + "px"
        // $ph.style.right = targetRect.right + "px"
        // $ph.style.bottom = targetRect.bottom + "px"
        // $ph.style.width = targetRect.width + "px"
        // $ph.style.height = targetRect.height + "px"
        const height = targetRect.height
        const width = targetRect.width
        const x = e.nativeEvent.offsetX - width/2
        const y = e.nativeEvent.offsetY - height/2
        const outer = 20
        // $ph.style.visibility = "visible"
        // calculate position mouse in element
        if((x <= width/2 - outer) && (x >= -width/2 + outer)) {
            if((y <= height/2 - outer) && (y >= -height/2 + outer)) position = "inner"
            else if(y>height/2 -outer) position = "bottom"
            else position = "top" 
        } else {
            if(x> width/2 -outer) position = "right"
            else position = "left"
        }
        // placeholderRef.current.classList.remove("left", "right", "top", "bottom", "inner")
        // placeholderRef.current.classList.add(position)
        console.log(position)
        allowed = true
    }
}

const handleDrop = (e: any, parent: ElementContainer) => {
    e.stopPropagation()
    const isNew = e.dataTransfer.getData("isNew") === "true"
    if(isNew) {
        const id = uuid()
        const type = e.dataTransfer.getData("type")

        const data = {
            value: "test"
        }
        new ElementContainer({
            id, type, data, children: [], selector: "pf" + uuid().substr(0, 5), pageContainer: parent.state.pageContainer
        })
        parent.appendChild(id)
    } else {
        console.log("old element")
    }
    
}


export const renderElement = (id: string) => {
    const container: ElementContainer | undefined = ElementContainer.get(id)
    if(!container) return null 
    const { children } = container.state
    const $Element = Catalogue[container.state.type]
    return (
        <Subscribe key={ id } to={ [container] }>
            {eContainer => (
                <$Element elementContainer = { eContainer } {...eContainer.state} onDragStart={ handleDragStart } onDrop={ handleDrop } 
                onDragOver={ handleDragOver } >
                    { children.map(childId => renderElement(childId as string)) }
                </$Element>        
            )}
        </Subscribe>
        
    )
}