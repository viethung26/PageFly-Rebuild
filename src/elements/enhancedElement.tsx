import * as React from 'react'
import {Subscribe} from 'unstated'

export interface Props {
    elementContainer: any
}

export const EnhancedElement = (WrappedComponent: React.ClassType<any, any, any>) => {
    class NewComponent extends React.Component<Props, any> {
        render() {
        const {elementContainer, ...restProps} = this.props
            return (
                <Subscribe to={ [elementContainer] }>
                    { (container) => (
                        <WrappedComponent container = { elementContainer } data={ container.state.data } { ...restProps }/>
                    )}
                </Subscribe>
            )
        }
    }
    return NewComponent
}