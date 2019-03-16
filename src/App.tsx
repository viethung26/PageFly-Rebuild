import * as React from 'react'
// import Inspector from './components/Inspector';
import Page from './components/Page';
import Element from './components/Elements'
import styled from 'styled-components'

const $App = styled.div`
	display: grid;
	grid-template-columns: 100px 1fr 100px;
`

class App extends React.Component {
	public render() {
		return (
			<$App>
				<Element />
				<Page />	
				{/* <Inspector /> */}
			</$App>
			
		)
	}
}

export default App