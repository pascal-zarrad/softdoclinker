/* istanbul ignore file */

import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import DataRepositoryInterface from "@/model/DataRepositoryInterface";
import DocCollectionInterface from "@/model/doc/DocCollectionInterface";
import StateManagement from "@/model/StateManagement";
import StateManagementInterface from "@/model/StateManagementInterface";
import SharedStateInterface from "@/model/SharedStateInterface";
import defaultSharedState from "@/model/defaultSharedState";

export default class StateManagementFactory {
    public create(
        configDataRepository: DataRepositoryInterface<ConfigDataInterface>,
        docCollectionRepository: DataRepositoryInterface<
            DocCollectionInterface
        >,
        sharedState: SharedStateInterface = defaultSharedState()
    ): StateManagementInterface {
        return new StateManagement(
            configDataRepository,
            docCollectionRepository,
            sharedState
        );
    }
}
