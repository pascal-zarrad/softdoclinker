import CacheDataStorageFactory from "@/cache/cacheDataStorageFactory";
import CacheDataStorage from "@/cache/cacheDataStorage";

describe("CacheDataStorageFactory", () => {
    describe("create", () => {
        it("should return a CacheDataStorage with the provided data", () => {
            const expectedKey = "myExpectedKey";
            const expectedData = 42;

            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();

            const result: CacheDataStorage<number> = cacheDataStorageFactory.create(
                expectedKey,
                expectedData
            );

            expect(result.key).toBe(expectedKey);
            expect(result.data).toBe(expectedData);
        });
    });
});
