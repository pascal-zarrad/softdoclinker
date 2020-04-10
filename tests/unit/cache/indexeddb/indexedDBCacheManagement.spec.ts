import CacheDataStorage from "@/cache/cacheDataStorage";
import IndexedDBCacheManagement from "@/cache/indexeddb/indexedDBCacheManagement";
import { del, get, set } from "idb-keyval";

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

            try {
                await indexedDBCacheManagement.load(expected);
            } catch (e) {
                fail(e);
            }

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

            try {
                await indexedDBCacheManagement.update(expectedTestData);
            } catch (e) {
                fail(e);
            }

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

            try {
                await indexedDBCacheManagement.invalidate(expected);
            } catch (e) {
                fail(e);
            }

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

            try {
                const result = await indexedDBCacheManagement.isValid(dummyKey);
                expect(indexedDBCacheManagement.load).toHaveBeenCalled();
                expect(result).toBe(expected);
            } catch (e) {
                fail(e);
            }
        });

        it("should return false when a value is not cached", async () => {
            const expected = false;

            const dummyKey = "myExpectedKey";
            const expectedTime = 5000;
            const indexedDBCacheManagement = new IndexedDBCacheManagement();

            indexedDBCacheManagement.load = jest.fn(() => {
                return new Promise(function(resolve) {
                    resolve(undefined);
                });
            });

            expect.assertions(2);

            try {
                const result = await indexedDBCacheManagement.isValid(dummyKey);
                expect(indexedDBCacheManagement.load).toHaveBeenCalled();
                expect(result).toBe(expected);
            } catch (e) {
                fail(e);
            }
        });

        it("should return false when lastAccess is undefined", async () => {
            const expected = false;

            const dummyKey = "myExpectedKey";
            const indexedDBCacheManagement = new IndexedDBCacheManagement();

            indexedDBCacheManagement.load = jest.fn(() => {
                return new Promise(function(resolve) {
                    const testItem: CacheDataStorage<number> = new CacheDataStorage(
                        "dummyKey",
                        42
                    );
                    // Igore type checking to set Date to undefined
                    (testItem as any).lastAccess = undefined;
                    resolve(testItem);
                });
            });

            expect.assertions(2);

            try {
                const result = await indexedDBCacheManagement.isValid(dummyKey);
                expect(indexedDBCacheManagement.load).toHaveBeenCalled();
                expect(result).toBe(expected);
            } catch (e) {
                fail(e);
            }
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

            try {
                const result = await indexedDBCacheManagement.isValid(dummyKey);
                expect(indexedDBCacheManagement.load).toHaveBeenCalled();
                expect(result).toBe(expected);
            } catch (e) {
                fail(e);
            }
        });
    });
});
