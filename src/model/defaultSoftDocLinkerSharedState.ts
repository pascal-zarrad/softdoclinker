import ConfigDataInterface from "@/model/config/configDataInterface";
import DefaultConfigData from "@/model/config/defaultConfigData";
import DefaultDocData from "@/model/doc/defaultDocData";
import DocDataInterface from "@/model/doc/docDataInterface";
import SoftDocLinkerDataStateInterface from "@/model/softDocLinkerDataStateInterface";

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
