import ConfigAjaxDataProvider from "@/dataprovider/config/configAjaxDataProvider";
import ConfigDataProviderFactory from "@/dataprovider/config/configDataProviderFactory";
import DataProviderInterface from "@/dataprovider/dataProviderInterface";
import ConfigInterface from "@/model/config/configInterface";

describe("ConfigDataProviderFactory", () => {
    it("should return ConfigAjaxDataProvider with backend = ajax", () => {
        const configDataProviderFactory: ConfigDataProviderFactory = new ConfigDataProviderFactory();

        const result: DataProviderInterface<ConfigInterface> = configDataProviderFactory.create(
            "backend"
        );

        expect(result).toBeInstanceOf(ConfigAjaxDataProvider);
    });

    it("should return ConfigAjaxDataProvider on unknown backend values", () => {
        const configDataProviderFactory: ConfigDataProviderFactory = new ConfigDataProviderFactory();

        const result: DataProviderInterface<ConfigInterface> = configDataProviderFactory.create(
            "42 is definitly not a real backend"
        );

        expect(result).toBeInstanceOf(ConfigAjaxDataProvider);
    });
});
