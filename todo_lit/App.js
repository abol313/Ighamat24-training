import { css, html, LitElement, unsafeCSS } from "lit";
import "./src/views/ListTodosView";
import mainStyle from "./src/assets/styles/main.scss";
export default class App extends LitElement {
    static styles = css`${unsafeCSS(mainStyle)}`;
    constructor(){
        super();
    }

    render(){
        return html`
            <list-todos-view>
            </list-todos-view>
        `;
    }
}

customElements.define('app-root', App);