import StateManagement from "@/model/StateManagement";
import SharedStateInterface from "@/model/SharedStateInterface";
import ConfigDataRepository from "@/model/config/ConfigDataRepository";
import ConfigAjaxDataProvider from "@/dataprovider/config/ConfigAjaxDataProvider";
import IndexedDBCacheManagement from "@/cache/indexeddb/IndexedDBCacheManagement";
import ConfigDataInterface from "@/model/config/ConfigDataInterface";
import CacheDataStorageFactory from "@/cache/CacheDataStorageFactory";
import DocCollectionDataRepository from "@/model/doc/DocCollectionDataRepository";
import DocAjaxDataProvider from "@/dataprovider/doc/DocAjaxDataProvider";
import DocCollectionInterface from "@/model/doc/DocCollectionInterface";
import NotificationManagement from "@/service/notification/NotificationManagement";

jest.mock("@/model/config/ConfigDataRepository");
jest.mock("@/dataprovider/config/ConfigAjaxDataProvider");
jest.mock("@/cache/CacheDataStorageFactory");
jest.mock("@/model/doc/DocCollectionDataRepository");
jest.mock("@/service/notification/NotificationManagement");

describe("StateManagement", () => {
    describe("update", () => {
        it("should update the state and return the updated state without forceRefresh", async () => {
            const forceRefresh: boolean = false;

            const dummyConfigDataInterface: ConfigDataInterface = {
                instanceName: "Test",
                backend: "ajax",
                cache: "json",
                cacheLifetime: 84000,
                navigation: {
                    links: []
                }
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

            const notificationManagementMock: NotificationManagement = new NotificationManagement();

            const stateManagement: StateManagement = new StateManagement(
                configDataRepositoryMock,
                docCollectionDataRepositoryMock,
                notificationManagementMock
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
                cacheLifetime: 84000,
                navigation: {
                    links: []
                }
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
            const notificationManagementMock: NotificationManagement = new NotificationManagement();

            const stateManagement: StateManagement = new StateManagement(
                configDataRepositoryMock,
                docCollectionDataRepositoryMock,
                notificationManagementMock
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
