import ElementContainer, {ElementState} from "./ElementContainer";

export interface PageState {

}

export class PageContainer extends ElementContainer {

    StyleInstance: StyleSheet | null
    constructor(state: ElementState) {
        super(state)
        let style = document.createElement('style')
        style.innerHTML = `
            #app1 {
                corlor: red
            }
        `
        document.head.appendChild(style)
        this.StyleInstance = style.sheet
        console.log(this.StyleInstance)
    }
}
