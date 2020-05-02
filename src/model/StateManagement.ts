import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import DataRepositoryInterface from "@/model/DataRepositoryInterface";
import DefaultSharedState from "@/model/DefaultSharedState";
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
        sharedState: SharedStateInterface = new DefaultSharedState()
    ) {
        this._configDataRepository = configDataRepository;
        this._docDataRepository = docDataRepository;
        this._sharedState = sharedState;
    }

    /**
     * @inheritdoc
     */
    public async update(forceRefresh: boolean): Promise<SharedStateInterface> {
        this._sharedState.currentConfig = await this._configDataRepository.load(
            ConfigDataRepository.CONFIG_KEY,
            forceRefresh
        );

        this._sharedState.currentDocData = await this._docDataRepository.load(
            DocCollectionDataRepository.DOC_KEY,
            forceRefresh
        );

        return this._sharedState;
    }

    /**
     * @inheritdoc
     */
    /* istanbul ignore next */
    getState(): SharedStateInterface {
        return this._sharedState;
    }

    /**
     * @inheritdoc
     */
    /* istanbul ignore next */
    setState(sharedState: SharedStateInterface): void {
        this._sharedState = sharedState;
    }

    /* istanbul ignore next */
    protected get sharedState(): SharedStateInterface {
        return this._sharedState;
    }

    /* istanbul ignore next */
    protected set sharedState(value: SharedStateInterface) {
        this._sharedState = value;
    }
}
