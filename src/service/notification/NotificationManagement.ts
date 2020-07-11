import NotificationManagementInterface from "@/service/notification/NotificationManagementInterface";
import NotificationInterface from "@/model/notification/NotificationInterface";
import Vue from "vue";

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
    protected _notifications: NotificationInterface[] = Vue.observable([]);

    /**
     * The timeout how long a single notification is shown.
     */
    protected timeout: number;

    /**
     * Constructor
     *
     * @param timeout The timeout how long a single notification is shown.
     */
    constructor(timeout: number = 3000) {
        this.timeout = timeout;
    }

    /**
     * @inheritdoc
     */
    public notify(notification: NotificationInterface): boolean {
        this._notifications.push(notification);
        notification.show = true;
        setTimeout(() => {
            notification.show = false;
            this.removeNotification(notification);
        }, this.timeout);

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
            atLeastRemovedOne = true;
        }
        atLeastRemovedOne;
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
