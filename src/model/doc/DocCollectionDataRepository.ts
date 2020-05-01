import CacheDataStorage from "@/cache/CacheDataStorage";
import AbstractDataRepository from "@/model/AbstractDataRepository";
import DocCollectionInterface from "@/model/doc/DocCollectionInterface";

/**
 * Data repository that is used to get the data of the available
 * documentations.
 *
 * @since 2.0.0
 */
export default class DocCollectionDataRepository extends AbstractDataRepository<
    DocCollectionInterface
> {
    /**
     * The name of the key that is used by the cache management
     */
    public static readonly DOC_KEY = "softdoclinker-doc";

    /**
     * @inheritdoc
     */
    public async load(
        key: string,
        forceRefresh: boolean
    ): Promise<DocCollectionInterface> {
        if ((await this._cacheManagement.isValid(key)) && !forceRefresh) {
            return (await this._cacheManagement.load(key)).data;
        }

        const docCollection: DocCollectionInterface = await this._dataProvider.load();

        const cacheItem: CacheDataStorage<DocCollectionInterface> = this._cacheDataStorageFactory.create(
            key,
            docCollection
        );

        this._cacheManagement.update(cacheItem);

        return docCollection;
    }
}
