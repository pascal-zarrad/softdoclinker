import ConfigDataRepository from "@/model/config/configDataRepository";
import DataProviderInterface from "@/dataprovider/dataProviderInterface";
import ConfigDataInterface from "@/model/config/configDataInterface";
import CacheManagementInterface from "@/cache/cacheManagementInterface";
import CacheDataStorageFactory from "@/cache/cacheDataStorageFactory";
import CacheDataStorage from "@/cache/cacheDataStorage";

describe("ConfigDataRepository", () => {
    describe("load", () => {
        it("should load a cached value if any is cached", async () => {
            const expectedKey = "myExpectedKey";
            const expectedConfigData: CacheDataStorage<ConfigDataInterface> = {
                data: {
                    backend: "Test"
                } as ConfigDataInterface
            } as CacheDataStorage<ConfigDataInterface>;

            const configDataProviderInterface: DataProviderInterface<ConfigDataInterface> = {} as DataProviderInterface<
                ConfigDataInterface
            >;
            configDataProviderInterface.load = jest.fn();

            const configDataCacheManagement: CacheManagementInterface<ConfigDataInterface> = {} as CacheManagementInterface<
                ConfigDataInterface
            >;
            configDataCacheManagement.load = jest.fn().mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(expectedConfigData);
                    })
                )
            );
            configDataCacheManagement.isValid = jest.fn().mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(true);
                    })
                )
            );
            configDataCacheManagement.update = jest.fn();

            const cacheDataStorageFactory: CacheDataStorageFactory = {} as CacheDataStorageFactory;
            cacheDataStorageFactory.create = jest.fn();

            const configDataRepository = new ConfigDataRepository(
                configDataProviderInterface,
                configDataCacheManagement,
                cacheDataStorageFactory
            );

            expect.assertions(6);

            const result = await configDataRepository.load(expectedKey);

            expect(configDataCacheManagement.isValid).toHaveBeenCalledWith(
                expectedKey
            );
            expect(configDataCacheManagement.load).toHaveBeenCalledWith(
                expectedKey
            );
            expect(result).toBe(expectedConfigData.data);

            // When we have data cached, we don't want to waste resources
            expect(configDataProviderInterface.load).toHaveBeenCalledTimes(0);
            expect(cacheDataStorageFactory.create).toHaveBeenCalledTimes(0);
            expect(configDataCacheManagement.update).toHaveBeenCalledTimes(0);
        });

        it("should create a new value if none is cached and cache it", async () => {
            const expectedKey = "myExpectedKey";
            const expectedConfigData: CacheDataStorage<ConfigDataInterface> = {
                data: {
                    backend: "Test"
                } as ConfigDataInterface
            } as CacheDataStorage<ConfigDataInterface>;

            const configDataProviderInterface: DataProviderInterface<ConfigDataInterface> = {} as DataProviderInterface<
                ConfigDataInterface
            >;
            configDataProviderInterface.load = jest.fn().mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(expectedConfigData);
                    })
                )
            );

            const configDataCacheManagement: CacheManagementInterface<ConfigDataInterface> = {} as CacheManagementInterface<
                ConfigDataInterface
            >;
            configDataCacheManagement.load = jest.fn();
            configDataCacheManagement.isValid = jest.fn().mockReturnValue(
                Promise.resolve(
                    new Promise(resolve => {
                        resolve(false);
                    })
                )
            );
            configDataCacheManagement.update = jest.fn();

            const cacheDataStorageFactory: CacheDataStorageFactory = {} as CacheDataStorageFactory;
            cacheDataStorageFactory.create = jest
                .fn()
                .mockReturnValue(expectedConfigData);

            const configDataRepository = new ConfigDataRepository(
                configDataProviderInterface,
                configDataCacheManagement,
                cacheDataStorageFactory
            );

            expect.assertions(6);

            const result = await configDataRepository.load(expectedKey);

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
        });
    });
});
