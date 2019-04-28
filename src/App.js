import React from 'react';
import img1Uri from './static/male-default.jpeg'
import img2Uri from './static/female-default.jpeg'
import styled from 'styled-components'
import './App.css';
import FilterTransition from './components/FilterTransition/FilterTransition';

const Button = styled.div`
  margin: 10px;
  padding: 10px;
  border: solid 1px #000;
`


class App extends React.Component {
  state = {
    active: false,
  }

  _handleClick = () => {
    this.setState({ active: !this.state.active })
  }

  render() {
    return (
      <div className="App">
        <FilterTransition
          defaultElement={img1Uri}
          secondaryElement={img2Uri}
          active={this.state.active}
        />

        <div>
          <Button onClick={this._handleClick}>Click Me // {JSON.stringify(this.state.active)}</Button>
        </div>
      </div>
    );
  }
}

export default App;
