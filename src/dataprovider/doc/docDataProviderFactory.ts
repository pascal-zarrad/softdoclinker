import DataProviderInterface from "../dataProviderInterface";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";
import DocAjaxDataProvider from "./docAjaxDataProvider";

/**
 * A factory that creates ConfigDataProviders
 * based on the backend passed to it.
 *
 * @since 2.0.0
 */
export default class DocDataProviderFactory {
    constrcutor() {}

    /**
     * Create a new DataProvider for a specific backend.
     * If the specified backend does not exist, a
     * ConfigAjaxDataProvider will be returned.
     *
     * @param backend The backend type of the data provider
     */
    public create(
        backend: string
    ): DataProviderInterface<DocCollectionInterface> {
        switch (backend) {
            case "ajax":
                return new DocAjaxDataProvider();
            default:
                return new DocAjaxDataProvider();
        }
    }
}
