/* istanbul ignore file */

import ConfigDataInterface from "@/model/config/configDataInterface";
import DefaultConfigData from "@/model/config/defaultConfigData";
import DefaultDocCollectionData from "@/model/doc/defaultDocCollectionData";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";
import SharedStateInterface from "@/model/sharedStateInterface";

/**
 * Data class that provides a default state for the application.
 *
 * @since 2.0.0
 */
export default class DefaultSharedState implements SharedStateInterface {
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
    public currentDocData: DocCollectionInterface = new DefaultDocCollectionData();
}
