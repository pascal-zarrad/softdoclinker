/* istanbul ignore file */

/**
 * Constant that contains all Symbols used for dependency injection
 * as identifiers.
 *
 * If you are about to customize SoftDOcLinker use { @link extend/inversify.symbolsExtend }
 * to add new Symbols instead to keep core and extended types separated.
 */
export const TYPES = {
    ContainerManagementInterface: Symbol.for("ContainerManagementInterface")
};
