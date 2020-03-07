import Axios from "axios";
import DocAjaxDataProvider from "@/dataprovider/doc/docAjaxDataProvider";

jest.mock("axios");

describe("DocAjaxDataProvider", () => {
    describe("load", () => {
        it('should get "config/docs.json" using axios', async () => {
            const expected = {
                data: {
                    documentations: []
                }
            };
            (Axios.get as jest.Mock).mockResolvedValue(expected);

            try {
                const docAjaxDataProvider: DocAjaxDataProvider = new DocAjaxDataProvider();
                const result = await docAjaxDataProvider.load();

                expect(result).toBe(expected.data);
                expect(Axios.get).toHaveBeenCalledWith("config/docs.json");
            } catch (e) {
                fail(e);
            }
        });
    });
});
