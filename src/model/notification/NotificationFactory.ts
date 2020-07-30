import { injectable } from "inversify";
/* istanbul ignore file */

import NotificationInterface from "./NotificationInterface";

/**
 * Factory to create notifications.
 *
 * @since 2.0.0
 */
@injectable()
export default class NotificationFactory {
    /**
     * Create a new notification.
     *
     * @param type The type of the notification to create
     * @param message The message of the notification
     * @returns A new notification with the given data
     */
    public create(type: string, message: string): NotificationInterface {
        return {
            type: type,
            message: message,
            show: false
        };
    }
}
