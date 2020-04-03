import SoftDocLinkerDataStateInterface from "./softDocLinkerDataStateInterface";
import ConfigDataInterface from "./config/configDataInterface";
import DefaultConfigData from "./config/defaultConfigData";
import DocDataInterface from "./doc/docDataInterface";
import DefaultDocData from "./doc/defaultDocData";

/**
 * Data class that provides a default state for the application.
 *
 * @since 2.0.0
 */
export default class DefaultSoftDocLinkerSharedState
    implements SoftDocLinkerDataStateInterface {
    /**
     * @inheritdoc
     */
    public loading: boolean = true;

    /**
     * @inheritdoc
     */
    public currentConfig: ConfigDataInterface = new DefaultConfigData();

    /**
     * @inheritdoc
     */
    public currentDocData: DocDataInterface = new DefaultDocData();
}
