import {Container} from 'unstated'
import {v1 as uuid} from 'uuid' 
export interface ElementState {
    id: string | number
    type: string
    data: {}
    children: string[]
}

declare global {
    interface Window {
        ElementContainer: any
    }
}

class ElementContainer extends Container<ElementState> {

    static Instance: Map<string, ElementContainer> = new Map()

    static get(id: string): ElementContainer | undefined {
        return this.Instance.get(id)
    }

    setData = (data: any) => {
        const { key, value } = data
        this.setState({[key]: value})
    }
    
    constructor(state: ElementState) {
        super()
        this.state = state
        if(this.state) {
            let {id} = this.state
            console.log(id)
            if(!id) id = uuid() 
            ElementContainer.Instance.set(id as string, this)
        }
        console.log(state)
    }

    appendChild = (id: string) => {
        const {children} = this.state
        children.push(id)
        this.setState({children})
    }
    // setData(text: string) {
        // this.setState()
    // }
}
window.ElementContainer = ElementContainer
export default ElementContainer