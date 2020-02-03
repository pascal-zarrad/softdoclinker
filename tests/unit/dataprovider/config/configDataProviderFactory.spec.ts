import ConfigAjaxDataProvider from "@/dataprovider/config/configAjaxDataProvider";
import ConfigDataProviderFactory from "@/dataprovider/config/configDataProviderFactory";
import DataProviderInterface from "@/dataprovider/dataProviderInterface";
import ConfigDataInterface from "@/model/config/configDataInterface";

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
                "42 is definitly not a real backend"
            );

            expect(result).toBeInstanceOf(ConfigAjaxDataProvider);
        });
    });
});
