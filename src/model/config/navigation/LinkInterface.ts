/**
 * An interface that defines a single custom link button in the
 * SoftDocLinker navigation.
 *
 * @since 2.0.0
 */
export default interface LinkInterface {
    /**
     * The id of the link button
     */
    id: number;

    /**
     * The text displayed in the button
     */
    displayText: string;

    /**
     * The icon displayed on button
     */
    icon: string;

    /**
     * The url where the user is redirected to when clicking
     * the link button.
     */
    href: string;

    /**
     * The behavior when clicking the link (like open blank tab)
     */
    target: string;
}
