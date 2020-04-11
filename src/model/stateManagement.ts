import ConfigDataInterface from "@/model/config/configDataInterface";
import DataRepositoryInterface from "@/model/dataRepositoryInterface";
import DefaultSharedState from "@/model/defaultSharedState";
import SharedStateInterface from "@/model/sharedStateInterface";
import StateManagementInterface from "@/model/stateManagementInterface";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";

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
    protected _sharedState: SharedStateInterface;

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
    update(forceRefresh: boolean): Promise<SharedStateInterface> {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    getState(): SharedStateInterface {
        return this._sharedState;
    }
}
