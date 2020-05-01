import CacheManagementFactory from "@/cache/CacheManagementFactory";
import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import IndexedDBCacheManagement from "@/cache/indexeddb/IndexedDBCacheManagement";

describe("CacheManagementFactory", () => {
    describe("create", () => {
        it("should return IndexedDBCacheManagement as default", () => {
            const cacheManagementFactory: CacheManagementFactory = new CacheManagementFactory();

            const result = cacheManagementFactory.create<ConfigDataInterface>(
                "DefinitelyNotAValidType"
            );

            expect(result).toBeInstanceOf(IndexedDBCacheManagement);
        });

        it("should return IndexedDBCacheManagement on type = indexedDB", () => {
            const cacheManagementFactory: CacheManagementFactory = new CacheManagementFactory();

            const result = cacheManagementFactory.create<ConfigDataInterface>(
                "indexedDB"
            );

            expect(result).toBeInstanceOf(IndexedDBCacheManagement);
        });
    });
});
