import CacheDataStorage from "@/cache/cacheDataStorage";
import AbstractDataRepository from "@/model/abstractDataRepository";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";

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
    public async load(key: string): Promise<DocCollectionInterface> {
        if (await this._cacheManagement.isValid(key)) {
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
