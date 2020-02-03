import { IDBPDatabase, openDB } from "idb";

/**
 * Create an connection to
 *
 * @since 2.0.0
 */
export default class IndexedDBKeyValueStore {
    /**
     * The current version of the database.
     * Should be increased when the data structure changes.
     */
    static readonly DATABASE_VERSION = 1;

    /**
     * The name of the database managed by this IndexedDBManager
     */
    private _databaseName: string;

    /**
     * The currently opened database.
     */
    private indexedDBDatabase?: IDBPDatabase;

    /**
     * Constructor
     *
     * @param databaseName The name of the database that should be opened
     * @param indexedDBDatabase Optional: The IDBPDatabase to use.
     */
    constructor(databaseName: string, indexedDBDatabase?: IDBPDatabase) {
        this._databaseName = databaseName;
        this.indexedDBDatabase = indexedDBDatabase;
    }

    /**
     * Initialize the IndexedDB connection to prepare it for use.
     */
    public async initialize(): Promise<boolean> {
        if (!this.isAvailable()) {
            try {
                this.indexedDBDatabase = await openDB(
                    this.databaseName,
                    IndexedDBKeyValueStore.DATABASE_VERSION
                );
                return true;
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error("Database connection already available!");
        }
    }

    // public async store<T>(key: string, value: T) {}

    // public async get<T>(key: string): Promise<T> {}

    /**
     * Check if a database is available.
     * This check does not guarantee that the database
     * is also open.
     *
     * @returns The state of the connection to the database
     */
    public isAvailable(): boolean {
        return this.indexedDBDatabase !== undefined;
    }

    /**
     * Close the currently opened database if any database is available.
     */
    public close(): void {
        if (this.indexedDBDatabase !== undefined) {
            this.indexedDBDatabase.close();
            this.indexedDBDatabase = undefined;
        }
    }

    /**
     * Getter: _databaseName
     */
    public get databaseName(): string {
        return this._databaseName;
    }
}
