/* istanbul ignore file */

import NotificationManagementInterface from "./NotificationManagementInterface";
import NotificationManagement from "./NotificationManagement";

/**
 * Factory to create instances that implement the NotificationManagementInterface.
 *
 * @since 2.0.0
 */
export default class NotificationManagementFactory {
    /***
     * Create a new notification management instance.
     *
     * @returns a newly created instance that implements NotificationManagementInterface
     */
    public create(): NotificationManagementInterface {
        return new NotificationManagement();
    }
}
