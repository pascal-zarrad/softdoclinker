import {AjaxJsonDataResolver} from "./ajaxJsonDataResolver";

/**
 * Main class of SoftDocLinker
 */
class SoftDocLinker {

    /**
     * Our AjaxJsonDataResolver which is used to resolve our required data.
     */
    private dataResolver: AjaxJsonDataResolver;

    constructor() {
        this.dataResolver = new AjaxJsonDataResolver();
        console.log("Test!")
    }

    /**
     * Entry point of Web-App
     */
    public static main() {
        new SoftDocLinker();
    }
}

SoftDocLinker.main();