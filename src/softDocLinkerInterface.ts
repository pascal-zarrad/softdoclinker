import DataRepositoryInterface from "./model/dataRepositoryInterface";
import ConfigDataInterface from "./model/config/configDataInterface";
import DocCollectionInterface from "./model/doc/docCollectionInterface";
import SoftDocLinkerDataStateInterface from "./model/softDocLinkerDataStateInterface";

/**
 * Defines the interface between our Vue components and
 * the data management.
 *
 * @since 2.0.0
 */
export default interface SoftDocLinkerInterface {
    /**
     * Shared state that holds the data that should be shared through all components.
     */
    sharedState: SoftDocLinkerDataStateInterface;

    /**
     * Get the repository that manages the config data.
     * As the repository can depend on external configuration
     * data, this function will return a Promise to allow the
     * application to grab the data from the server
     * before providing the requested repository.
     */
    getConfigDataRepository(): Promise<
        DataRepositoryInterface<ConfigDataInterface>
    >;

    /**
     * Get the repository that manages the available documentations.
     * As the repository can depend on external configuration
     * data, this function will return a Promise to allow the
     * application to grab the data from the server
     * before providing the requested repository.
     */
    getDocDataRepository(): Promise<
        DataRepositoryInterface<DocCollectionInterface>
    >;
}
