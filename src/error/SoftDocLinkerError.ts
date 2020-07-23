/**
 * General purpose error that all errors thrown by SoftDocLinker itself
 * are inheriting from. This type has the target to allow
 * definitely differ all thrown errors between ones thrown by the application
 * itself and the ones thrown by third-party libraries.
 *
 * @since 2.0.0
 */
export default class SoftDocLinkerError extends Error {}
