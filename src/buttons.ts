/**
 * The configuration for a simple navigation bar button (in real it's a simple normal link, but button sounds better)
 */
export class NavbarButton {

    /**
     * Text text displayed
     */
    public displayText: string;

    /**
     * The icon displayed before the displayText
     */
    public icon: string;

    /**
     * The target where the button is pointing to (href attribute)
     */
    public target: string;

    constructor(displayText: string, icon: string, target: string) {
        this.displayText = displayText;
        this.icon = icon;
        this.target = target;
    }

    /**
     * Create a navigation bar button from a JSon object
     * @param data The data from which the button should be created
     * @returns {NavbarButton} The button that has been created using the JSon object
     */
    public static fromJSon(data): NavbarButton {
        return new NavbarButton(data.displayText, data.icon, data.target);
    }
}