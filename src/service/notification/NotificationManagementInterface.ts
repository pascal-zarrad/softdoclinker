import NotificationInterface from "@/model/notification/NotificationInterface";

/**
 * Manage the currently available notifications.
 * This includes:
 *  - adding new notifications
 *  - removing existing notifications
 *  - purging all notifications
 *
 * @since 2.0.0
 */
export default interface NotificationManagementInterface {
    /**
     * The currently available notifications
     */
    readonly notifications: NotificationInterface[];

    /**
     * Play out a new notification that should be displayed.
     *
     * @param notification The notification to add
     * @returns The state if the notification has ben successfully added
     */
    notify(notification: NotificationInterface): boolean;

    /**
     * Remove a notification from the available notifications.
     * If the same notification object is multiple times in the notifications,
     * the first one that has been added will be removed.
     *
     * @returns A boolean that indicates if the given notification could be removed.
     */
    removeNotification(notification: NotificationInterface): boolean;

    /**
     * Remove all notifications of the same notification object from the available notifications.
     *
     * @returns A boolean that indicates if the given notification(s) could be removed.
     */
    removeAllNotifications(notification: NotificationInterface): boolean;

    /**
     * Purge all currently displayed notifications
     */
    purge(): void;
}
