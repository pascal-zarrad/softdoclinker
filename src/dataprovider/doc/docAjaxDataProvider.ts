import Axios from "axios";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";
import DataProviderInterface from "../dataProviderInterface";

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
        return Axios.get("config/docs.json");
    }
}
