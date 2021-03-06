import {CoreConfiguration} from "./configuration";

declare var $: any;

/**
 * The CustomizationProcessor is called once after the CoreConfiguration has been loaded.
 * It is used to customize the page as expected using the Data of the CoreConfiguration.
 */
export class CustomizationProcessor {

    /**
     * Applies the changes from the given config.
     * @param {CoreConfiguration} config The config which will be applied.
     */
    public updateWithConfiguration(config: CoreConfiguration): void {
        this.applyPageTitle(config);
        this.applyNavigationBarBrand(config);
        this.applyNavigationBarButton(config);
    }

    /**
     * Apply the custom title tag content
     * @param {CoreConfiguration} config The config from which the new title wil be grabbed.
     */
    private applyPageTitle(config: CoreConfiguration): void {
        document.getElementById("page-title").innerText = config.pageTitle;
    }

    /**
     * Apply the custom navbar brand to the navbar.
     * @param {CoreConfiguration} config The config from which the custom navigation bar brand text will be grabbed.
     */
    private applyNavigationBarBrand(config: CoreConfiguration): void {
        document.getElementById("navbar-brand").innerText = config.navbarBrand;
    }

    /**
     * Apply the settings to the button on the top right that can be customized
     * @param{CoreConfiguration} config The config from which the custom button is created
     */
    private applyNavigationBarButton(config: CoreConfiguration): void {
        if (config.navbarButtons != undefined) {
            let buttonContainer: HTMLElement = document.getElementById("navbar-buttons");
            for (let buttonRaw of config.navbarButtons) {
                let newButton: HTMLElement = document.createElement("a");
                let iconMeta: string;
                if (buttonRaw.icon != undefined && buttonRaw.icon !== "none") {
                    iconMeta = "fa fa-lg " + buttonRaw.icon;
                } else {
                    iconMeta = undefined;
                }
                let iconSpan = "";
                if (iconMeta != undefined) {
                    iconSpan = '<span class="' + iconMeta + '"></span> '
                }
                newButton.setAttribute("href", buttonRaw.target);
                newButton.classList.add("nav-link", "waves-effect", "waves-light");
                newButton.innerHTML = iconSpan + buttonRaw.displayText;
                buttonContainer.appendChild(newButton);
            }
        }
    }
}