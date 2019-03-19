import {Container} from 'unstated'
import {v1 as uuid} from 'uuid' 
import StyleContainer from './StyleContainer';
export interface ElementState {
    id: string | number
    type: string
    data: {}
    children: string[]
    style?: string
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

    static Selected: ElementContainer | null = null

    setStyle = ( attr: {} ) => {
        console.log(attr, this)
    }

    setData = (data: any) => {
        const { key, value } = data
        this.setState({[key]: value})
    }
    
    constructor(state: ElementState) {
        super()
        this.state = state
        if(this.state) {
            let {id, style, type} = this.state
            if(!id) id = uuid() 
            if(!style && type) style = StyleContainer.newStyle(type)
            this.setState({style})
            ElementContainer.Instance.set(id as string, this)
        }
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