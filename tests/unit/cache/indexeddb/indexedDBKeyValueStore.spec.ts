import { openDB, IDBPDatabase } from "idb";
import IndexedDBKeyValueStore from "@/cache/indexeddb/indexedDBKeyValueStore";

jest.mock("idb");

describe("IndexedDBKeyValueStore", () => {
    describe("isAvailable", () => {
        it("should be true when database is available", () => {
            const expected: boolean = true;

            const databaseMock = {} as IDBPDatabase;
            const indexedDBKeyValueStore: IndexedDBKeyValueStore = new IndexedDBKeyValueStore(
                "Test",
                databaseMock
            );
            const result = indexedDBKeyValueStore.isAvailable();

            expect(result).toBe(expected);
        });

        describe("should be false when database is not available", () => {
            const expected: boolean = false;

            const indexedDBKeyValueStore: IndexedDBKeyValueStore = new IndexedDBKeyValueStore(
                "Test"
            );
            const result = indexedDBKeyValueStore.isAvailable();

            expect(result).toBe(expected);
        });
    });

    describe("initialize", () => {
        it("should throw an error when database already available", async () => {
            const databaseMock = {} as IDBPDatabase;
            const indexedDBKeyValueStore: IndexedDBKeyValueStore = new IndexedDBKeyValueStore(
                "Test",
                databaseMock
            );

            expect.assertions(1);

            await expect(indexedDBKeyValueStore.initialize()).rejects.toThrow();
        });

        it("should throw an error when openDB threw an error", async () => {
            (openDB as jest.Mock).mockImplementation(() => {
                throw new Error("Dummy Error");
            });

            const indexedDBKeyValueStore: IndexedDBKeyValueStore = new IndexedDBKeyValueStore(
                "Test"
            );

            expect.assertions(1);

            await expect(indexedDBKeyValueStore.initialize()).rejects.toThrow();
        });

        it("should open a IndexDB connection when no connection is open", async () => {
            (openDB as jest.Mock).mockImplementation(() => {
                return {};
            });

            const indexedDBKeyValueStore: IndexedDBKeyValueStore = new IndexedDBKeyValueStore(
                "Test"
            );

            expect.assertions(2);

            return indexedDBKeyValueStore.initialize().then(() => {
                expect(openDB).toHaveBeenCalled();
                expect(openDB).toHaveBeenLastCalledWith(
                    "Test",
                    IndexedDBKeyValueStore.DATABASE_VERSION
                );
            });
        });
    });

    describe("close", () => {
        it("should close the database if connection is open", () => {
            const closeMock = jest.fn();
            const databaseDummy: IDBPDatabase = ({
                close: closeMock
            } as any) as IDBPDatabase;

            const indexedDBKeyValueStore: IndexedDBKeyValueStore = new IndexedDBKeyValueStore(
                "Test",
                databaseDummy
            );

            indexedDBKeyValueStore.close();

            expect(closeMock).toHaveBeenCalled();
        });

        it("should not close the database if connection is not open", () => {
            const closeMock = jest.fn();
            const databaseDummy: IDBPDatabase = ({
                close: closeMock
            } as any) as IDBPDatabase;

            const indexedDBKeyValueStore: IndexedDBKeyValueStore = new IndexedDBKeyValueStore(
                "Test"
            );

            indexedDBKeyValueStore.close();

            expect(closeMock).toHaveBeenCalledTimes(0);
        });
    });
});
