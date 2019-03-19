import {Container} from 'unstated'
import {v1 as uuid} from 'uuid' 
import StyleContainer from './StyleContainer';
import { PageContainer } from './PageContainer';
export interface ElementState {
    id: string | number
    type: string
    data: {
        text?: string
    }
    children: string[]
    style?: string,
    selector?: string
    pageContainer?: PageContainer
}

declare global {
    interface Window {
        ElementContainer: any
    }
}

class ElementContainer extends Container<ElementState> {
    get styleInstance(): CSSStyleSheet | undefined | null {
        return this.state.pageContainer && this.state.pageContainer.StyleInstance
    }

    static Instance: Map<string, ElementContainer> = new Map()

    static get(id: string): ElementContainer | undefined {
        return this.Instance.get(id)
    }

    static Selected: ElementContainer | null = null

    getStyle(): CSSStyleDeclaration | null {
        const selector = `.${this.state.selector}`
        if(this.styleInstance) {
            const cssRules = Array.from(this.styleInstance.cssRules)
            let rule = cssRules.find((rule: CSSStyleRule) => rule.selectorText === selector) as CSSStyleRule
            if(!rule) {
                const index = this.styleInstance.insertRule(`${selector} {}`, cssRules.length)
                rule = this.styleInstance.cssRules[index] as CSSStyleRule
            }
            return rule.style
        }
        return null
    }

    setStyle = ( attr: {} ) => {
        const currentStyle = this.getStyle()
        Object.assign(currentStyle, attr)
    }

    setData = (newData: object) => {
        let {data} = this.state
        const key = Object.keys(newData).toString()
        data[key] = newData[key]
        this.setState({data})
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