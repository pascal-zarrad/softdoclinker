import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import DataRepositoryInterface from "@/model/DataRepositoryInterface";
import defaultSharedState from "@/model/defaultSharedState";
import SharedStateInterface from "@/model/SharedStateInterface";
import StateManagementInterface from "@/model/StateManagementInterface";
import DocCollectionInterface from "@/model/doc/DocCollectionInterface";
import ConfigDataRepository from "@/model/config/ConfigDataRepository";
import DocCollectionDataRepository from "@/model/doc/DocCollectionDataRepository";
import NotificationManagementInterface from "@/service/notification/NotificationManagementInterface";
import NotificationType from "./notification/NotificationType";
import NotificationFactory from "./notification/NotificationFactory";

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
     * The notification management used to display notifications to the user
     */
    protected _notificationManagement: NotificationManagementInterface;

    /**
     * Factory used to build notifications.
     */
    protected _notificationFactory: NotificationFactory;

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
        notificationManagement: NotificationManagementInterface,
        notificationFactory: NotificationFactory = new NotificationFactory(),
        sharedState: SharedStateInterface = defaultSharedState()
    ) {
        this._configDataRepository = configDataRepository;
        this._docDataRepository = docDataRepository;
        this._notificationManagement = notificationManagement;
        this._notificationFactory = notificationFactory;
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
            this._notificationManagement.notify(
                this._notificationFactory.create(
                    "Failed to refresh data!",
                    NotificationType.ERROR
                )
            );
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
