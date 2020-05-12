import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import DataRepositoryInterface from "@/model/DataRepositoryInterface";
import defaultSharedState from "@/model/defaultSharedState";
import SharedStateInterface from "@/model/SharedStateInterface";
import StateManagementInterface from "@/model/StateManagementInterface";
import DocCollectionInterface from "@/model/doc/DocCollectionInterface";
import ConfigDataRepository from "@/model/config/ConfigDataRepository";
import DocCollectionDataRepository from "@/model/doc/DocCollectionDataRepository";

/**
 * State management that manages the data used by the rendering.
 *
 * @since 2.0.0
 */
export default class StateManagement implements StateManagementInterface {
    /**
     * The repository used to pull the configuration data
     */
    protected _configDataRepository: DataRepositoryInterface<
        ConfigDataInterface
    >;

    /**
     * The repository used to pull the documentation data
     */
    protected _docDataRepository: DataRepositoryInterface<
        DocCollectionInterface
    >;

    /**
     * The shared state of SoftDocLinker
     */
    private _sharedState: SharedStateInterface;

    /**
     * Constructor
     *
     * @param configDataRepository
     * @param docDataRepository
     * @param sharedState
     */
    constructor(
        configDataRepository: DataRepositoryInterface<ConfigDataInterface>,
        docDataRepository: DataRepositoryInterface<DocCollectionInterface>,
        sharedState: SharedStateInterface = defaultSharedState()
    ) {
        this._configDataRepository = configDataRepository;
        this._docDataRepository = docDataRepository;
        this._sharedState = sharedState;
    }

    /**
     * @inheritdoc
     */
    public async update(forceRefresh: boolean): Promise<SharedStateInterface> {
        try {
            this._sharedState.loading = true;

            this._sharedState.currentConfig = await this._configDataRepository.load(
                ConfigDataRepository.CONFIG_KEY,
                forceRefresh
            );

            this._sharedState.currentDocData = await this._docDataRepository.load(
                DocCollectionDataRepository.DOC_KEY,
                forceRefresh
            );
        } catch (error) {
            throw error;
        } finally {
            this._sharedState.loading = false;
        }

        return this._sharedState;
    }

    /**
     * @inheritdoc
     */
    public get sharedState(): SharedStateInterface {
        return this._sharedState;
    }

    /**
     * @inheritdoc
     */
    public set sharedState(sharedState: SharedStateInterface) {
        this._sharedState = sharedState;
    }
}
