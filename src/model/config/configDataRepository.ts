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
        if (await this.cacheManagement.isValid(key)) {
            return (await this.cacheManagement.load(key)).data;
        }

        const configData: ConfigDataInterface = await this.dataProvider.load();

        const cacheItem = this.cacheDataStorageFactory.create(
            ConfigDataRepository.CONFIG_KEY,
            configData
        );

        this.cacheManagement.update(cacheItem);

        return configData;
    }
}
