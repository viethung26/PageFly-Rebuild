import * as React from 'react'
import {Subscribe} from 'unstated'
import ElementContainer from 'src/containers/ElementContainer';
import {workspaceContainer} from 'src/containers/WorkspaceContainer';

export interface Props {
    elementContainer: any
}
declare global {
    interface Window {
        Selected: ElementContainer | null
    }
}

export const EnhancedElement = (WrappedComponent: React.ClassType<any, any, any>) => {
    class NewComponent extends React.Component<Props, any> {
        handleMouseDown = (e: Event, selected: ElementContainer | null) => {
            e.stopPropagation()
            ElementContainer.Selected = selected
            window.Selected = ElementContainer.Selected
            workspaceContainer.setState({selected})
            
        }
        render() {
            const {elementContainer, ...restProps} = this.props
            return (
                <Subscribe to={ [elementContainer] }>
                    { (container) => (
                        <WrappedComponent container = { elementContainer } 
                        mouseDown = { this.handleMouseDown }
                        data={ container.state.data } 
                        { ...restProps }/>
                    )}
                </Subscribe>
            )
        }
    }
    return NewComponent
}