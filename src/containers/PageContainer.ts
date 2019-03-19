import ElementContainer, {ElementState} from "./ElementContainer";

export interface PageState {

}

export class PageContainer extends ElementContainer {

    StyleInstance: CSSStyleSheet | null
    constructor(state: ElementState) {
        super(state)
        let style = document.createElement('style')
        document.head.appendChild(style)
        this.StyleInstance = style.sheet as CSSStyleSheet
    }
}
