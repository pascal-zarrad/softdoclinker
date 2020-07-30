/* istanbul ignore file */

/**
 * Constant that contains all Symbols used for dependency injection
 * as identifiers.
 *
 * If you are about to customize SoftDocLinker use { @link extend/inversify.symbolsExtend }
 * to add new Symbols instead to keep core and extended types separated.
 *
 * Symbols should be sorted by paths
 */
export const TYPES = {
    // @/di
    ContainerManagementInterface: Symbol.for("ContainerManagementInterface"),

    // @/cache
    CacheManagementInterface: Symbol.for("CacheManagementInterface"),
    CacheDataStorageInterface: Symbol.for("CacheDataStorageInterface"),

    // @/dataprovider/config
    ConfigDataProviderInterface: Symbol.for("ConfigDataProviderInterface"),
    // @/dataprovider/doc
    DocDataProviderInterface: Symbol.for("DocDataProviderInterface"),

    // @/model
    SharedStateInterface: Symbol.for("SharedStateInterface"),

    // @/service/notification
    NotificationManagementInterface: Symbol.for(
        "NotificationManagementInterface"
    )
};
