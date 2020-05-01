import CacheDataStorage from "@/cache/CacheDataStorage";
import CacheDataStorageFactory from "@/cache/CacheDataStorageFactory";
import CacheManagementInterface from "@/cache/CacheManagementInterface";
import IndexedDBCacheManagement from "@/cache/indexeddb/IndexedDBCacheManagement";
import ConfigAjaxDataProvider from "@/dataprovider/config/ConfigAjaxDataProvider";
import DataProviderInterface from "@/dataprovider/DataProviderInterface";
import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import ConfigDataRepository from "@/model/config/ConfigDataRepository";
import DefaultConfigData from "@/model/config/DefaultConfigData";

jest.mock("@/cache/CacheDataStorageFactory");
jest.mock("@/dataprovider/config/ConfigAjaxDataProvider");
jest.mock("@/cache/indexeddb/IndexedDBCacheManagement");

describe("ConfigDataRepository", () => {
    describe("load", () => {
        it("should load a cached value if any is cached", async () => {
            const expectedKey = "myExpectedKey";
            const expectedConfigData: CacheDataStorage<ConfigDataInterface> = new CacheDataStorage(
                "config",
                new DefaultConfigData()
            );

            const configDataProviderInterface: DataProviderInterface<ConfigDataInterface> = new ConfigAjaxDataProvider();

            const configDataCacheManagement: CacheManagementInterface<ConfigDataInterface> = new IndexedDBCacheManagement();
            (configDataCacheManagement.load as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(expectedConfigData);
                    })
                )
            );
            (configDataCacheManagement.isValid as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(true);
                    })
                )
            );

            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();

            const configDataRepository = new ConfigDataRepository(
                configDataProviderInterface,
                configDataCacheManagement,
                cacheDataStorageFactory
            );

            expect.assertions(6);

            try {
                const result = await configDataRepository.load(
                    expectedKey,
                    false
                );

                expect(configDataCacheManagement.isValid).toHaveBeenCalledWith(
                    expectedKey
                );
                expect(configDataCacheManagement.load).toHaveBeenCalledWith(
                    expectedKey
                );
                expect(result).toBe(expectedConfigData.data);

                // When we have data cached, we don't want to waste resources
                expect(configDataProviderInterface.load).toHaveBeenCalledTimes(
                    0
                );
                expect(cacheDataStorageFactory.create).toHaveBeenCalledTimes(0);
                expect(configDataCacheManagement.update).toHaveBeenCalledTimes(
                    0
                );
            } catch (e) {
                fail(e);
            }
        });

        it("should create a new value if none is cached and cache it", async () => {
            const expectedKey = "myExpectedKey";
            const expectedConfigData: CacheDataStorage<ConfigDataInterface> = new CacheDataStorage(
                "config",
                new DefaultConfigData()
            );

            const configDataProviderInterface: DataProviderInterface<ConfigDataInterface> = new ConfigAjaxDataProvider();
            (configDataProviderInterface.load as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(expectedConfigData);
                    })
                )
            );

            const configDataCacheManagement: CacheManagementInterface<ConfigDataInterface> = new IndexedDBCacheManagement();
            (configDataCacheManagement.isValid as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(false);
                    })
                )
            );

            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();
            (cacheDataStorageFactory.create as jest.Mock).mockReturnValue(
                expectedConfigData
            );

            const configDataRepository = new ConfigDataRepository(
                configDataProviderInterface,
                configDataCacheManagement,
                cacheDataStorageFactory
            );

            expect.assertions(6);

            try {
                const result = await configDataRepository.load(
                    expectedKey,
                    false
                );

                expect(configDataCacheManagement.isValid).toHaveBeenCalledWith(
                    expectedKey
                );
                expect(configDataCacheManagement.update).toHaveBeenCalledWith(
                    expectedConfigData
                );
                expect(cacheDataStorageFactory.create).toHaveBeenCalledWith(
                    expectedKey,
                    expectedConfigData
                );
                expect(configDataProviderInterface.load).toHaveBeenCalled();
                expect(result).toBe(expectedConfigData);

                // When we have data cached, we don't want to waste resources
                expect(configDataCacheManagement.load).toHaveBeenCalledTimes(0);
            } catch (e) {
                fail(e);
            }
        });

        it("should create a new value if forceRefresh is true", async () => {
            const expectedKey = "myExpectedKey";
            const expectedConfigData: CacheDataStorage<ConfigDataInterface> = new CacheDataStorage(
                "config",
                new DefaultConfigData()
            );

            const configDataProviderInterface: DataProviderInterface<ConfigDataInterface> = new ConfigAjaxDataProvider();
            (configDataProviderInterface.load as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(expectedConfigData);
                    })
                )
            );

            const configDataCacheManagement: CacheManagementInterface<ConfigDataInterface> = new IndexedDBCacheManagement();
            (configDataCacheManagement.isValid as jest.Mock).mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(true);
                    })
                )
            );

            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();
            (cacheDataStorageFactory.create as jest.Mock).mockReturnValue(
                expectedConfigData
            );

            const configDataRepository = new ConfigDataRepository(
                configDataProviderInterface,
                configDataCacheManagement,
                cacheDataStorageFactory
            );

            expect.assertions(6);

            try {
                const result = await configDataRepository.load(
                    expectedKey,
                    true
                );

                expect(configDataCacheManagement.isValid).toHaveBeenCalledWith(
                    expectedKey
                );
                expect(configDataCacheManagement.update).toHaveBeenCalledWith(
                    expectedConfigData
                );
                expect(cacheDataStorageFactory.create).toHaveBeenCalledWith(
                    expectedKey,
                    expectedConfigData
                );
                expect(configDataProviderInterface.load).toHaveBeenCalled();
                expect(result).toBe(expectedConfigData);

                // When we have data cached, we don't want to waste resources
                expect(configDataCacheManagement.load).toHaveBeenCalledTimes(0);
            } catch (e) {
                fail(e);
            }
        });
    });
});
