import * as React from 'react'
import styled from 'styled-components'
import {v1 as uuid} from 'uuid'
import ElementContainer from '../containers/ElementContainer'
import {Subscribe} from 'unstated'
import {renderElement} from './renderElement'
import {PageContainer as PContainer} from '../containers/PageContainer'
import { Stores } from '../modules/templateStores'
import { workspaceContainer } from 'src/containers/WorkspaceContainer';
declare global {
    interface Window {
        PageContainer: any
    }
}
const $Page = styled.div`
    border: 3px solid #ddd;
    border-radius: 15px;
    padding: 10px;
    height: 400px;
    width: 500px;
`

export const PageContainer: PContainer = new PContainer({
    id: uuid(), 
    type: "Page",
    data: {},
    children: [],
})
window.PageContainer = PageContainer

export const PageContext = React.createContext(PageContainer)

class Page extends React.Component {
    $Dragging: HTMLElement
    placeholderRef: React.RefObject<HTMLDivElement> = React.createRef()
    position: any = null
    allowed: boolean = false
    handleDragStart = (ev: any) =>{
        ev.stopPropagation()
        this.$Dragging = ev.target as HTMLElement
        ev.dataTransfer.setData("isNew", "false")
    }

    handleDragOver = (e: any) => {
        const $ph = this.placeholderRef.current
        e.preventDefault()
        e.stopPropagation()
        if(((this.$Dragging && !this.$Dragging.contains(e.target)) || !this.$Dragging ) && $ph) {
            const targetRect = e.target.getBoundingClientRect()
            // $ph.style.x = targetRect.x + "px"
            // $ph.style.y = targetRect.y + "px"
            $ph.style.top = targetRect.top + "px"
            $ph.style.left = targetRect.left + "px"
            $ph.style.right = targetRect.right + "px"
            $ph.style.bottom = targetRect.bottom + "px"
            $ph.style.width = targetRect.width + "px"
            $ph.style.height = targetRect.height + "px"
            const height = targetRect.height
            const width = targetRect.width
            const x = e.nativeEvent.offsetX - width/2
            const y = e.nativeEvent.offsetY - height/2
            const outer = 20
            $ph.style.visibility = "visible"
            // calculate position mouse in element
            if((x <= width/2 - outer) && (x >= -width/2 + outer)) {
                if((y <= height/2 - outer) && (y >= -height/2 + outer)) this.position = "inner"
                else if(y>height/2 -outer) this.position = "bottom"
                else this.position = "top" 
            } else {
                if(x> width/2 -outer) this.position = "right"
                else this.position = "left"
            }
            $ph.classList.remove("left", "right", "top", "bottom", "inner")
            $ph.classList.add(this.position)
            this.allowed = true
        }
    }
    
    handleDrop = (e: any) => {
        e.stopPropagation()
        if(this.placeholderRef.current) 
            this.placeholderRef.current.style.visibility = 'hidden'
        if(!this.allowed || !this.position) return
        this.allowed = false        
        const targetID = e.target.getAttribute("data-element")
        const targetContainer = ElementContainer.get(targetID)
        const isNew = e.dataTransfer.getData("isNew") === "true"
        if(isNew) {
            const name = e.dataTransfer.getData("type")
            ElementContainer.newElements(name, 0, targetID)
        } else if(this.$Dragging){
            //remove in old container
            const dragID = this.$Dragging.getAttribute("data-element")
            const oldParent = this.$Dragging.parentNode as HTMLElement

            const oldParentID = oldParent.getAttribute("data-element")
            ElementContainer.get(oldParentID).removeChild(dragID)            
            if(this.position === "inner") {
                if(targetContainer && dragID) targetContainer.appendChild(dragID)
            } else {
                const parentElement = e.target.parentNode
                const parentID = parentElement.getAttribute("data-element")
                const parentContainer = ElementContainer.get(parentID)
                if(parentContainer && dragID) parentContainer.appendChild(dragID)
            }   
        }
    }

    handleMouseDown = (e: any) => {
        e.stopPropagation()
        const selectedID = e.target.getAttribute("data-element")
        console.log("selected", selectedID)
        const selected = ElementContainer.get(selectedID)
        ElementContainer.Selected = selected
        window.Selected = ElementContainer.Selected
        workspaceContainer.setState({selected})
    }

    render() {
        return (<>
            <$ph ref={ this.placeholderRef } />
            <PageContext.Consumer>
                {pageContainer => (
                    <Subscribe to={ [pageContainer] }>
                        {(container: ElementContainer) => (
                            <$Page 
                            data-element={ container.state.id }
                            onDragStart= { this.handleDragStart }
                            onDrop={ this.handleDrop } onDragOver={ this.handleDragOver } 
                            onMouseDown={ this.handleMouseDown }
                            >
                                { container.state.children.map(childId => renderElement(childId)) }
                            </$Page>
                        )}
                    </Subscribe>
                )}
            </PageContext.Consumer>
        </>
            
        )
    }
}

export default Page

const $ph = styled.div`
    box-sizing: border-box;
    visibility: hidden;
    pointer-events: none;
    z-index: 100;
    margin: 1px;
    height: 1px;
    width: 1px;
    background-color: transparent;
    position: absolute;
    &.top {
        border-top: 1px solid red;
    }
    &.bottom {
        border-bottom: 1px solid red;
    }
    &.left {
        border-left: 1px solid red;
    }
    &.right {
        border-right: 1px solid red;
    }
    &.inner {
        border: 1px solid red;
    }
`
