import Axios from "axios";
import ConfigDataInterface from "@/model/config/configDataInterface";
import DataProviderInterface from "../dataProviderInterface";

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
        return Axios.get("config/config.json");
    }
}
