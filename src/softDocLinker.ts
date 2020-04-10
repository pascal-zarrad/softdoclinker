import CacheDataStorageFactory from "@/cache/cacheDataStorageFactory";
import CacheManagementFactory from "@/cache/cacheManagementFactory";
import ConfigDataProviderFactory from "@/dataprovider/config/configDataProviderFactory";
import DocDataProviderFactory from "@/dataprovider/doc/docDataProviderFactory";
import ConfigDataInterface from "@/model/config/configDataInterface";
import ConfigDataRepository from "@/model/config/configDataRepository";
import DataRepositoryInterface from "@/model/dataRepositoryInterface";
import DefaultSoftDocLinkerSharedState from "@/model/defaultSoftDocLinkerSharedState";
import DocCollectionDataRepository from "@/model/doc/docCollectionDataRepository";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";
import SoftDocLinkerDataStateInterface from "@/model/softDocLinkerDataStateInterface";
import SoftDocLinkerInterface from "@/softDocLinkerInterface";

/**
 * Is responsible to compose the data management together and
 * make it available to the components.
 *
 * @since 2.0.0
 */
export class SoftDocLinker implements SoftDocLinkerInterface {
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
     * The DocDataProviderFactory used to create new DocDataProviders
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

    /**
     * Shared state that contains all the required data.
     */
    public sharedState: SoftDocLinkerDataStateInterface;

    /**
     * Constructor
     *
     * @param configDataProviderFactory
     * @param cacheDataStorageFactory
     * @param cacheManagementFactory
     * @param docDataProviderFactory
     */
    /* istanbul ignore next */
    constructor(
        configDataProviderFactory: ConfigDataProviderFactory = new ConfigDataProviderFactory(),
        cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory(),
        cacheManagementFactory: CacheManagementFactory = new CacheManagementFactory(),
        docDataProviderFactory: DocDataProviderFactory = new DocDataProviderFactory(),
        initialSharedState: SoftDocLinkerDataStateInterface = new DefaultSoftDocLinkerSharedState()
    ) {
        this._configDataProviderFactory = configDataProviderFactory;
        this._cacheDataStorageFactory = cacheDataStorageFactory;
        this._cacheManagementFactory = cacheManagementFactory;
        this._docDataProviderFactory = docDataProviderFactory;
        this.sharedState = initialSharedState;
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
        const configDataInterface: ConfigDataInterface = await configDataRepository.load(
            ConfigDataRepository.CONFIG_KEY
        );

        this._docCollectionDataRepository = new DocCollectionDataRepository(
            this._docDataProviderFactory.create(configDataInterface.backend),
            this._cacheManagementFactory.create(configDataInterface.cache),
            this._cacheDataStorageFactory
        );

        return this._docCollectionDataRepository;
    }
}

// Export single instance of SoftDocLinker

const SOFT_DOC_LINKER: SoftDocLinkerInterface = new SoftDocLinker();
export default SOFT_DOC_LINKER;
