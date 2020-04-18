import CacheDataStorageFactory from "@/cache/cacheDataStorageFactory";
import CacheManagementFactory from "@/cache/cacheManagementFactory";
import ConfigDataProviderFactory from "@/dataprovider/config/configDataProviderFactory";
import DocCollectionDataProviderFactory from "@/dataprovider/doc/docCollectionDataProviderFactory";
import ConfigDataInterface from "@/model/config/configDataInterface";
import ConfigDataRepository from "@/model/config/configDataRepository";
import ConfigDataRepositoryFactory from "@/model/config/configDataRepositoryFactory";
import DataRepositoryInterface from "@/model/dataRepositoryInterface";
import DocCollectionDataRepositoryFactory from "@/model/doc/docCollectionDataRepositoryFactory";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";
import StateManagementFactory from "@/model/stateManagementFactory";
import StateManagementInterface from "@/model/stateManagementInterface";
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
     * The config data repository that manages the config data
     */
    protected _configDataRepository?: DataRepositoryInterface<
        ConfigDataInterface
    >;

    /**
     * The factory used to create ConfigDataRepository instances
     */
    protected _configDataRepositoryFactory: ConfigDataRepositoryFactory;

    /**
     * The DocDataProviderFactory used to create new DocDataProviders
     */
    protected _docCollectionDataProviderFactory: DocCollectionDataProviderFactory;

    /**
     * The factory used to create DocCollectionRepository instances
     */
    protected _docCollectionDataRepositoryFactory: DocCollectionDataRepositoryFactory;

    /**
     * The data repository that manages the available documentations
     */
    protected _docCollectionDataRepository?: DataRepositoryInterface<
        DocCollectionInterface
    >;

    /**
     * The factory used to create StateManagement instances
     */
    protected _stateManagementFactory: StateManagementFactory;

    /**
     * State management that handles data fetching and sharing of the current state.
     */
    protected _stateManagement?: StateManagementInterface;

    /**
     * Constructor
     *
     * @param configDataProviderFactory
     * @param cacheDataStorageFactory
     * @param cacheManagementFactory
     * @param docCollectionDataProviderFactory
     */
    /* istanbul ignore next */
    constructor(
        configDataProviderFactory: ConfigDataProviderFactory = new ConfigDataProviderFactory(),
        cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory(),
        configDataRepositoryFactory: ConfigDataRepositoryFactory = new ConfigDataRepositoryFactory(),
        cacheManagementFactory: CacheManagementFactory = new CacheManagementFactory(),
        docCollectionDataProviderFactory: DocCollectionDataProviderFactory = new DocCollectionDataProviderFactory(),
        docCollectionDataRepositoryFactory: DocCollectionDataRepositoryFactory = new DocCollectionDataRepositoryFactory(),
        stateManagementFactory: StateManagementFactory = new StateManagementFactory()
    ) {
        this._configDataProviderFactory = configDataProviderFactory;
        this._configDataRepositoryFactory = configDataRepositoryFactory;
        this._cacheDataStorageFactory = cacheDataStorageFactory;
        this._cacheManagementFactory = cacheManagementFactory;
        this._docCollectionDataProviderFactory = docCollectionDataProviderFactory;
        this._docCollectionDataRepositoryFactory = docCollectionDataRepositoryFactory;
        this._stateManagementFactory = stateManagementFactory;
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

        this._configDataRepository = this._configDataRepositoryFactory.create(
            this._configDataProviderFactory.create("ajax"),
            this._cacheManagementFactory.create("indexedDB"),
            this._cacheDataStorageFactory
        );

        return this._configDataRepository;
    }

    /**
     * @inheritdoc
     */
    public async getDocCollectionDataRepository(): Promise<
        DataRepositoryInterface<DocCollectionInterface>
    > {
        if (this._docCollectionDataRepository !== undefined) {
            return this._docCollectionDataRepository;
        }

        const configDataRepository: DataRepositoryInterface<ConfigDataInterface> = await this.getConfigDataRepository();
        const configDataInterface: ConfigDataInterface = await configDataRepository.load(
            ConfigDataRepository.CONFIG_KEY
        );

        this._docCollectionDataRepository = this._docCollectionDataRepositoryFactory.create(
            this._docCollectionDataProviderFactory.create(
                configDataInterface.backend
            ),
            this._cacheManagementFactory.create(configDataInterface.cache),
            this._cacheDataStorageFactory
        );

        return this._docCollectionDataRepository;
    }

    /**
     * @inheritdoc
     */
    public async getStateManagement(): Promise<StateManagementInterface> {
        if (this._stateManagement !== undefined) {
            return this._stateManagement;
        }

        this._stateManagement = this._stateManagementFactory.create(
            await this.getConfigDataRepository(),
            await this.getDocCollectionDataRepository()
        );

        return this._stateManagement;
    }
}

// Export single instance of SoftDocLinker
const SOFT_DOC_LINKER: SoftDocLinkerInterface = new SoftDocLinker();
export default SOFT_DOC_LINKER;
