/* istanbul ignore file */

import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import DataRepositoryInterface from "@/model/DataRepositoryInterface";
import DocCollectionInterface from "@/model/doc/DocCollectionInterface";
import StateManagement from "@/model/StateManagement";
import StateManagementInterface from "@/model/StateManagementInterface";

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
