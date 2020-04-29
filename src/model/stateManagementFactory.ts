/* istanbul ignore file */

import ConfigDataInterface from "@/model/config/configDataInterface";
import DataRepositoryInterface from "@/model/dataRepositoryInterface";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";
import StateManagement from "@/model/stateManagement";
import StateManagementInterface from "@/model/stateManagementInterface";

export default class StateManagementFactory {
    public create(
        configDataRepository: DataRepositoryInterface<ConfigDataInterface>,
        docCollectionRepository: DataRepositoryInterface<DocCollectionInterface>
    ): StateManagementInterface {
        return new StateManagement(
            configDataRepository,
            docCollectionRepository
        );
    }
}
