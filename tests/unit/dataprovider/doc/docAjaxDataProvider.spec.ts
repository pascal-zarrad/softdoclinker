import Axios from "axios";
import DocAjaxDataProvider from "@/dataprovider/doc/docAjaxDataProvider";

jest.mock("axios");

describe("DocAjaxDataProvider", () => {
    it('should get "config/docs.json" using axios', () => {
        const expected = Promise.resolve();

        (Axios.get as jest.Mock).mockResolvedValue(expected);

        const docAjaxDataProvider: DocAjaxDataProvider = new DocAjaxDataProvider();
        const result = docAjaxDataProvider.load();

        expect(result).toBeInstanceOf(Promise);
        expect(Axios.get).toHaveBeenCalledWith("config/docs.json");
    });
});
