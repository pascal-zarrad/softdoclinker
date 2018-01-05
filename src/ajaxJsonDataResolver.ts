// We use JQuery for our AJAX requests.
declare const $: any;

/**
 * A simple JQuery based resolver to load configurations using AJAX from a simple JSon file.
 * Used to load configurations and data. This does the magic behind the scenes required to make adding or removing docs that simple.
 */
export class AjaxJsonDataResolver {

    /**
     * Load data from a URL and receive it using a JSonDataReceiver
     * @param {string} url The url from which the data will be requested
     * @param {JSonDataReceiver} receiver The receiver which receives the data and serves it.
     */
    public loadData(url: string, receiver: JSonDataReceiver): void {
        $.get(url, function (data) {
            receiver.receive(data);
        });
    }
}

/**
 * A simple receiver (listener) object to receive a result from JQuery
 */
export abstract class JSonDataReceiver {

    /**
     * Called when a result has been received.
     * @param data The data received from JQUery
     */
    public abstract receive(data);

}