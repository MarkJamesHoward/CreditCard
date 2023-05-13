import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

export const tagName = "credit-card";

@customElement("credit-card")
export class CreditCard extends LitElement {
  @property({ reflect: true, type: String })
  sortingby;

  @property()
  issuer = "Title";

  @property()
  plan = "Plan";

  @property({ reflect: true, type: String })
  rate = 0;

  @property({ reflect: true, type: String })
  fee = 0;

  @property({ reflect: true, type: Boolean })
  airpoints = false;

  @property({ reflect: true, type: String })
  link;

  @property()
  cardImage = {};

  @property({ reflect: true, type: Boolean })
  fullScreen;

  render() {
    const viewTransCardImage =
      this.issuer.replaceAll(" ", "") +
      this.plan.replaceAll(" ", "") +
      "CardImageVT";

    const viewTransIssuerPlan =
      this.issuer.replaceAll(" ", "") +
      this.plan.replaceAll(" ", "") +
      "IssuerPlanVT";

    return html` ${when(
      !this.fullScreen,
      () => html`
        <link rel="stylesheet" href="./tailwindGenerated.css" />
        <div
          class="@container"
          style="display: flex; flex-direction: row; justify-content: space-between; 
        border-style: solid; border-thickness: 1px; border-color: LightGray;margin: 5px;
        border-radius: 5px; padding: 5px"
        >
          <div class="flex flex-col @4xl:flex-row font-bold basis-1/3">
            <img
              width="100px"
              style="object-fit: contain;margin-right:5px;view-transition-name: ${viewTransCardImage}"
              src=${this.cardImage}
            />
            <div
              class="flex flex-col @4xl:flex-row order-first @4xl:order-last"
              style="view-transition-name: ${viewTransIssuerPlan}"
            >
              <div class="mr-2">${this.issuer}</div>
              <div>${this.plan}</div>
            </div>
          </div>
          <div
            style="display: flex; flex-direction: column;flex-basis:50%; font-weight: 700"
          >
            <div>
              Purchase Rate
              ${when(
                this.sortingby == "rate",
                () => html`<span style="color: red"> ${this.rate}% </span>`,
                () => html`<span> ${this.rate} % </span>`
              )}
            </div>
            <div>
              Fee
              ${when(
                this.sortingby == "fee",
                () => html`<span style="color: red"> $${this.fee}</span>`,
                () => html`<span> $${this.fee}</span>`
              )}
            </div>
            ${when(
              this.airpoints,
              () => html`<div>Airpoints</div>`,
              () => html``
            )}
          </div>
          <a href=${this.link}>More Details</a>
        </div>
      `,
      () => html`
        <link rel="stylesheet" href="./tailwindGenerated.css" />
        <div class="flex flex-col justify-between items-center h-screen">
          <div
            style="view-transition-name:  ${viewTransIssuerPlan}"
            class="text-5xl font-bold text-center"
          >
            ${this.issuer} ${this.plan}
          </div>
          <img
            style="view-transition-name:  ${viewTransCardImage}"
            class="w-[50vmin]"
            src="${this.cardImage}"
          />
          <!-- <article set:html={content} /> -->
          <a
            class="justify-self-end px-6 m-10 text-center py-3 text-blue-100 no-underline
       bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200"
            href="/"
            >Back</a
          >
        </div>
      `
    )}`;
  }
}
