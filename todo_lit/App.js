import { LitElement } from "lit";
import "./src/views/ListTodosView";
export default class App extends LitElement {
    constructor(){

    }

    render(){
        return html`
            <list-todos-view>
            </list-todos-view>
        `;
    }
}

customElements.define('app', App);