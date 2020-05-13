import DataProviderInterface from "@/dataprovider/DataProviderInterface";
import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import Axios from "axios";

/**
 * A data provider to load the base configuration of
 * the application.
 *
 * @since 2.0.0
 */
export default class ConfigAjaxDataProvider
    implements DataProviderInterface<ConfigDataInterface> {
    /**
     * @inheritdoc
     */
    public async load(): Promise<ConfigDataInterface> {
        return (
            await Axios.get("config/config.json", {
                headers: {
                    "Cache-Control": "no-cache",
                    "Content-type": "application/json"
                }
            })
        ).data;
    }
}
