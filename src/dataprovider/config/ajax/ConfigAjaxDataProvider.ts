import ConfigDataProviderBridge from "@/dataprovider/config/ConfigDataProviderBridge";
import ConfigDataProviderInterface from "@/dataprovider/config/ConfigDataProviderInterface";
import AjaxJsonDataSource from "@/datasource/ajax/AjaxJsonDataSource";
import { TYPES } from "@/di/types/inversify.symbols";
import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import { injectable } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";

/**
 * A data provider to load the base configuration of
 * the application.
 *
 * @since 2.0.0
 */
@injectable()
@(fluentProvide(TYPES.ConfigDataProviderInterface)
    .whenInjectedInto(ConfigDataProviderBridge)
    .done())
export default class ConfigAjaxDataProvider
    implements ConfigDataProviderInterface {
    /**
     * The ajax data source used to get the data
     */
    protected _ajaxJsonDataSource: AjaxJsonDataSource;

    /**
     * Constructor
     */
    public constructor(ajaxJsonDataSource: AjaxJsonDataSource) {
        this._ajaxJsonDataSource = ajaxJsonDataSource;
    }

    /**
     * @inheritdoc
     */
    public async load(): Promise<ConfigDataInterface> {
        return await this._ajaxJsonDataSource.simpleLoadAsync(
            "config/config.json"
        );
    }
}
