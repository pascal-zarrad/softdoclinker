/**
 * Defines the base structure of a interim bridge that enables
 * dynamic exchange of the underlying implementation of a feature.
 */
export default interface BridgeInterface<T> {
    /**
     * Current implementation used by the bridge
     */
    readonly implementation: T;

    /**
     * Exchange the underlying implementation with a new one.
     *
     * @returns The instance of the implementation that has been used before the exchange
     */
    exchangeImplementation(newImplementation: T): T;
}
