import IndexedDBCacheManagement from "@/cache/indexeddb/indexedDBCacheManagement";
import { get, set, del } from "idb-keyval";
import CacheDataStorage from "@/cache/cacheDataStorage";

jest.mock("idb-keyval");

describe("IndexedDBCacheManagement", () => {
    describe("initialize", () => {
        it("should fulfill the returned promise", async () => {
            const indexedDBCacheManagement = new IndexedDBCacheManagement();

            expect.assertions(0);

            indexedDBCacheManagement.initialize().catch(() => {
                fail("Promise has been rejected");
            });
        });
    });

    describe("load", () => {
        it("should call idb-keyval -> get with the provided key", async () => {
            const expected = "myExpectedKey";

            const indexedDBCacheManagement = new IndexedDBCacheManagement();

            expect.assertions(2);

            (get as jest.Mock).mockImplementation((key: string) => {
                expect(key).toBe(expected);
            });

            await indexedDBCacheManagement.load(expected);

            expect(get as jest.Mock).toHaveBeenCalled();
        });
    });

    describe("update", () => {
        it("should call idb-keyval -> set with the specified key", async () => {
            const expectedKey = "myExpectedKey";
            const expectedData = 42;

            const expectedTestData = new CacheDataStorage<number>(
                expectedKey,
                expectedData
            );

            const indexedDBCacheManagement = new IndexedDBCacheManagement();

            expect.assertions(3);

            (set as jest.Mock).mockImplementation(
                (key: string, data: number) => {
                    expect(key).toBe(expectedKey);
                    expect(data).toBe(expectedTestData);
                }
            );

            await indexedDBCacheManagement.update(expectedTestData);

            expect(set as jest.Mock).toHaveBeenCalled();
        });
    });

    describe("invalidate", () => {
        it("should call idb-keyval -> del with the specified key", async () => {
            const expected = "myExpectedKey";

            const indexedDBCacheManagement = new IndexedDBCacheManagement();

            expect.assertions(2);

            (del as jest.Mock).mockImplementation((key: string) => {
                expect(key).toBe(expected);
            });

            indexedDBCacheManagement.invalidate(expected);

            expect(del as jest.Mock).toHaveBeenCalled();
        });
    });

    describe("isValid", () => {
        it("should return true when a value is cached", async () => {
            const expected = true;

            const dummyKey = "myExpectedKey";
            const expectedTime = 0;
            const indexedDBCacheManagement = new IndexedDBCacheManagement();

            jest.spyOn(Date, "now").mockReturnValue(expectedTime);

            indexedDBCacheManagement.load = jest.fn(() => {
                return new Promise(function(resolve) {
                    const testDate: Date = new Date();
                    testDate.setTime(expectedTime);
                    resolve(new CacheDataStorage<number>("Test", 42, testDate));
                });
            });

            expect.assertions(2);

            const result = await indexedDBCacheManagement.isValid(dummyKey);
            expect(indexedDBCacheManagement.load).toHaveBeenCalled();
            expect(result).toBe(expected);
        });

        it("should return false when a value is not cached", async () => {
            const expected = false;

            const dummyKey = "myExpectedKey";
            const expectedTime = 0;
            const indexedDBCacheManagement = new IndexedDBCacheManagement();

            indexedDBCacheManagement.load = jest.fn(() => {
                return new Promise(function(resolve) {
                    const testDate: Date = new Date();
                    testDate.setTime(expectedTime);
                    resolve(undefined);
                });
            });

            expect.assertions(2);

            const result = await indexedDBCacheManagement.isValid(dummyKey);
            expect(indexedDBCacheManagement.load).toHaveBeenCalled();
            expect(result).toBe(expected);
        });

        it("should return true when a value is cached", async () => {
            const expected = false;

            const dummyKey = "myExpectedKey";
            const expectedTime = 0;
            const expectedActualTime = 101;
            const indexedDBCacheManagement = new IndexedDBCacheManagement(100);

            jest.spyOn(Date, "now").mockReturnValue(expectedActualTime);

            indexedDBCacheManagement.load = jest.fn(() => {
                return new Promise(function(resolve) {
                    const testDate: Date = new Date();
                    testDate.setTime(expectedTime);
                    resolve(new CacheDataStorage<number>("Test", 42, testDate));
                });
            });

            expect.assertions(2);

            const result = await indexedDBCacheManagement.isValid(dummyKey);
            expect(indexedDBCacheManagement.load).toHaveBeenCalled();
            expect(result).toBe(expected);
        });
    });
});
