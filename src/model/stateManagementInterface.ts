import SharedStateInterface from "@/model/sharedStateInterface";

/**
 * Interface that handles the state of SoftDocLinker.
 *
 * The state management handles the update of the data used by
 * the VueJS rendering.
 *
 * @since 2.0.0
 */
export default interface StateManagementInterface {
    /**
     * Update the local state.
     *
     * If forceRefresh is set to true, the data will be pulled from the server,
     * as long as the server is reachable. If the server is not reachable, the cached
     * data will still being used.
     *
     * When the cache is invalid, the update will always act like a forceRefresh.
     *
     * @param forceRefresh Whether to force pull data from the server or not
     */
    update(forceRefresh: boolean): Promise<SharedStateInterface>;

    /**
     * Getter: Get the current state of the application
     */
    getState(): SharedStateInterface;

    /**
     * Setter: Set the current state of the application
     */
    setState(sharedState: SharedStateInterface): void;
}
