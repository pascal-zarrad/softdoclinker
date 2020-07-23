import { interfaces } from "inversify";

/**
 * Interface to access the container management that can be used to
 * get instances of specific types.
 * Can be injected into types likes factories to create new instances
 * of specific types.
 *
 * @since 2.0.0
 */
export default interface ContainerManagementInterface {
    /**
     * Initializes the IoC container in a two step process:
     *  - First Step: Initialize all decorator auto-bound types
     *  - Second Step: Load manual type overrides
     *
     * Can and should be only called once on application startup.
     *
     * @throws ContainerAlreadyInitializedError
     */
    init(): void;

    /**
     * Get an the instance of a specific type.
     *
     * @param type The type the instance you want to get
     *
     * @return an instance of the specified type.
     */
    get<T>(type: interfaces.ServiceIdentifier<T>): T;

    /**
     * Check if there is a binding available for a specific type.
     *
     * @param type The type for which the availability of a binding should be checked
     *
     * @return True when there is a binding available.
     */
    isBound<T>(type: interfaces.ServiceIdentifier<T>): boolean;
}
