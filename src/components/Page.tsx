import * as React from 'react'
import styled from 'styled-components'
import Catalogue from './Catalogue'
import {v1 as uuid} from 'uuid'
import ElementContainer from '../containers/ElementContainer'
import {Subscribe} from 'unstated'
import {renderElement} from './renderElement'
declare global {
    interface Window {
        PageContainer: any
    }
}
const $Page = styled.div`
    border: 1px solid red;
    height: 200px;
    width: 300px;
`

const PageContainer: ElementContainer = new ElementContainer({
    id: uuid(), 
    type: "Page",
    data: [],
    children: []
})
window.PageContainer = PageContainer

export const PageContext = React.createContext(PageContainer)

class Page extends React.PureComponent {
    handleDrop = (e: any, parent: ElementContainer) => {
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

    render() {
        return (
            <PageContext.Consumer>
                {pageContainer => (
                    <Subscribe to={ [pageContainer] }>
                        {(container: ElementContainer) => (
                            <$Page onDrop={ e => this.handleDrop( e, container) } onDragOver={ e => e.preventDefault() } >
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