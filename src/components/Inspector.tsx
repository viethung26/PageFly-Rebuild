import * as React from 'react'
import ElementContainer from '../containers/ElementContainer'
import {Subscribe} from 'unstated'
import styled from 'styled-components'
import { workspaceContainer } from 'src/containers/WorkspaceContainer';
import { SketchPicker } from 'react-color'


const $group = styled.div`
    height: 500px;
    width: 300px;
    border: 2px solid #ddd;
    border-radius: 15px;
    padding: 10px;
    float: right;
`
const $field = styled.div`
    padding: 5px;
`

// async function importSketPicker(): Promise<any> {
//     const SketchPicker = await import("react-color")
//     return SketchPicker.SketchPicker

class Inspector extends React.Component<{},any> {
    constructor(props: any) {
        super(props)
        this.state = {
            colorPicked: false,
            bgPicked: false
        }

    }
    render() {
        return (
            <Subscribe to={ [workspaceContainer] }>
                { wContainer => {
                    const container = wContainer.state.selected 
                    if(!container) return null
                    return (
                        <Subscribe to={ [container] }>
                            {({state, setData, setStyle}: ElementContainer) => (
                            <$group>
                                <$field>
                                    {/* <label>Text: </label><input type="text" value={ state.data.text } onChange={ e => setData({text: e.target.value}) }/>                                     */}
                                </$field>
                                <$field>
                                    <label>Size: </label><input type="text" defaultValue="" onChange={e => {if(Number.isInteger(Number.parseInt(e.target.value))) setStyle({"font-size": e.target.value + "px"})}}/>    
                                </$field>
                                <$field>
                                    <label>Color: </label><input type="text" defaultValue="" onChange={e => setStyle({color: e.target.value})}/>
                                    <button onClick={ () => this.setState({colorPicked: !this.state.colorPicked})}></button>
                                    {this.state.colorPicked &&  <SketchPicker onChangeComplete = {color => setStyle({color: color.hex}) }/>}
                                   
                                </$field>
                                <$field>
                                    <label>BackgroundColor: </label><input type="text" defaultValue="" onChange={e => setStyle({"background-color": e.target.value})}/>    
                                    <button onClick={ () => this.setState({bgPicked: !this.state.bgPicked})}></button>
                                    {this.state.bgPicked &&  <SketchPicker onChangeComplete = {color => setStyle({"background-color": color.hex}) }/>}
                                </$field>
                                <$field>
                                    <label>Border: </label> <input type="checkbox" defaultChecked={true} onChange={e => setStyle({"border-style": e.target.checked ? "solid": "none"})} /> 
                                </$field>
                            </$group>)}
                        </Subscribe>)
                }}
            </Subscribe>
        )
    }
}

export default Inspector