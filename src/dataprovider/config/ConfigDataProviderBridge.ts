import ConfigDataProviderInterface from "@/dataprovider/config/ConfigDataProviderInterface";
import BridgeInterface from "@/di/pattern/BridgeInterface";
import ConfigDataInterface from "@/model/config/ConfigDataInterface";

/**
 * Bridge to allow dynamic exchange of the implementation that is used to get
 * the base configuration of SOftDocLinker.
 *
 * The default implementation that is used is the ajax data provider
 * for configurations.
 *
 * @since 2.0.0
 */
export default class ConfigDataProviderBridge
    implements
        ConfigDataProviderInterface,
        BridgeInterface<ConfigDataProviderInterface> {
    /**
     * The config data provider implementation currently in use
     */
    private _implementation: ConfigDataProviderInterface;

    /**
     * Constructor
     */
    public constructor(implementation: ConfigDataProviderInterface) {
        this._implementation = implementation;
    }

    /**
     * @inheritdoc
     */
    public load(): Promise<ConfigDataInterface> {
        return this._implementation.load();
    }

    /**
     * @inheritdoc
     */
    public exchangeImplementation(
        newImplementation: ConfigDataProviderInterface
    ): ConfigDataProviderInterface {
        const currentImplementation = this._implementation;
        this._implementation = newImplementation;

        return currentImplementation;
    }

    /**
     * Getter: _implementation
     */
    public get implementation(): ConfigDataProviderInterface {
        return this._implementation;
    }
}
