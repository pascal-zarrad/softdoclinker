import DocDataProviderInterface from "@/dataprovider/doc/DocDataProviderInterface";
import BridgeInterface from "@/di/pattern/BridgeInterface";
import { TYPES } from "@/di/types/inversify.symbols";
import DocDataInterface from "@/model/doc/DocDataInterface";
import { inject } from "inversify";

/**
 *
 * @since 2.0.0
 */
export default class DocDataProviderBridge
    implements
        DocDataProviderInterface,
        BridgeInterface<DocDataProviderInterface> {
    /**
     * The currently used implementation
     */
    private _implementation: DocDataProviderInterface;

    /**
     * Constructor
     */
    public constructor(
        @inject(TYPES.DocDataProviderInterface)
        implementation: DocDataProviderInterface
    ) {
        this._implementation = implementation;
    }

    /**
     * @inheritdoc
     */
    public exchangeImplementation(
        newImplementation: DocDataProviderInterface
    ): DocDataProviderInterface {
        const oldImplementation = this._implementation;
        this._implementation = newImplementation;

        return oldImplementation;
    }

    /**
     * @inheritdoc
     */
    public load(): Promise<DocDataInterface> {
        return this._implementation.load();
    }

    /**
     * Getter: _implementation
     */
    public get implementation(): DocDataProviderInterface {
        return this._implementation;
    }
}
