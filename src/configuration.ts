/**
 * Our core configuration to provide some basic configuration options which makes SoftDocLinker customizable.
 * This config mostly provides Meta-Data which is used to update the DOM on-the-fly
 */
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

    // Settings for Navbar Button

    get navbarBrand() {
        return this._navbarBrand;
    }

    /**
     * The toggle if the custom button should be enabled
     */
    private _enableCustomNavbarButton;

    get enableCustomNavbarButton() {
        return this._enableCustomNavbarButton;
    }

    get pageTitle() {
        return this._pageTitle;
    }

    /**
     * The text displayed in the button
     */
    private _customNavbarButtonText;

    get customNavbarButtonText() {
        return this._customNavbarButtonText;
    }

    /**
     * The link to which the user will be redirected when clicking on the custom button
     */
    private _customNavbarButtonTarget;

    get customNavbarButtonTarget() {
        return this._customNavbarButtonTarget;
    }

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

    deserialize(object: any): CoreConfiguration {
        this._pageTitle = object.pageTitle;
        this._navbarBrand = object.navbarBrand;
        this._enableCustomNavbarButton = object.enableCustomNavbarButton;
        this._customNavbarButtonText = object.customNavbarButtonText;
        this._customNavbarButtonTarget = object.customNavbarButtonTarget;
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