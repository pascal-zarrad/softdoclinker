import DocDataProviderFactory from "@/dataprovider/doc/docDataProviderFactory";
import DataProviderInterface from "@/dataprovider/dataProviderInterface";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";
import DocAjaxDataProvider from "@/dataprovider/doc/docAjaxDataProvider";

describe("DocDataProviderFactory", () => {
    it("should return DocAjaxDataProvider with backend = ajax", () => {
        const docDataProviderFactory: DocDataProviderFactory = new DocDataProviderFactory();

        const result: DataProviderInterface<DocCollectionInterface> = docDataProviderFactory.create(
            "backend"
        );

        expect(result).toBeInstanceOf(DocAjaxDataProvider);
    });

    it("should return DocAjaxDataProvider on unknown backend values", () => {
        const docDataProviderFactory: DocDataProviderFactory = new DocDataProviderFactory();

        const result: DataProviderInterface<DocCollectionInterface> = docDataProviderFactory.create(
            "42 is definitly not a real backend"
        );

        expect(result).toBeInstanceOf(DocAjaxDataProvider);
    });
});
