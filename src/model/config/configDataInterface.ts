/**
 * An interface that defines the base configuration of SoftDocLinker
 *
 * @since 2.0.0
 */
export default interface ConfigDataInterface {
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
}
