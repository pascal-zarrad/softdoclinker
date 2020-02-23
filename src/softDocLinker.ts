import SoftDocLinkerInterface from "./softDocLinkerInterface";
import DataRepositoryInterface from "./model/dataRepositoryInterface";
import ConfigDataInterface from "./model/config/configDataInterface";
import DocCollectionInterface from "./model/doc/docCollectionInterface";
import DocCollectionDataRepository from "./model/doc/docCollectionDataRepository";
import ConfigDataRepository from "./model/config/configDataRepository";
import ConfigDataProviderFactory from "./dataprovider/config/configDataProviderFactory";
import CacheManagementFactory from "./cache/cacheManagementFactory";
import CacheDataStorageFactory from "./cache/cacheDataStorageFactory";
import DocDataProviderFactory from "./dataprovider/doc/docDataProviderFactory";

/**
 * Is responsible to compose the data management together and
 * make it available to the components.
 *
 * @since 2.0.0
 */
export default class SoftDocLinker implements SoftDocLinkerInterface {
    /**
     * The CacheManagementFactory used to create
     * CacheManagementInterface instances.
     */
    protected _cacheManagementFactory: CacheManagementFactory;

    /**
     * The CacheDataStorageFactory used to create
     * CacheDataStorage instances.
     */
    protected _cacheDataStorageFactory: CacheDataStorageFactory;

    /**
     * The ConfigDataProviderFactory used to create
     * DataProviderInterface<ConfigDataInterface> instances.
     */
    protected _configDataProviderFactory: ConfigDataProviderFactory;

    /**
     *
     */
    protected _docDataProviderFactory: DocDataProviderFactory;

    /**
     * The config data repository that manages the config data
     */
    protected _configDataRepository?: DataRepositoryInterface<
        ConfigDataInterface
    >;

    /**
     * The data repository that manages the available documentations
     */
    protected _docCollectionDataRepository?: DataRepositoryInterface<
        DocCollectionInterface
    >;

    constructor() {
        this._configDataProviderFactory = new ConfigDataProviderFactory();
        this._cacheDataStorageFactory = new CacheDataStorageFactory();
        this._cacheManagementFactory = new CacheManagementFactory();
        this._docDataProviderFactory = new DocDataProviderFactory();
    }

    /**
     * @inheritdoc
     */
    public async getConfigDataRepository(): Promise<
        DataRepositoryInterface<ConfigDataInterface>
    > {
        if (this._configDataRepository !== undefined) {
            return this._configDataRepository;
        }

        this._configDataRepository = new ConfigDataRepository(
            this._configDataProviderFactory.create("ajax"),
            this._cacheManagementFactory.create("indexedDB"),
            this._cacheDataStorageFactory
        );

        return this._configDataRepository;
    }

    /**
     * @inheritdoc
     */
    public async getDocDataRepository(): Promise<
        DataRepositoryInterface<DocCollectionInterface>
    > {
        if (this._docCollectionDataRepository !== undefined) {
            return this._docCollectionDataRepository;
        }

        const configDataRepository: DataRepositoryInterface<ConfigDataInterface> = await this.getConfigDataRepository();

        this._docCollectionDataRepository = new DocCollectionDataRepository(
            this._docDataProviderFactory.create(
                (
                    await configDataRepository.load(
                        ConfigDataRepository.CONFIG_KEY
                    )
                ).backend
            ),
            this._cacheManagementFactory.create(
                (
                    await configDataRepository.load(
                        ConfigDataRepository.CONFIG_KEY
                    )
                ).cache
            ),
            this._cacheDataStorageFactory
        );

        return this._docCollectionDataRepository;
    }
}
