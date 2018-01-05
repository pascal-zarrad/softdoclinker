import {CoreConfiguration} from "./configuration";

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
    }

    /**
     * Apply the custom title tag content
     * @param {CoreConfiguration} config The config from which the new title wil be grabbed.
     */
    private applyPageTitle(config: CoreConfiguration): void {
        document.getElementById("page-title").innerText = config.pageTitle;
    }
}