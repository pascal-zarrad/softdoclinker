import {AjaxJsonDataResolver, JSonDataReceiver} from "./ajaxJsonDataResolver";
import {CoreConfiguration} from "./configuration";
import {CustomizationProcessor} from "./customizationProcessor";

/**
 * Main class of SoftDocLinker
 */
class SoftDocLinker {

    /**
     * Our CoreConfiguration which will be loaded from ../cfg/cfg.json
     */
    public configuration: CoreConfiguration;
    /**
     * Our AjaxJsonDataResolver which is used to resolve our required data.
     */
    private readonly dataResolver: AjaxJsonDataResolver;
    /**
     * The CustomizationProcessor used to customize the page.
     */
    private readonly _customizationProcessor: CustomizationProcessor;

    constructor() {
        this.dataResolver = new AjaxJsonDataResolver();
        this._customizationProcessor = new CustomizationProcessor();
        this.loadCoreConfig(); // Load the core config to apply customized settings
    }

    get customizationProcessor(): CustomizationProcessor {
        return this._customizationProcessor;
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

SoftDocLinker.main();