import * as React from 'react'
import ElementContainer from '../containers/ElementContainer'
import {Subscribe} from 'unstated'
import styled from 'styled-components'

const $field = styled.div`
    height: 500px;
    width: 200px;
    border: 1px solid black;
    float: right;
`

class Inspector extends React.Component {
    render() {
        return (
            <Subscribe to={ [ElementContainer] }>
                {
                    (container: ElementContainer) => (
                        <$field>
                            {/* <input type="text" value={ container.state.text } onChange={ e => container.setData(e.target.value) }/>         */}
                        </$field>
                        )
                }
            </Subscribe>
        )
    }
}

export default Inspector