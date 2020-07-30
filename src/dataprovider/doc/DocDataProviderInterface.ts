import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import DocDataInterface from "@/model/doc/DocDataInterface";

/**
 * Data provider to get the documentations of SoftDocLinker from
 * a specified data source.
 * The data source is specified by the implementation of this interface.
 *
 * @since 2.0.0
 */
export default interface DocDataProviderInterface {
    /**
     * Load new config data from data source.
     *
     * @returns Promise<DocDataInterface>
     */
    load(): Promise<DocDataInterface>;
}
