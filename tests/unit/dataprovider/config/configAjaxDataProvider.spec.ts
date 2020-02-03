import Axios from "axios";
import ConfigAjaxDataProvider from "@/dataprovider/config/configAjaxDataProvider";

jest.mock("axios");

describe("ConfigAjaxDataProvider", () => {
    describe("load", () => {
        it('should get "config/config.json" using axios', () => {
            const expected = Promise.resolve();

            (Axios.get as jest.Mock).mockResolvedValue(expected);

            const configAjaxDataProvider: ConfigAjaxDataProvider = new ConfigAjaxDataProvider();
            const result = configAjaxDataProvider.load();

            expect(result).toBeInstanceOf(Promise);
            expect(Axios.get).toHaveBeenCalledWith("config/config.json");
        });
    });
});
