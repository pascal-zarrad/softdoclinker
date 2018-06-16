import {AjaxJsonDataResolver, JSonDataReceiver} from "./ajaxJsonDataResolver";
import {CoreConfiguration, DocumentationConfiguration} from "./configuration";
import {CustomizationProcessor} from "./customizationProcessor";
import {DocumentationListProcessor} from "./documentationListProcessor";

declare var jQuery: any;

/**
 * Main class of SoftDocLinker
 */
export class SoftDocLinker {

    /**
     * The current version of SoftDocLinker
     * @type {string}
     */
    public static readonly VERSION = "1.1.0";

    /**
     * Before our app starts we detect the browser.
     * If it's mobile it will be optimized for the small screens and remove the viewer.
     */
    public readonly isMobileBrowser: boolean = jQuery.browser.mobile;

    /**
     * Our CoreConfiguration which will be loaded from ../cfg/cfg.json
     */
    public configuration: CoreConfiguration;
    /**
     * The configuration that provides the data for the documentation list.
     */
    public documentationConfiguration: DocumentationConfiguration;
    /**
     * Our AjaxJsonDataResolver which is used to resolve our required data.
     */
    private readonly dataResolver: AjaxJsonDataResolver;
    /**
     * The CustomizationProcessor used to customize the page.
     */
    private readonly _customizationProcessor: CustomizationProcessor;

    /**
     * The DocumentationListProcessor used to process the DocumentationConfiguration
     */
    private readonly _documentationListProcessor: DocumentationListProcessor;

    /**
     * Indicates the status if the entire page resize has been done
     */
    private initialResizeComplete: boolean = false;

    private constructor() {
        document.getElementById('soft-doc-linker-version').innerText = SoftDocLinker.VERSION;
        if (this.isMobileBrowser) {
            this.optimizeMobileView();
        } else {
            document.getElementById('document-frame').setAttribute("src", "noneload.html");
            jQuery("#document-viewer").show();
        }
        this.dataResolver = new AjaxJsonDataResolver();
        this._customizationProcessor = new CustomizationProcessor();
        this._documentationListProcessor = new DocumentationListProcessor();
        this.loadCoreConfig(); // Load the core config to apply customized settings
        this.loadDocumentations(); // Load the documentations to list them.
        this.registerFooterAndListResizeHandler(); // Resize our fixed footer to parent element's width
    }

    get documentationListProcessor(): DocumentationListProcessor {
        return this._documentationListProcessor;
    }

    /**
     * Removes the viewer and set's the document list to full size
     */
    private optimizeMobileView() {
        document.getElementById('document-frame').remove();
        document.getElementById('doc-list').classList.remove("col-md-3");
        document.getElementById('doc-list').classList.add("col-md-12");
        document.getElementById('doc-list').classList.remove("doc-list-body");
        document.getElementById('doc-list').classList.add("doc-list-body-mobile");
        document.getElementById("doc-list-container").classList.remove("doc-list-background");
        document.getElementById("doc-list-container").classList.add("doc-list-background-mobile");
    }

    get customizationProcessor(): CustomizationProcessor {
        return this._customizationProcessor;
    }

    /**
     * Load the documentations from the DocumentationConfiguration
     */
    private loadDocumentations() {
        this.dataResolver.loadData("cfg/docs.json", new DocumentationConfigurationReceiver(this));
    }

    /**
     * Entry point of Web-App
     */
    public static main() {
        new SoftDocLinker();
    }

    /**
     * Loads the core configuration.
     */
    private loadCoreConfig() {
        this.dataResolver.loadData("cfg/cfg.json", new CoreConfigurationReceiver(this));
    }

    /**
     * Adjust the footer size to fit the document list viewer
     */
    public adjustFooterAndListSize() {
        // Adjust footer size
        let parentElement: HTMLElement = document.getElementById("doc-list");
        let docListFooterElement = jQuery(".doc-list-footer");
        docListFooterElement.width(parentElement.offsetWidth);
        // Adjust list size
        if (this.initialResizeComplete) {
            let windowHeight: number = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            let listHeight: number = (windowHeight - docListFooterElement.height() - jQuery("#navigation-bar").height()) + 3;
            jQuery("#doc-list").height(listHeight);
        } else {
            let windowHeight: number = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            let listHeight: number = (windowHeight - 2 * docListFooterElement.height() - jQuery("#navigation-bar").height()) + 3;
            jQuery("#doc-list").height(listHeight);
        }
    }

    /**
     * Register a resize listener to control resizing of fixed footer element
     */
    private registerFooterAndListResizeHandler() {
        this.adjustFooterAndListSize();
        this.initialResizeComplete = true;
        let me = this;
        jQuery(window).resize(
            function () {
                me.adjustFooterAndListSize();
            })
    }
}

/**
 * The receiver for the CoreConfiguration.
 * After receiving the CoreConfiguration, this receiver does deserialize the received JSon object to a
 * CoreConfiguration object and passes it to our SoftDocLinker
 * instance and also calls our CustomizationProcessor to update the page using the received configuration.
 */
class CoreConfigurationReceiver extends JSonDataReceiver {

    /**
     * Our SoftDocLinker instance
     */
    private readonly softDocLinker: SoftDocLinker;

    constructor(softDocLinker: SoftDocLinker) {
        super();
        this.softDocLinker = softDocLinker;
    }

    receive(data) {
        let coreConfiguration: CoreConfiguration = CoreConfiguration.getCoreConfigurationFromJsonObject(data);
        this.softDocLinker.configuration = coreConfiguration;
        this.softDocLinker.customizationProcessor.updateWithConfiguration(coreConfiguration);
    }

}

/**
 * The receiver for the DocumentationConfiguration
 * After receiving the DocumentationConfiguration, this receiver does deserialize the received JSon object to a
 * DocumentationConfiguration object and passes it to our SoftDocLinker instance and also calls our DocumentationListProcessor to
 * update the list.
 */
class DocumentationConfigurationReceiver extends JSonDataReceiver {

    /**
     * Our SoftDocLinker instance
     */
    private readonly softDocLinker: SoftDocLinker;

    constructor(softDocLinker: SoftDocLinker) {
        super();
        this.softDocLinker = softDocLinker;
    }

    receive(data) {
        let documentationConfiguration: DocumentationConfiguration = DocumentationConfiguration.getDocumentationConfigurationFromJSonObject(data);
        this.softDocLinker.documentationConfiguration = documentationConfiguration;
        this.softDocLinker.documentationListProcessor.updateDocumentationList(documentationConfiguration);
    }

}
SoftDocLinker.main();