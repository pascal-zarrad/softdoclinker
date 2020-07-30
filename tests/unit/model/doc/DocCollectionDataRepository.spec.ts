import CacheDataStorage from "@/cache/CacheDataStorage";
import CacheDataStorageFactory from "@/cache/CacheDataStorageFactory";
import CacheManagementInterface from "@/cache/CacheManagementInterface";
import IndexedDBCacheManagement from "@/cache/indexeddb/IndexedDBCacheManagement";
import DataProviderInterface from "@/dataprovider/DataProviderInterface";
import DocAjaxDataProvider from "@/dataprovider/doc/ajax/DocAjaxDataProvider";
import DocCollectionDataRepository from "@/model/doc/DocCollectionDataRepository";
import DocCollectionInterface from "@/model/doc/DocCollectionInterface";

jest.mock("@/cache/CacheDataStorageFactory");
jest.mock("@/dataprovider/doc/DocAjaxDataProvider");
jest.mock("@/dataprovider/doc/DocAjaxDataProvider");
jest.mock("@/cache/indexeddb/IndexedDBCacheManagement");

describe("DocCollectionDataRepository", () => {
    describe("load", () => {
        it("should load a cached value if any is cached", async () => {
            const expectedKey = "myExpectedKey";
            const expectedDocCollectionData: CacheDataStorage<DocCollectionInterface> = new CacheDataStorage<
                DocCollectionInterface
            >("docs", {
                documentations: []
            });

            const docCollectionDataProviderInterface: DataProviderInterface<DocCollectionInterface> = new DocAjaxDataProvider();

            const docCollectionDataCacheManagement: CacheManagementInterface<DocCollectionInterface> = new IndexedDBCacheManagement();
            (docCollectionDataCacheManagement.load as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(expectedDocCollectionData);
                    })
                )
            );
            (docCollectionDataCacheManagement.isValid as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(true);
                    })
                )
            );

            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();

            const docCollectionDataRepository = new DocCollectionDataRepository(
                docCollectionDataProviderInterface,
                docCollectionDataCacheManagement,
                cacheDataStorageFactory
            );

            expect.assertions(6);

            try {
                const result = await docCollectionDataRepository.load(
                    expectedKey,
                    false
                );

                expect(
                    docCollectionDataCacheManagement.isValid
                ).toHaveBeenCalledWith(expectedKey);
                expect(
                    docCollectionDataCacheManagement.load
                ).toHaveBeenCalledWith(expectedKey);
                expect(result).toBe(expectedDocCollectionData.data);

                // When we have data cached, we don't want to waste resources
                expect(
                    docCollectionDataProviderInterface.load
                ).toHaveBeenCalledTimes(0);
                expect(cacheDataStorageFactory.create).toHaveBeenCalledTimes(0);
                expect(
                    docCollectionDataCacheManagement.update
                ).toHaveBeenCalledTimes(0);
            } catch (e) {
                fail(e);
            }
        });

        it("should create a new value if none is cached and cache it", async () => {
            const expectedKey = "myExpectedKey";
            const expectedDocCollectionData: CacheDataStorage<DocCollectionInterface> = new CacheDataStorage<
                DocCollectionInterface
            >("docs", {
                documentations: []
            });

            const docCollectionDataProviderInterface: DataProviderInterface<DocCollectionInterface> = new DocAjaxDataProvider();
            (docCollectionDataProviderInterface.load as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(expectedDocCollectionData);
                    })
                )
            );

            const docCollectionDataCacheManagement: CacheManagementInterface<DocCollectionInterface> = new IndexedDBCacheManagement();
            (docCollectionDataCacheManagement.isValid as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(false);
                    })
                )
            );
            docCollectionDataCacheManagement.update = jest.fn();

            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();
            (cacheDataStorageFactory.create as jest.Mock).mockReturnValue(
                expectedDocCollectionData
            );

            const docCollectionDataRepository = new DocCollectionDataRepository(
                docCollectionDataProviderInterface,
                docCollectionDataCacheManagement,
                cacheDataStorageFactory
            );

            expect.assertions(6);

            try {
                const result = await docCollectionDataRepository.load(
                    expectedKey,
                    false
                );

                expect(
                    docCollectionDataCacheManagement.isValid
                ).toHaveBeenCalledWith(expectedKey);
                expect(
                    docCollectionDataCacheManagement.update
                ).toHaveBeenCalledWith(expectedDocCollectionData);
                expect(cacheDataStorageFactory.create).toHaveBeenCalledWith(
                    expectedKey,
                    expectedDocCollectionData
                );
                expect(
                    docCollectionDataProviderInterface.load
                ).toHaveBeenCalled();
                expect(result).toBe(expectedDocCollectionData);

                // When we have data cached, we don't want to waste resources
                expect(
                    docCollectionDataCacheManagement.load
                ).toHaveBeenCalledTimes(0);
            } catch (e) {
                fail(e);
            }
        });

        it("should create a new value if forceRefresh is true", async () => {
            const expectedKey = "myExpectedKey";
            const expectedDocCollectionData: CacheDataStorage<DocCollectionInterface> = new CacheDataStorage<
                DocCollectionInterface
            >("docs", {
                documentations: []
            });

            const docCollectionDataProviderInterface: DataProviderInterface<DocCollectionInterface> = new DocAjaxDataProvider();
            (docCollectionDataProviderInterface.load as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(expectedDocCollectionData);
                    })
                )
            );

            const docCollectionDataCacheManagement: CacheManagementInterface<DocCollectionInterface> = new IndexedDBCacheManagement();
            (docCollectionDataCacheManagement.isValid as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(true);
                    })
                )
            );
            docCollectionDataCacheManagement.update = jest.fn();

            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();
            (cacheDataStorageFactory.create as jest.Mock).mockReturnValue(
                expectedDocCollectionData
            );

            const docCollectionDataRepository = new DocCollectionDataRepository(
                docCollectionDataProviderInterface,
                docCollectionDataCacheManagement,
                cacheDataStorageFactory
            );

            expect.assertions(6);

            try {
                const result = await docCollectionDataRepository.load(
                    expectedKey,
                    true
                );

                expect(
                    docCollectionDataCacheManagement.isValid
                ).toHaveBeenCalledWith(expectedKey);
                expect(
                    docCollectionDataCacheManagement.update
                ).toHaveBeenCalledWith(expectedDocCollectionData);
                expect(cacheDataStorageFactory.create).toHaveBeenCalledWith(
                    expectedKey,
                    expectedDocCollectionData
                );
                expect(
                    docCollectionDataProviderInterface.load
                ).toHaveBeenCalled();
                expect(result).toBe(expectedDocCollectionData);

                // When we have data cached, we don't want to waste resources
                expect(
                    docCollectionDataCacheManagement.load
                ).toHaveBeenCalledTimes(0);
            } catch (e) {
                fail(e);
            }
        });
    });
});
