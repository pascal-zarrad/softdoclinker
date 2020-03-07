import ConfigDataInterface from "./configDataInterface";
import AbstractDataRepository from "../abstractDataRepository";

/**
 * Data repository that is used to get base config data.
 *
 * @since 2.0.0
 */
export default class ConfigDataRepository extends AbstractDataRepository<
    ConfigDataInterface
> {
    /**
     * The name of the key that is used by the cache management
     */
    public static readonly CONFIG_KEY = "softdoclinker-config";

    /**
     * @inheritdoc
     */
    public async load(key: string): Promise<ConfigDataInterface> {
        if (await this._cacheManagement.isValid(key)) {
            return (await this._cacheManagement.load(key)).data;
        }

        const configData: ConfigDataInterface = await this._dataProvider.load();

        const cacheItem = this._cacheDataStorageFactory.create(key, configData);

        this._cacheManagement.update(cacheItem);

        return configData;
    }
}
