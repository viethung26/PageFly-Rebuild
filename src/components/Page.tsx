import * as React from 'react'
import styled from 'styled-components'
// import Catalogue from './Catalogue'
import {v1} from 'uuid'
import ElementContainer from '../containers/ElementContainer'
import {Subscribe} from 'unstated'

declare global {
    interface Window {
        Container: any
    }
}
const $Page = styled.div`
    border: 1px solid red;
    height: 200px;
    width: 300px;
`
export interface State {
    pageContainer: Array<ElementContainer>
}
class Page extends React.Component<{},State> {
    constructor(props: any) {
        super(props)
        const PageContainer: ElementContainer = new ElementContainer({
            id: v1(), 
            type: "Page",
            data: [],
            children: []
        })
        window.Container = PageContainer
    }

    componentDidMount() {

    }
    
    handleDrop = (e: any) => {
        // const id = v1()
        // const type = e.dataTransfer.getData("type")
        // const data = {
        //     text: "test"
        // }
        // const elementContainer = new ElementContainer({
        //     id, type, data
        // })
        // pageContainer.push(elementContainer)
        // this.setState({pageContainer})
    }

    renderElement(container: ElementContainer): any {
        // const rows: any[] = []
        // pageContainer.forEach((container: ElementContainer) => {
        //     const {state} = container
        //     const $Element = Catalogue[state.type]
        //     rows.push(<$Element key={ state.id } data= { state.data }/>)
        // })
        // return rows
    }

    render() {
        return (
            <Subscribe to={ [ElementContainer] }>
                {container => {
                    return (
                    <$Page onDrop={ this.handleDrop } onDragOver={ e => e.preventDefault() } >
                        { this.renderElement(container) }
                    </$Page>)
                }}
            </Subscribe>
        )
    }
}

export default Page