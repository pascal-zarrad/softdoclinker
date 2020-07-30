import DataProviderInterface from "@/dataprovider/DataProviderInterface";
import DocAjaxDataProvider from "@/dataprovider/doc/ajax/DocAjaxDataProvider";
import DocCollectionDataProviderFactory from "@/dataprovider/doc/DocCollectionDataProviderFactory";
import DocCollectionInterface from "@/model/doc/DocCollectionInterface";

describe("DocDataProviderFactory", () => {
    describe("create", () => {
        it("should return DocAjaxDataProvider with backend = ajax", () => {
            const docDataProviderFactory: DocCollectionDataProviderFactory = new DocCollectionDataProviderFactory();

            const result: DataProviderInterface<DocCollectionInterface> = docDataProviderFactory.create(
                "ajax"
            );

            expect(result).toBeInstanceOf(DocAjaxDataProvider);
        });

        it("should return DocAjaxDataProvider on unknown backend values", () => {
            const docDataProviderFactory: DocCollectionDataProviderFactory = new DocCollectionDataProviderFactory();

            const result: DataProviderInterface<DocCollectionInterface> = docDataProviderFactory.create(
                "42 is definitely not a real backend"
            );

            expect(result).toBeInstanceOf(DocAjaxDataProvider);
        });
    });
});
