import SoftDocLinker from "@/softDocLinker";
import ConfigDataProviderFactory from "@/dataprovider/config/configDataProviderFactory";
import CacheManagementFactory from "@/cache/cacheManagementFactory";
import CacheDataStorageFactory from "@/cache/cacheDataStorageFactory";
import DocDataProviderFactory from "@/dataprovider/doc/docDataProviderFactory";
import ConfigDataInterface from "@/model/config/configDataInterface";
import DataProviderInterface from "@/dataprovider/dataProviderInterface";
import CacheManagementInterface from "@/cache/cacheManagementInterface";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";
import ConfigDataRepository from "@/model/config/configDataRepository";
import DataRepositoryInterface from "@/model/dataRepositoryInterface";
import ConfigAjaxDataProvider from "@/dataprovider/config/configAjaxDataProvider";
import IndexedDBCacheManagement from "@/cache/indexeddb/indexedDBCacheManagement";

jest.mock("@/dataprovider/config/configDataProviderFactory");
jest.mock("@/cache/cacheDataStorageFactory");
jest.mock("@/cache/cacheManagementFactory");
jest.mock("@/dataprovider/doc/docDataProviderFactory");
jest.mock("@/model/config/configDataInterface");
jest.mock("@/model/config/configDataRepository");
jest.mock("@/model/doc/docCollectionDataRepository");

describe("SoftDocLinker", () => {
    describe("getConfigDataRepository", () => {
        it("should create a new ConfigDataRepository when none is and start to return that", async () => {
            const configDataProviderFactory: ConfigDataProviderFactory = new ConfigDataProviderFactory();
            configDataProviderFactory.create = jest.fn(function() {
                return (jest.fn() as unknown) as DataProviderInterface<ConfigDataInterface>;
            });

            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();

            const cacheManagementFactory: CacheManagementFactory = new CacheManagementFactory();
            // Due to the fact that create uses generics, the cast to any is a workaround
            (cacheManagementFactory as any).create = jest.fn(function<T>() {
                return (jest.fn() as unknown) as CacheManagementInterface<T>;
            });

            const docDataProviderFactory: DocDataProviderFactory = new DocDataProviderFactory();

            const softDocLinker: SoftDocLinker = new SoftDocLinker(
                configDataProviderFactory,
                cacheDataStorageFactory,
                cacheManagementFactory,
                docDataProviderFactory
            );

            expect.assertions(4);
            try {
                const resultAfterFirstCall = await softDocLinker.getConfigDataRepository();

                expect(configDataProviderFactory.create).toHaveBeenCalledWith(
                    "ajax"
                );
                expect(cacheManagementFactory.create).toHaveBeenCalledWith(
                    "indexedDB"
                );
                expect(resultAfterFirstCall).toBeDefined();

                const resultAfterSecondCall = await softDocLinker.getConfigDataRepository();

                expect(resultAfterSecondCall).toBe(resultAfterFirstCall);
            } catch (e) {
                fail(e);
            }
        });
    });

    describe("getDocDataRepository", () => {
        it("should create a new DocDataRepository when none is and start to return that", async () => {
            const configDataProviderFactory: ConfigDataProviderFactory = new ConfigDataProviderFactory();
            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();

            const cacheManagementFactory: CacheManagementFactory = new CacheManagementFactory();
            // Due to the fact that create uses generics, the cast to any is a workaround
            (cacheManagementFactory as any).create = jest.fn(function<T>() {
                return (jest.fn() as unknown) as CacheManagementInterface<T>;
            });

            const docDataProviderFactory: DocDataProviderFactory = new DocDataProviderFactory();
            docDataProviderFactory.create = jest.fn(function() {
                return (jest.fn() as unknown) as DataProviderInterface<DocCollectionInterface>;
            });

            const configDataInterface: ConfigDataInterface = {
                backend: "ajax",
                cache: "indexedDB"
            };

            const configDataProvider: DataProviderInterface<ConfigDataInterface> = new ConfigAjaxDataProvider();
            const configCacheManagementInterface: CacheManagementInterface<ConfigDataInterface> = new IndexedDBCacheManagement();
            const configDataRepository: DataRepositoryInterface<ConfigDataInterface> = new ConfigDataRepository(
                configDataProvider,
                configCacheManagementInterface,
                cacheDataStorageFactory
            );
            configDataRepository.load = jest.fn((key: string) => {
                return new Promise(resolve => {
                    resolve(configDataInterface);
                });
            });

            const softDocLinker: SoftDocLinker = new SoftDocLinker(
                configDataProviderFactory,
                cacheDataStorageFactory,
                cacheManagementFactory,
                docDataProviderFactory
            );
            softDocLinker.getConfigDataRepository = jest.fn(() => {
                return new Promise(resolve => {
                    resolve(configDataRepository);
                });
            });

            expect.assertions(4);
            try {
                const resultAfterFirstCall = await softDocLinker.getDocDataRepository();

                expect(docDataProviderFactory.create).toHaveBeenCalledWith(
                    configDataInterface.backend
                );
                expect(cacheManagementFactory.create).toHaveBeenCalledWith(
                    configDataInterface.cache
                );
                expect(resultAfterFirstCall).toBeDefined();

                const resultAfterSecondCall = await softDocLinker.getDocDataRepository();

                expect(resultAfterSecondCall).toBe(resultAfterFirstCall);
            } catch (e) {
                fail(e);
            }
        });
    });
});
