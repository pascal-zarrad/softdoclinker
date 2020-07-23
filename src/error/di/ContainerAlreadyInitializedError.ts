import SoftDocLinkerError from "../SoftDocLinkerError";

/**
 * An error thrown when the container management would be initialized
 * multiple times.
 *
 * @since 2.0.0
 */
export default class ContainerAlreadyInitializedError extends SoftDocLinkerError {}
