import Axios from "axios";
import ConfigInterface from "@/model/config/configInterface";
import DataProviderInterface from './dataProviderInterface';

/**
 * A data provider to load the base configuration of
 * the application.
 *
 * @since 2.0.0
 */
export default class ConfigDataProvider implements DataProviderInterface<ConfigInterface> {
    /**
     * @inheritdoc
     */
    public async load(): Promise<ConfigInterface> {
        return Axios.get("config/config.json");
    }
}
