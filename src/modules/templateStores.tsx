import {v1 as uuid} from 'uuid'

export interface TemplateData {
    name: string
    items: Array<TemplateItemData>
}

export interface TemplateItemData {
    type: string
    id: number
    data: {}
    children: number[]
}

export const Stores: Map<string, TemplateData> = new Map()

export const registryToTemplateStores = (template: TemplateData) => {
    Stores.set(template.name, template)
}
