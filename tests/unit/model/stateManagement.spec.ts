import StateManagement from "@/model/stateManagement";
import SharedStateInterface from "@/model/sharedStateInterface";
import ConfigDataRepository from "@/model/config/configDataRepository";
import ConfigAjaxDataProvider from "@/dataprovider/config/configAjaxDataProvider";
import IndexedDBCacheManagement from "@/cache/indexeddb/indexedDBCacheManagement";
import ConfigDataInterface from "@/model/config/configDataInterface";
import CacheDataStorageFactory from "@/cache/cacheDataStorageFactory";
import DocCollectionDataRepository from "@/model/doc/docCollectionDataRepository";
import DocAjaxDataProvider from "@/dataprovider/doc/docAjaxDataProvider";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";
import DefaultSharedState from "@/model/defaultSharedState";

jest.mock("@/model/config/configDataRepository");
jest.mock("@/dataprovider/config/configAjaxDataProvider");
jest.mock("@/cache/cacheDataStorageFactory");
jest.mock("@/model/doc/docCollectionDataRepository");

describe("StateManagement", () => {
    describe("update", () => {
        it("should update the state and return the updated state without forceRefresh", async () => {
            const forceRefresh: boolean = false;

            const dummyConfigDataInterface: ConfigDataInterface = {
                instanceName: "Test",
                backend: "ajax",
                cache: "json",
                cacheLifetime: 84000
            };

            const dummyDocCollectionDataInterface: DocCollectionInterface = {
                documentations: [
                    {
                        doc: [
                            {
                                documentationUrl: "https://any.url/",
                                documentationVersion: "1.0.0"
                            }
                        ]
                    }
                ]
            };
            const cacheDataStorageFactoryMock: CacheDataStorageFactory = new CacheDataStorageFactory();

            const configDataProviderMock: ConfigAjaxDataProvider = new ConfigAjaxDataProvider();
            const configCacheManagementMock: IndexedDBCacheManagement<ConfigDataInterface> = new IndexedDBCacheManagement();

            const configDataRepositoryMock: ConfigDataRepository = new ConfigDataRepository(
                configDataProviderMock,
                configCacheManagementMock,
                cacheDataStorageFactoryMock
            );
            configDataRepositoryMock.load = jest.fn().mockImplementation(() => {
                return Promise.resolve(
                    new Promise(resolve => resolve(dummyConfigDataInterface))
                );
            });

            const docCollectionDataProviderMock: DocAjaxDataProvider = new DocAjaxDataProvider();
            const docCollectionCacheManagementMock: IndexedDBCacheManagement<DocCollectionInterface> = new IndexedDBCacheManagement();
            const docCollectionDataRepositoryMock: DocCollectionDataRepository = new DocCollectionDataRepository(
                docCollectionDataProviderMock,
                docCollectionCacheManagementMock,
                cacheDataStorageFactoryMock
            );
            docCollectionDataRepositoryMock.load = jest
                .fn()
                .mockImplementation(() => {
                    return Promise.resolve(
                        new Promise(resolve =>
                            resolve(dummyDocCollectionDataInterface)
                        )
                    );
                });

            const stateManagement: StateManagement = new StateManagement(
                configDataRepositoryMock,
                docCollectionDataRepositoryMock
            );

            try {
                const sharedState: SharedStateInterface = await stateManagement.update(
                    forceRefresh
                );

                expect(sharedState.currentConfig).toBe(
                    dummyConfigDataInterface
                );
                expect(sharedState.currentDocData).toBe(
                    dummyDocCollectionDataInterface
                );
                expect(configDataRepositoryMock.load).toHaveBeenCalledWith(
                    ConfigDataRepository.CONFIG_KEY,
                    forceRefresh
                );
                expect(
                    docCollectionDataRepositoryMock.load
                ).toHaveBeenCalledWith(
                    DocCollectionDataRepository.DOC_KEY,
                    forceRefresh
                );
            } catch (e) {
                fail(e);
            }
        });

        it("should update the state and return the updated state with forceRefresh", async () => {
            const forceRefresh: boolean = true;

            const dummyConfigDataInterface: ConfigDataInterface = {
                instanceName: "Test",
                backend: "ajax",
                cache: "json",
                cacheLifetime: 84000
            };

            const dummyDocCollectionDataInterface: DocCollectionInterface = {
                documentations: [
                    {
                        doc: [
                            {
                                documentationUrl: "https://any.url/",
                                documentationVersion: "1.0.0"
                            }
                        ]
                    }
                ]
            };
            const cacheDataStorageFactoryMock: CacheDataStorageFactory = new CacheDataStorageFactory();

            const configDataProviderMock: ConfigAjaxDataProvider = new ConfigAjaxDataProvider();
            const configCacheManagementMock: IndexedDBCacheManagement<ConfigDataInterface> = new IndexedDBCacheManagement();

            const configDataRepositoryMock: ConfigDataRepository = new ConfigDataRepository(
                configDataProviderMock,
                configCacheManagementMock,
                cacheDataStorageFactoryMock
            );
            configDataRepositoryMock.load = jest.fn().mockImplementation(() => {
                return Promise.resolve(
                    new Promise(resolve => resolve(dummyConfigDataInterface))
                );
            });

            const docCollectionDataProviderMock: DocAjaxDataProvider = new DocAjaxDataProvider();
            const docCollectionCacheManagementMock: IndexedDBCacheManagement<DocCollectionInterface> = new IndexedDBCacheManagement();
            const docCollectionDataRepositoryMock: DocCollectionDataRepository = new DocCollectionDataRepository(
                docCollectionDataProviderMock,
                docCollectionCacheManagementMock,
                cacheDataStorageFactoryMock
            );
            docCollectionDataRepositoryMock.load = jest
                .fn()
                .mockImplementation(() => {
                    return Promise.resolve(
                        new Promise(resolve =>
                            resolve(dummyDocCollectionDataInterface)
                        )
                    );
                });

            const stateManagement: StateManagement = new StateManagement(
                configDataRepositoryMock,
                docCollectionDataRepositoryMock
            );

            try {
                const sharedState: SharedStateInterface = await stateManagement.update(
                    forceRefresh
                );

                expect(sharedState.currentConfig).toBe(
                    dummyConfigDataInterface
                );
                expect(sharedState.currentDocData).toBe(
                    dummyDocCollectionDataInterface
                );
                expect(configDataRepositoryMock.load).toHaveBeenCalledWith(
                    ConfigDataRepository.CONFIG_KEY,
                    forceRefresh
                );
                expect(
                    docCollectionDataRepositoryMock.load
                ).toHaveBeenCalledWith(
                    DocCollectionDataRepository.DOC_KEY,
                    forceRefresh
                );
            } catch (e) {
                fail(e);
            }
        });
    });
});
