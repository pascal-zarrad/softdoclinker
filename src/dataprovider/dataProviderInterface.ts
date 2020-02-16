/**
 * A generic data provider interface to loa data asynchronously
 * using ajax.
 *
 * @since 2.0.0
 */
export default interface DataProviderInterface<T> {
    /**
     * Load new data from data source.
     *
     * @returns Promise<T>
     */
    load(): Promise<T>;
}
