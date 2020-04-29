/* istanbul ignore file */
import ConfigAjaxDataProvider from "@/dataprovider/config/configAjaxDataProvider";
import DataProviderInterface from "@/dataprovider/dataProviderInterface";
import ConfigDataInterface from "@/model/config/configDataInterface";

/**
 * A factory that creates ConfigDataProviders
 * based on the backend passed to it.
 *
 * @since 2.0.0
 */
export default class ConfigDataProviderFactory {
    /**
     * Create a new DataProvider for a specific backend.
     * If the specified backend does not exist, a
     * ConfigAjaxDataProvider will be returned.
     *
     * @param backend The backend type of the data provider
     */
    public create(backend: string): DataProviderInterface<ConfigDataInterface> {
        switch (backend) {
            case "ajax":
                return new ConfigAjaxDataProvider();
            default:
                return new ConfigAjaxDataProvider();
        }
    }
}
