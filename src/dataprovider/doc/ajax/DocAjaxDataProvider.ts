import AjaxJsonDataSource from "@/datasource/ajax/AjaxJsonDataSource";
import { TYPES } from "@/di/types/inversify.symbols";
import DocCollectionInterface from "@/model/doc/DocCollectionInterface";
import DocDataInterface from "@/model/doc/DocDataInterface";
import Axios from "axios";
import { fluentProvide } from "inversify-binding-decorators";
import DocDataProviderBridge from "../DocDataProviderBridge";
import DocDataProviderInterface from "../DocDataProviderInterface";

/**
 * A data provider that gains its data from a json configuration file
 * that is located in the config directory.
 *
 * @since 2.0.0
 */
@(fluentProvide(TYPES.DocDataProviderInterface)
    .whenInjectedInto(DocDataProviderBridge)
    .done())
export default class DocAjaxDataProvider implements DocDataProviderInterface {
    /**
     * The data source used to execute the ajax calls
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
    public load(): Promise<DocDataInterface> {
        return this._ajaxJsonDataSource.simpleLoadAsync("config/docs.json");
    }
}
