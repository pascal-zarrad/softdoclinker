import ConfigAjaxDataProvider from "@/dataprovider/config/configAjaxDataProvider";
import Axios from "axios";

jest.mock("axios");

describe("ConfigAjaxDataProvider", () => {
    describe("load", () => {
        it('should get "config/config.json" using axios', async () => {
            const expected = {
                data: {
                    backend: "ajax",
                    cache: "indexedDB"
                }
            };

            (Axios.get as jest.Mock).mockResolvedValue(expected);

            try {
                const configAjaxDataProvider: ConfigAjaxDataProvider = new ConfigAjaxDataProvider();
                const result = await configAjaxDataProvider.load();

                expect(result).toBe(expected.data);
                expect(Axios.get).toHaveBeenCalledWith("config/config.json");
            } catch (e) {
                fail(e);
            }
        });
    });
});
