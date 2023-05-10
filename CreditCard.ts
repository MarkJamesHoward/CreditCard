import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";

export const tagName = "credit-card";

@customElement("credit-card")
export class CreditCard extends LitElement {
  @property({ reflect: true, type: String })
  sortingby;

  @property()
  issuer = "Title";

  @property()
  plan = "Plan";

  @property()
  rate = 0;

  @property()
  fee = 0;

  @property()
  cardImage = {};

  render() {
    return html`
      <div
        style="display: flex; flex-direction: row; justify-content: space-between; 
        border-style: solid; border-thickness: 1px; border-color: LightGray;margin: 5px;
        border-radius: 5px; padding: 5px"
      >
        <div style="display: flex; flex-direction: row; font-weight: 800">
          <img style="width:50px;margin-right:5px" src=${this.cardImage} />
          <div style="display: flex; flex-direction: row">
            <div style="margin-right: 5px">${this.issuer}</div>
            <div>${this.plan}</div>
          </div>
        </div>
        <div
          style="display: flex; flex-direction: column;flex-basis:50%; font-weight: 700"
        >
          ${choose(
            this.sortingby,
            [
              [
                "rate",
                () =>
                  html`<div>
                      Purchase Rate
                      <span style="color: red">${this.rate}%</span>
                    </div>
                    <div>Fee $${this.fee}</div>`,
              ],
              [
                "fee",
                () => html`<div>Purchase Rate ${this.rate}%</div>
                  <div>Fee <span style="color: red">${this.fee}%</span></div>`,
              ],
            ],
            () => html`<div>Purchase Rate ${this.rate}%</div>
              <div>Fee ${this.fee}%</div>`
          )}
        </div>
      </div>
    `;
  }
}
