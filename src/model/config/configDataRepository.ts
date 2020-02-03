import DataRepositoryInterface from "../dataRepositoryInterface";
import ConfigDataInterface from "./configDataInterface";

/**
 * Data repository that is used to get base config data.
 *
 * @since 2.0.0
 */
export default class ConfigDataRepository
    implements DataRepositoryInterface<ConfigDataInterface> {
    /**
     * @inheritdoc
     */
    load(key: string): ConfigDataInterface {
        throw new Error("Method not implemented.");
    }
}
