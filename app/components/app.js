import { h, Component } from 'preact';
import 'normalize.css';
import './app.scss';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <h1 class="hero">Minimal Preact Boilerplate!</h1>
      </div>
    );
  }
}
