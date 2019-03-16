import {Container} from 'unstated'
import {v1 as uuid} from 'uuid' 
export interface ElementState {
    id: string | number
    type: string
    data: {}
    children?: string[]
}

class ElementContainer extends Container<ElementState> {
    static Instance = new Map<string, ElementContainer>()
    static get(id: string): ElementContainer | undefined {
        return this.Instance.get(id)
    }
    constructor(state: ElementState) {
        super()
        this.state = state
        ElementContainer.Instance.set(uuid(), this)
    }
    // setData(text: string) {
        // this.setState()
    // }
}
export default ElementContainer