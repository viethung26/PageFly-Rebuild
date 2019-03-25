import * as React from 'react'
import styled from 'styled-components'
import { EnhancedElement } from 'src/elements/enhancedElement';
import { registryToTemplateStores } from 'src/modules/templateStores';

export interface TextProps {
    data: any,
}

class Text extends React.Component<TextProps> {
    render() {
        return (
            <$Text>{this.props.data.value}</$Text>
        )
    }
}
export default EnhancedElement(Text)

registryToTemplateStores({
    name: "Text",
    items: [
        {
            type: "Text",
            id: 0,
            data: {
                value: "text"
            },
            children: []
        }
    ]
})

const $Text = styled.span`
`


