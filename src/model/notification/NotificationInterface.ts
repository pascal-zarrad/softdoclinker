/* istanbul ignore file */

/**
 * Model of the data required to display a notification.
 *
 * @since 2.0.0
 */
export default interface NotificationInterface {
    /**
     * The message that is displayed by the notification.
     */
    message: string;

    /**
     * The type the displayed notification should have
     *
     * @see ./NotificationType
     */
    type: string;

    /**
     * State of this notification should be shown in the frontend.
     */
    show: boolean;
}
