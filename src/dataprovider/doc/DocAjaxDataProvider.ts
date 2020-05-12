import DataProviderInterface from "@/dataprovider/DataProviderInterface";
import DocCollectionInterface from "@/model/doc/DocCollectionInterface";
import Axios from "axios";

/**
 * A data provider that gains its data from a json configuration file
 * that is located in the config directory.
 *
 * @since 2.0.0
 */
export default class DocAjaxDataProvider
    implements DataProviderInterface<DocCollectionInterface> {
    /**
     * @inheritdoc
     */
    public async load(): Promise<DocCollectionInterface> {
        return await (
            await Axios.get("config/docs.json", {
                headers: {
                    "Cache-Control": "no-cache",
                    "Content-type": "application/json"
                }
            })
        ).data;
    }
}
