import ConfigDataInterface from "./config/configDataInterface";
import DocDataInterface from "./doc/docDataInterface";

/**
 * Interface that defines the applications state.
 *
 * @since 2.0.0
 */
export default interface SoftDocLinkerDataStateInterface {
    /**
     * Can be set to true to show that the application is loading data asynchronously.
     */
    loading: boolean;

    /**
     * Current configuration used by the application
     */
    currentConfig: ConfigDataInterface;

    /**
     * Current docs that are loaded and used by the application
     */
    currentDocData: DocDataInterface;
}
