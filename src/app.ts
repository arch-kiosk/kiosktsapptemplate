import {KioskApp} from "kiosktsapplib";
import {nothing, TemplateResult, unsafeCSS} from "lit";
import { html } from "lit/static-html.js";


// import { SlDropdown } from "@shoelace-style/shoelace";

// @ts-ignore
import local_css from "./styles/test-app.sass?inline";

// noinspection CssUnresolvedCustomProperty
export class TestApp extends KioskApp {
    static styles = unsafeCSS(local_css);
    _messages: { [key: string]: object } = {};

    static properties = {
        ...super.properties,
    };

    constructor() {
        super();
    }

    firstUpdated(_changedProperties: any) {
        console.log("App first updated.");
        super.firstUpdated(_changedProperties);
    }

    apiConnected() {
        console.log("api is connected");
        // this.fetchConstants();
    }

    connectedCallback() {
        super.connectedCallback();
    }


    updated(_changedProperties: any) {
        super.updated(_changedProperties);
        console.log("updated: ", _changedProperties);
        if (_changedProperties.has("relations")) {
            if (this.apiContext) {
                const hm = this.renderRoot.querySelector("#hm");
                // @ts-ignore
                hm.hmNodes = this.relations;
            }
        }
    }

    protected renderApp() {
        return html`
            <div>Hello Test-App</div>
        `
    }

    protected renderToolbar() {
        return html`
            <div class="toolbar">
                <div id="toolbar-left">
                        <!--div class="toolbar-button"
                         @click="">
                        <i class="fas fa-expand"></i>
                    </div-->
                </div>
                <div class="toolbar-buttons">
                </div>
            </div>`;
    }

    // apiRender is only called once the api is connected.
    apiRender() {
        let dev: TemplateResult | typeof nothing = html``;
        // @ts-ignore
        if (import.meta.env.DEV) {
            dev = html`
                <div>
                    <div class="logged-in-message">logged in! Api is at ${this.apiContext.getApiUrl()}</div>
                    <div class="dev-tool-bar"><label>Open identifier:</label>
                    </div>
                </div>`;
        } else {
            dev = nothing;

        }
        let toolbar = this.renderToolbar();
        const app = html`${this.renderApp()}`;
        return html`<div class="header-frame">${dev}${toolbar}</div>${app}`;
    }
}

window.customElements.define("test-app", TestApp);
