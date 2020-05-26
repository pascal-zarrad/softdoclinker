import NotificationManagementInterface from "@/management/notification/NotificationManagementInterface";
import NotificationInterface from "@/model/notification/NotificationInterface";

/**
 * Simple notification management that is used to add and remove
 * available notifications.
 *
 * @since 2.0.0
 * @see ./NotificationManagementInterface
 */
export default class NotificationManagement
    implements NotificationManagementInterface {
    /**
     * @inheritdoc
     */
    protected _notifications: NotificationInterface[] = [];

    /**
     * @inheritdoc
     */
    public notify(notification: NotificationInterface): boolean {
        this._notifications.push(notification);

        return true;
    }

    /**
     * @inheritdoc
     */
    public removeNotification(notification: NotificationInterface): boolean {
        const firstIndex = this._notifications.findIndex(
            element => element === notification
        );

        if (firstIndex === -1) {
            return false;
        }

        this.removeNotificationByIndex(firstIndex);

        return true;
    }

    /**
     * @inheritdoc
     */
    public removeAllNotifications(
        notification: NotificationInterface
    ): boolean {
        let atLeastRemovedOne = false;
        let currentIndex;
        while (
            (currentIndex = this._notifications.findIndex(element => {
                return element === notification;
            })) !== -1
        ) {
            this.removeNotificationByIndex(currentIndex);
        }

        return atLeastRemovedOne;
    }

    /**
     * Remove a single element from the notifications by its index.
     *
     * @param index The index of the element to remove
     */
    protected removeNotificationByIndex(index: number): void {
        this._notifications.splice(index, 1);
    }

    /**
     * @inheritdoc
     */
    public purge(): void {
        this._notifications.splice(0, this._notifications.length);
    }

    /**
     * Getter: _notifications
     */
    public get notifications(): NotificationInterface[] {
        return this._notifications;
    }
}
