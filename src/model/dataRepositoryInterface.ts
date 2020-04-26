/**
 * An interface that represents a data repository that is used to
 * get data.
 * This interface utilizes the caching mechanism of the application.
 *
 * @since 2.0.0
 */
export default interface DataRepositoryInterface<T> {
    /**
     * Load a specific model filled with data.
     *
     * The supplied key allows multiple data to be saved
     * in the repository.
     *
     * This function uses the caching functionalities
     * of the cache package to speed up loading time.
     *
     * @param key They key of the data to get
     * @param forceRefresh Force a refresh of the data loaded by this repository
     */
    load(key: string, forceRefresh: boolean): Promise<T>;
}
