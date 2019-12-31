import Axios from "axios";
import ConfigDataProviderInterface from "./configDataProviderInterface";
import ConfigInterface from "@/model/config/configInterface";

/**
 * A data provider to load the base configuration of
 * the application.
 *
 * @since 2.0.0
 */
export default class ConfigDataProvider implements ConfigDataProviderInterface {
    /**
     * @inheritdoc
     */
    public load(): Promise<ConfigInterface> {
        return Axios.get("config/config.json");
    }
}
