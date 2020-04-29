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
import StateManagement from "@/model/stateManagement";

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
        it("should create a new ConfigDataRepository when none is available and start to return that", async () => {
            const configAjaxDataProvider: ConfigAjaxDataProvider = new ConfigAjaxDataProvider();
            const configDataProviderFactory: ConfigDataProviderFactory = new ConfigDataProviderFactory();
            configDataProviderFactory.create = jest.fn(() => {
                return configAjaxDataProvider;
            });

            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();

            const cacheManagement: IndexedDBCacheManagement<ConfigDataInterface> = new IndexedDBCacheManagement();

            const cacheManagementFactory: CacheManagementFactory = new CacheManagementFactory();
            // Due to the fact that create uses generics, the cast to any is a workaround
            (cacheManagementFactory as any).create = jest.fn(() => {
                return cacheManagement;
            });

            const docDataProviderFactory: DocCollectionDataProviderFactory = new DocCollectionDataProviderFactory();

            const configDataRepository: ConfigDataRepository = new ConfigDataRepository(
                configAjaxDataProvider,
                cacheManagement,
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

            expect.assertions(6);
            try {
                const resultAfterFirstCall = await softDocLinker.getConfigDataRepository();

                expect(configDataProviderFactory.create).toHaveBeenCalledWith(
                    "ajax"
                );
                expect(cacheManagementFactory.create).toHaveBeenCalledWith(
                    "indexedDB"
                );
                expect(configDataRepositoryFactory.create).toHaveBeenCalledWith(
                    configAjaxDataProvider,
                    cacheManagement,
                    cacheDataStorageFactory
                );
                expect(resultAfterFirstCall).toBe(configDataRepository);

                const resultAfterSecondCall = await softDocLinker.getConfigDataRepository();

                expect(resultAfterSecondCall).toBe(configDataRepository);
                expect(
                    configDataRepositoryFactory.create
                ).toHaveBeenCalledTimes(1);
            } catch (e) {
                fail(e);
            }
        });
    });

    describe("getDocDataRepository", () => {
        it("should create a new DocDataRepository when none is available and start to return that", async () => {
            const configDataProviderFactory: ConfigDataProviderFactory = new ConfigDataProviderFactory();
            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();
            const docCacheManagement: IndexedDBCacheManagement<DocCollectionInterface> = new IndexedDBCacheManagement();

            const cacheManagementFactory: CacheManagementFactory = new CacheManagementFactory();
            // Due to the fact that create uses generics, the cast to any is a workaround
            (cacheManagementFactory as any).create = jest.fn(() => {
                return docCacheManagement;
            });

            const docCollectionDataProvider: DocAjaxDataProvider = new DocAjaxDataProvider();
            const docDataProviderFactory: DocCollectionDataProviderFactory = new DocCollectionDataProviderFactory();
            docDataProviderFactory.create = jest.fn(() => {
                return docCollectionDataProvider;
            });

            const docCollectionDataRepository = new DocCollectionDataRepository(
                docCollectionDataProvider,
                docCacheManagement,
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

            expect.assertions(6);
            try {
                const resultAfterFirstCall = await softDocLinker.getDocCollectionDataRepository();

                expect(docDataProviderFactory.create).toHaveBeenCalledWith(
                    configDataInterface.backend
                );
                expect(cacheManagementFactory.create).toHaveBeenCalledWith(
                    configDataInterface.cache
                );
                expect(
                    docCollectionDataRepositoryFactory.create
                ).toHaveBeenCalledWith(
                    docCollectionDataProvider,
                    docCacheManagement,
                    cacheDataStorageFactory
                );
                expect(resultAfterFirstCall).toBe(docCollectionDataRepository);

                const resultAfterSecondCall = await softDocLinker.getDocCollectionDataRepository();

                expect(resultAfterSecondCall).toBe(docCollectionDataRepository);
                expect(
                    docCollectionDataRepositoryFactory.create
                ).toHaveBeenCalledTimes(1);
            } catch (e) {
                fail(e);
            }
        });
    });

    describe("getStateManagement", () => {
        it("should create a new StateManagement when none is available and start to return that", async () => {
            const configDataProviderFactory: ConfigDataProviderFactory = new ConfigDataProviderFactory();
            const cacheDataStorageFactory: CacheDataStorageFactory = new CacheDataStorageFactory();

            const cacheManagementFactory: CacheManagementFactory = new CacheManagementFactory();

            const configDataProvider: DataProviderInterface<ConfigDataInterface> = new ConfigAjaxDataProvider();
            const configCacheManagementInterface: CacheManagementInterface<ConfigDataInterface> = new IndexedDBCacheManagement();
            const configDataRepositoryFactory: ConfigDataRepositoryFactory = new ConfigDataRepositoryFactory();
            const configDataRepository: DataRepositoryInterface<ConfigDataInterface> = new ConfigDataRepository(
                configDataProvider,
                configCacheManagementInterface,
                cacheDataStorageFactory
            );

            const docCollectionDataProvider: DocAjaxDataProvider = new DocAjaxDataProvider();
            const docDataProviderFactory: DocCollectionDataProviderFactory = new DocCollectionDataProviderFactory();

            const docCacheManagement: IndexedDBCacheManagement<DocCollectionInterface> = new IndexedDBCacheManagement();

            const docCollectionDataRepositoryFactory: DocCollectionDataRepositoryFactory = new DocCollectionDataRepositoryFactory();
            const docCollectionDataRepository = new DocCollectionDataRepository(
                docCollectionDataProvider,
                docCacheManagement,
                cacheDataStorageFactory
            );

            const stateManagement: StateManagement = new StateManagement(
                configDataRepository,
                docCollectionDataRepository
            );
            const stateManagementFactory: StateManagementFactory = new StateManagementFactory();
            stateManagementFactory.create = jest.fn(() => {
                return stateManagement;
            });

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
            softDocLinker.getDocCollectionDataRepository = jest.fn(() => {
                return new Promise(resolve => {
                    resolve(docCollectionDataRepository);
                });
            });

            expect.assertions(5);

            try {
                const resultAfterFirstCall = await softDocLinker.getStateManagement();
                expect(resultAfterFirstCall).toBe(stateManagement);

                const resultAfterSecondCall = await softDocLinker.getStateManagement();
                expect(resultAfterSecondCall).toBe(stateManagement);

                expect(
                    softDocLinker.getConfigDataRepository
                ).toHaveBeenCalledTimes(1);
                expect(
                    softDocLinker.getDocCollectionDataRepository
                ).toHaveBeenCalledTimes(1);
                expect(stateManagementFactory.create).toHaveBeenCalledTimes(1);
            } catch (e) {
                fail(e);
            }
        });
    });
});
