import provideSingleton from "@/di/decorators/provideSingleton";
import Axios from "axios";
import { injectable } from "inversify";

/**
 * A data source that uses ajax to load data from a server.
 *
 * @todo extend with more functionality in the future if necessary.
 * @since 2.0.0
 */
@injectable()
@provideSingleton(AjaxJsonDataSource)
export default class AjaxJsonDataSource {
    /**
     * Execute a simple ajax request to the target url.
     * The result will then being return.
     * If an interface is given through the generic for the return type,
     * the returned type will equal
     *
     * @param requestBody The body to send with the request
     * @returns The gained data
     */
    public async simpleLoadAsync<T>(targetUrl: string): Promise<T> {
        return await (
            await Axios.get(targetUrl, {
                headers: {
                    "Cache-Control": "no-cache",
                    "Content-type": "application/json"
                }
            })
        ).data;
    }
}
