import Axios from "axios";
import DocDataProviderInterface from "./docDataProviderInterface";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";

/**
 * A data provider that gains its data from a json configuration file
 * that is located in the config directory.
 *
 * @since 2.0.0
 */
export default class JSONRemoteDataProvider
    implements DocDataProviderInterface {
    /**
     * @inheritdoc
     */
    public load(): Promise<DocCollectionInterface> {
        return Axios.get("config/docs.json");
    }
}
