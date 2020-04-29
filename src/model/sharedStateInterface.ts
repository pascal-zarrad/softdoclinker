import ConfigDataInterface from "@/model/config/configDataInterface";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";

/**
 * Interface that defines the applications state.
 *
 * @since 2.0.0
 */
export default interface SharedStateInterface {
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
    currentDocData: DocCollectionInterface;
}
