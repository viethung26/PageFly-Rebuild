import { Container } from "unstated";
import {v1 as uuid} from "uuid"

export interface StyleState {
    id: string
    type: string
    data: {}
}
declare global {
    interface Window {
        StyleContainer: any
    }
}

class StyleContainer extends Container<StyleState> {
    
    static Instance: Map<string, StyleContainer> = new Map()

    static get(id: string) {
        return this.Instance.get(id)
    }

    static newStyle(type: string): string {
        const style = uuid()
        const state = ({id: style, type, data: {}})
        new StyleContainer(state)
        return style
    }

    setStyle = (style: {}) => {
        const {data} = this.state
        for (const key in style) {
            data[key] = style[key]
        }
    }

    constructor(state: StyleState) {
        super()
        this.state = state
        StyleContainer.Instance.set(this.state.id, this)
    }

}

window.StyleContainer = StyleContainer

export default StyleContainer