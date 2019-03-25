import * as React from 'react'
import styled from 'styled-components'
import {v1 as uuid} from 'uuid'
import ElementContainer from '../containers/ElementContainer'
import {Subscribe} from 'unstated'
import {renderElement} from './renderElement'
import {PageContainer as PContainer} from '../containers/PageContainer'
import { Stores } from '../modules/templateStores'
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

const PageContainer: PContainer = new PContainer({
    id: uuid(), 
    type: "Page",
    data: {},
    children: [],
})
window.PageContainer = PageContainer

export const PageContext = React.createContext(PageContainer)

class Page extends React.Component {
    handleDrop = (e: any, parentID: string) => {
        const isNew = e.dataTransfer.getData("isNew") === "true"
        if(isNew) {
            const name = e.dataTransfer.getData("type")
            ElementContainer.newElements(name, 0, parentID)
        } else {
            console.log("old")
        }
            
    }

    render() {
        return (
            <PageContext.Consumer>
                {pageContainer => (
                    <Subscribe to={ [pageContainer] }>
                        {(container: ElementContainer) => (
                            <$Page onDrop={ e => this.handleDrop( e, container.state.id) } onDragOver={ e => e.preventDefault() } >
                                { container.state.children.map(childId => renderElement(childId)) }
                            </$Page>
                        )}
                    </Subscribe>
                )}
            </PageContext.Consumer>
        )
    }
}

export default Page