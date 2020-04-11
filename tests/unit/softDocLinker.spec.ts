import CacheDataStorageFactory from "@/cache/cacheDataStorageFactory";
import CacheManagementFactory from "@/cache/cacheManagementFactory";
import CacheManagementInterface from "@/cache/cacheManagementInterface";
import IndexedDBCacheManagement from "@/cache/indexeddb/indexedDBCacheManagement";
import ConfigAjaxDataProvider from "@/dataprovider/config/configAjaxDataProvider";
import ConfigDataProviderFactory from "@/dataprovider/config/configDataProviderFactory";
import DataProviderInterface from "@/dataprovider/dataProviderInterface";
import DocCollectionDataProviderFactory from "@/dataprovider/doc/docCollectionDataProviderFactory";
import ConfigDataInterface from "@/model/config/configDataInterface";
import ConfigDataRepository from "@/model/config/configDataRepository";
import DefaultConfigData from "@/model/config/defaultConfigData";
import DataRepositoryInterface from "@/model/dataRepositoryInterface";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";
import { SoftDocLinker } from "@/softDocLinker";
import ConfigDataRepositoryFactory from "@/model/config/configDataRepositoryFactory";
import DocCollectionDataRepositoryFactory from "@/model/doc/docCollectionDataRepositoryFactory";
import StateManagementFactory from "@/model/stateManagementFactory";
import DocCollectionDataRepository from "@/model/doc/docCollectionDataRepository";
import DocAjaxDataProvider from "@/dataprovider/doc/docAjaxDataProvider";

jest.mock("@/dataprovider/config/configDataProviderFactory");
jest.mock("@/cache/cacheDataStorageFactory");
jest.mock("@/cache/cacheManagementFactory");
jest.mock("@/dataprovider/doc/docCollectionDataProviderFactory");
jest.mock("@/model/config/configDataInterface");
jest.mock("@/model/config/configDataRepository");
jest.mock("@/model/config/configDataRepositoryFactory");
jest.mock("@/model/doc/docCollectionDataRepository");
jest.mock("@/model/doc/docCollectionDataRepositoryFactory");
jest.mock("@/model/stateManagementFactory");
jest.mock("@/dataprovider/config/configAjaxDataProvider");
jest.mock("@/dataprovider/doc/docAjaxDataProvider");
jest.mock("@/cache/indexeddb/indexedDBCacheManagement");
jest.mock("@/model/stateManagementFactory");

describe("SoftDocLinker", () => {
    describe("getConfigDataRepository", () => {
        it("should create a new ConfigDataRepository when none is and start to return that", async () => {
            const configAjaxDataProvider: ConfigAjaxDataProvider = new ConfigAjaxDataProvider();
            const configDataProviderFactory: ConfigDataProviderFactory = new ConfigDataProviderFactory();
            configDataProviderFactory.create = jest.fn(() => {
                return configAjaxDataProvider;
            });

            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();

            const indexedDBCacheManagement: IndexedDBCacheManagement<ConfigDataInterface> = new IndexedDBCacheManagement();

            const cacheManagementFactory: CacheManagementFactory = new CacheManagementFactory();
            // Due to the fact that create uses generics, the cast to any is a workaround
            (cacheManagementFactory as any).create = jest.fn(function<T>() {
                return (jest.fn() as unknown) as CacheManagementInterface<T>;
            });

            const docDataProviderFactory: DocCollectionDataProviderFactory = new DocCollectionDataProviderFactory();

            const configDataRepository: ConfigDataRepository = new ConfigDataRepository(
                configAjaxDataProvider,
                indexedDBCacheManagement,
                cacheDataStorageFactory
            );

            const configDataRepositoryFactory: ConfigDataRepositoryFactory = new ConfigDataRepositoryFactory();
            configDataRepositoryFactory.create = jest.fn(() => {
                return configDataRepository;
            });

            const docCollectionDataRepositoryFactory: DocCollectionDataRepositoryFactory = new DocCollectionDataRepositoryFactory();

            const stateManagementFactory: StateManagementFactory = new StateManagementFactory();

            const softDocLinker: SoftDocLinker = new SoftDocLinker(
                configDataProviderFactory,
                cacheDataStorageFactory,
                configDataRepositoryFactory,
                cacheManagementFactory,
                docDataProviderFactory,
                docCollectionDataRepositoryFactory,
                stateManagementFactory
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
            const cacheManagement: IndexedDBCacheManagement<DocCollectionInterface> = new IndexedDBCacheManagement();

            const cacheManagementFactory: CacheManagementFactory = new CacheManagementFactory();
            // Due to the fact that create uses generics, the cast to any is a workaround
            (cacheManagementFactory as any).create = jest.fn(() => {
                return cacheManagement;
            });


            const docCollectionDataProvider: DocAjaxDataProvider = new DocAjaxDataProvider();
            const docDataProviderFactory: DocCollectionDataProviderFactory = new DocCollectionDataProviderFactory();
            docDataProviderFactory.create = jest.fn(() => {
                return docCollectionDataProvider;
            });

            const docCollectionDataRepository = new DocCollectionDataRepository(
                docCollectionDataProvider,
                cacheManagement,
                cacheDataStorageFactory
            );

            const docCollectionDataRepositoryFactory = new DocCollectionDataRepositoryFactory();
            docCollectionDataRepositoryFactory.create = jest.fn(() => {
                return docCollectionDataRepository;
            });

            const configDataInterface: ConfigDataInterface = new DefaultConfigData();

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

            const configDataRepositoryFactory = new ConfigDataRepositoryFactory();
            configDataRepositoryFactory.create = jest.fn(() => {
                return configDataRepository;
            });

            const stateManagementFactory: StateManagementFactory = new StateManagementFactory();

            const softDocLinker: SoftDocLinker = new SoftDocLinker(
                configDataProviderFactory,
                cacheDataStorageFactory,
                configDataRepositoryFactory,
                cacheManagementFactory,
                docDataProviderFactory,
                docCollectionDataRepositoryFactory,
                stateManagementFactory
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
