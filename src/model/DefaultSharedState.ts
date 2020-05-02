/* istanbul ignore file */

import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import DefaultConfigData from "@/model/config/DefaultConfigData";
import DefaultDocCollectionData from "@/model/doc/DefaultDocCollectionData";
import DocCollectionInterface from "@/model/doc/DocCollectionInterface";
import SharedStateInterface from "@/model/SharedStateInterface";

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
