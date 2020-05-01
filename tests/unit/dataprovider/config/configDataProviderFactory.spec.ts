import ConfigAjaxDataProvider from "@/dataprovider/config/ConfigAjaxDataProvider";
import ConfigDataProviderFactory from "@/dataprovider/config/ConfigDataProviderFactory";
import DataProviderInterface from "@/dataprovider/DataProviderInterface";
import ConfigDataInterface from "@/model/config/ConfigDataInterface";

describe("ConfigDataProviderFactory", () => {
    describe("create", () => {
        it("should return ConfigAjaxDataProvider with backend = ajax", () => {
            const configDataProviderFactory: ConfigDataProviderFactory = new ConfigDataProviderFactory();

            const result: DataProviderInterface<ConfigDataInterface> = configDataProviderFactory.create(
                "ajax"
            );

            expect(result).toBeInstanceOf(ConfigAjaxDataProvider);
        });

        it("should return ConfigAjaxDataProvider on unknown backend values", () => {
            const configDataProviderFactory: ConfigDataProviderFactory = new ConfigDataProviderFactory();

            const result: DataProviderInterface<ConfigDataInterface> = configDataProviderFactory.create(
                "42 is definitely not a real backend"
            );

            expect(result).toBeInstanceOf(ConfigAjaxDataProvider);
        });
    });
});
