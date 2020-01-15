import DataProviderInterface from "../dataProviderInterface";
import ConfigInterface from "@/model/config/configInterface";
import ConfigAjaxDataProvider from "./configAjaxDataProvider";

/**
 * A factory that creates ConfigDataProviders
 * based on the backend passed to it.
 *
 * @since 2.0.0
 */
export default class ConfigDataProviderFactory {
    constrcutor() {}

    /**
     * Create a new DataProvider for a specific backend.
     * If the specified backend does not exist, a
     * ConfigAjaxDataProvider will be returned.
     *
     * @param backend The backend type of the data provider
     */
    public create(backend: string): DataProviderInterface<ConfigInterface> {
        switch (backend) {
            case "ajax":
                return new ConfigAjaxDataProvider();
            default:
                return new ConfigAjaxDataProvider();
        }
    }
}
