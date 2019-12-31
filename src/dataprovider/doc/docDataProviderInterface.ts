import DocCollectionInterface from "@/model/doc/docCollectionInterface";

/**
 * A interface to provide data providers to gain data
 * from different sources.
 *
 * @since 2.0.0
 */
export default interface DocDataProviderInterface {
    /**
     * Load a new DocDataCollection.
     *
     * @returns DocCollectionInterface
     */
    load(): Promise<DocCollectionInterface>;
}
