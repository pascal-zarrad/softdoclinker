import NavigationInterface from "@/model/config/navigation/NavigationInterface";
import NotificationConfigInterface from "@/model/config/notification/NotificationConfigInterface";

/**
 * An interface that defines the base configuration of SoftDocLinker
 *
 * @since 2.0.0
 */
export default interface ConfigDataInterface {
    /**
     * The name of the current SoftDocLinker instance
     */
    instanceName: string;

    /**
     * The backend that should be used
     * Currently available options: JSON
     */
    backend: string;

    /**
     * The backend to use for caching.
     * Currently available options: indexedDB
     */
    cache: string;

    /**
     * The time until SoftDocLinker considers cached data as invalid.
     * Default: 86400
     */
    cacheLifetime: number;

    /**
     * The configurable navigation of SoftDocLinker.
     */
    navigation: NavigationInterface;

    /**
     * The configuration of the frontend notification system
     */
    notifications: NotificationConfigInterface;
}
