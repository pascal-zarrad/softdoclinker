/**
 * Our core configuration to provide some basic configuration options which makes SoftDocLinker customizable.
 * This config mostly provides Meta-Data which is used to update the DOM on-the-fly
 */
import {NavbarButton} from "./buttons";
import {DocumentationData} from "./documentationData";

export class DocumentationConfiguration implements Serializable<DocumentationConfiguration> {

    private constructor() {
    }

    /**
     * The documentations available
     */
    private _documentations: DocumentationData[] = [];

    /**
     * The mobile browser status
     */
    private _mobileBrowser: boolean = false;

    get documentations(): DocumentationData[] {
        return this._documentations;
    }

    /**
     * Create a new DocumentationConfiguration from a JSon object
     * @param object The object to deserialize into an DocumentationConfiguration object
     * @returns {DocumentationConfiguration} The DocumentationConfiguration object from the JSon object
     */
    public static getDocumentationConfigurationFromJSonObject(object): DocumentationConfiguration {
        return new DocumentationConfiguration().deserialize(object);
    }

    serialize(object: DocumentationConfiguration): any {
        throw new Error("Serialization has not been implemented!");
    }

    deserialize(object: any): DocumentationConfiguration {
        for (let documentationData of object.documentations) {
            let docuData = DocumentationData.fromJSon(documentationData);
            this._documentations.push(docuData);
        }
        return this;
    }

    get mobileBrowser(): boolean {
        return this._mobileBrowser;
    }

    set mobileBrowser(value: boolean) {
        this._mobileBrowser = value;
    }
}

export class CoreConfiguration implements Serializable<CoreConfiguration> {

    /**
     * Private constructor to prevent object initialization by third party classes without using the CoreConfiguration#getCoreConfigurationFromJsonObject
     */
    private constructor() {
    }

    // General Settings

    /**
     * The title of the page
     */
    private _pageTitle;

    /**
     * The text for the navbar brand
     */
    private _navbarBrand;

    // Settings for Navbar

    /**
     * The buttons displayed in the navigation bar
     */
    private _navbarButtons: NavbarButton[];

    /**
     * Create a new CoreConfiguration from a JSon object
     * @param object The object to deserialize into an CoreConfiguration object
     * @returns {CoreConfiguration} The CoreConfiguration object from the JSon object
     */
    public static getCoreConfigurationFromJsonObject(object: any) {
        return new CoreConfiguration().deserialize(object);
    }

    serialize(object: CoreConfiguration): any {
        throw new Error("Serialization has not been implemented!");
    }

    get navbarButtons(): NavbarButton[] {
        return this._navbarButtons;
    }

    get navbarBrand() {
        return this._navbarBrand;
    }

    get pageTitle() {
        return this._pageTitle;
    }

    deserialize(object: any): CoreConfiguration {
        this._pageTitle = object.pageTitle;
        this._navbarBrand = object.navbarBrand;
        let navbarButtons: NavbarButton[] = [];
        for (let buttonData of object.navbarButtons) {
            navbarButtons.push(NavbarButton.fromJSon(buttonData));
        }
        this._navbarButtons = navbarButtons;
        return this;
    }
}

/**
 * A interface which is used to implement an a bit scrappy way of serialization
 */
interface Serializable<T> {

    /**
     * Serialize a object to a JSon object
     * @param {T} object The object to serialize
     * @returns {any} The serialized object
     */
    serialize(object: T): any;

    /**
     * Deserialize a JSon object to a object
     * @param object The JSon object to deserialize
     * @returns {T} The object which isn't serialized anymore
     */
    deserialize(object: any): T;
}