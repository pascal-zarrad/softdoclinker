import ContainerManagementInterface from "@/di/ContainerManagementInterface";
import applyExtendedTypeOverrides from "@/di/types/extend/inversify.typesExtend";
import applyTypeOverrides from "@/di/types/inversify.types";
import ContainerAlreadyInitialized from "@/error/di/ContainerAlreadyInitializedError";
import { Container, injectable, interfaces } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";

/**
 * Manages the Inversify IoC container and provides possibilities.
 * The container management should never being called directly.
 * Instead constructor or property injection should be used.
 *
 * An exception where direct container management invocation
 * is allowed are for example factories.
 *
 * This is a singleton and does not allow multiple instantiation
 * by design.
 *
 * @since 2.0.0
 */
@injectable()
export default class ContainerManagement
    implements ContainerManagementInterface {
    /**
     * The single ContainerManagement instance that
     */
    private static containerManagementInstance: ContainerManagement;

    /**
     *The Inversify container that manages dependencies
     */
    private _container: Container;

    /**
     * Specifies if the container management has been initialized
     */
    private _initialized: boolean = false;

    /**
     * Constructor
     *
     * Call init and initializes the IoC container.
     */
    private constructor() {
        this._container = new Container({ autoBindInjectable: true });
    }

    /**
     * @inheritdoc
     */
    public init(): void {
        if (!this._initialized) {
            this.container.load(buildProviderModule());
            applyTypeOverrides(this);
            applyExtendedTypeOverrides(this);
            this._initialized = true;
            return;
        }

        throw new ContainerAlreadyInitialized(
            "ContainerManagement already has been initialized!"
        );
    }

    /**
     * @inheritdoc
     */
    public get<T>(type: interfaces.ServiceIdentifier<T>): T {
        return this.container.get(type);
    }

    /**
     * @inheritdoc
     */
    public isBound<T>(type: interfaces.ServiceIdentifier<T>): boolean {
        return this.container.isBound(type);
    }

    /**
     * Rebind a specific binding to overwrite it.
     *
     * @param bind The binding to override
     * @param to The new type
     * @param isSingleton Use singleton binding
     */
    public rebind<T>(
        bind: interfaces.ServiceIdentifier<T>,
        to: new (...args: any[]) => T,
        isSingleton: boolean
    ): void {
        if (this.isBound(bind)) {
            this._container.unbind(bind);
        }

        const newBinding = this._container.bind(bind).to(to);

        if (isSingleton) {
            newBinding.inSingletonScope();
        }
    }

    /**
     * Getter: _container
     */
    public get container(): Container {
        return this._container;
    }

    /**
     * Getter: _initialized
     */
    public get initialized(): boolean {
        return this._initialized;
    }

    /**
     * Get the ContainerManagement instance
     *
     * @return The the instance of the ContainerManagement
     */
    public static getContainerManagement(): ContainerManagementInterface {
        if (ContainerManagement.containerManagementInstance === undefined) {
            ContainerManagement.containerManagementInstance = new ContainerManagement();
        }

        return ContainerManagement.containerManagementInstance;
    }
}
