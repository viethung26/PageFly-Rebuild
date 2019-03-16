import * as React from 'react'
import styled from 'styled-components'

const $Button = styled.button`
    font-size: 40px;
`

class Button extends React.Component {
    render() {
        return (
            <$Button>
                Test
            </$Button>
        )
    }
}

export default Button