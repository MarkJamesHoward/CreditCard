import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { TWStyles } from "./tailwind/twlit.js";

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
  cashRate = 0;

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

  static styles = [css``, TWStyles];

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
        <div
          class="@container flex flex-row justify-between p-3"
          style="border-style: solid; border-thickness: 1px; border-color: LightGray;margin: 5px;
        border-radius: 5px"
        >
          <div
            class="flex flex-col @2xl:items-center @2xl:flex-row font-bold basis-1/3"
          >
            <div
              class="flex grow basis-1/2   @2xl:items-center @2xl:flex-row"
              style="view-transition-name: ${viewTransIssuerPlan} "
            >
              <p class="mr-2 self-center" style="white-space:nowrap">
                ${this.issuer} ${this.plan}
              </p>
            </div>
            <img
              width="100px"
              class="justify-center justify-items-center self-start"
              style="object-fit: contain;margin-right:5px;view-transition-name: ${viewTransCardImage}"
              src=${this.cardImage}
            />
          </div>
          <div
            class="flex flex-col shrink items-center justify-center justify-items-center font-bold"
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
          <a
            class="text-center hidden @2xl:block px-4 py-2 self-center text-blue-100 no-underline
       bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200"
            href=${this.link}
            >More Details</a
          >
        </div>
      `,
      () => html`
        <div class="@container flex flex-col justify-between h-screen">
          <div
            style="view-transition-name:  ${viewTransIssuerPlan}"
            class="text-5xl font-bold text-center flex-grow"
          >
            ${this.issuer} ${this.plan}
          </div>
          <div class="flex-grow self-center">
            <img
              style="view-transition-name:  ${viewTransCardImage}"
              class="w-[50vmin] "
              src="${this.cardImage}"
            />
          </div>
          <!-- <article set:html={content} /> -->
          <div class="flex flex-col @lg:flex-row justify-around grow">
            <div
              class="text-xl @2xl:text-3xl  @5xl:text-5xl flex flex-col items-center"
            >
              <div>Purchase Rate</div>
              <div>${this.rate}%</div>
            </div>
            <div
              class="text-xl @2xl:text-3xl @5xl:text-5xl flex flex-col items-center"
            >
              <div>Cash Advance Rate</div>
              <div>${this.cashRate}%</div>
            </div>
            <div
              class="text-xl @2xl:text-3xl @5xl:text-5xl flex flex-col items-center"
            >
              <div>Annual Fee</div>
              <div>$${this.fee}</div>
            </div>
          </div>
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
