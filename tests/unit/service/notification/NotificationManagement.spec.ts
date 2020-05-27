import NotificationManagement from "@/service/notification/NotificationManagement";
import NotificationInterface from "@/model/notification/NotificationInterface";
import NotificationType from "@/model/notification/NotificationType";

describe("NotificationManagement", () => {
    describe("notify", () => {
        it("should add a notification", () => {
            const notificationMock: NotificationInterface = {
                type: NotificationType.INFO,
                message: "Test"
            };

            const notificationManagement: NotificationManagement = new NotificationManagement();

            expect(notificationManagement.notifications.length).toBe(0);

            const result = notificationManagement.notify(notificationMock);

            expect(result).toBe(true);
            expect(notificationManagement.notifications.length).toBeGreaterThan(
                0
            );
            expect(notificationManagement.notifications[0]).toEqual(
                notificationMock
            );
        });
    });

    describe("removeNotification", () => {
        it("should remove exactly one of the specified notification from the notifications", () => {
            const notificationMock: NotificationInterface = {
                type: NotificationType.INFO,
                message: "Test"
            };

            const notificationManagement: NotificationManagement = new NotificationManagement();
            for (let i = 0; i < 10; i++) {
                notificationManagement.notifications.push(notificationMock);
            }

            const result = notificationManagement.removeNotification(
                notificationMock
            );

            expect(result).toBe(true);
            expect(notificationManagement.notifications.length).toBe(9);
        });

        it("should return false if there is not notification qual to the specified", () => {
            const notificationMock: NotificationInterface = {
                type: NotificationType.INFO,
                message: "Test"
            };

            const notificationManagement: NotificationManagement = new NotificationManagement();

            const result = notificationManagement.removeNotification(
                notificationMock
            );

            expect(result).toBe(false);
            expect(notificationManagement.notifications.length).toBe(0);
        });
    });

    describe("removeAllNotifications", () => {
        it("should remove exactly one of the specified notification from the notifications", () => {
            const notificationMock: NotificationInterface = {
                type: NotificationType.INFO,
                message: "Test"
            };

            const notificationManagement: NotificationManagement = new NotificationManagement();
            for (let i = 0; i < 10; i++) {
                notificationManagement.notifications.push(notificationMock);
            }

            const result = notificationManagement.removeAllNotifications(
                notificationMock
            );

            expect(result).toBe(true);
            expect(notificationManagement.notifications.length).toBe(0);
        });

        it("should return false if there is not notification qual to the specified", () => {
            const notificationMock: NotificationInterface = {
                type: NotificationType.INFO,
                message: "Test"
            };

            const notificationManagement: NotificationManagement = new NotificationManagement();

            const result = notificationManagement.removeAllNotifications(
                notificationMock
            );

            expect(result).toBe(false);
            expect(notificationManagement.notifications.length).toBe(0);
        });
    });

    describe("purge", () => {
        it("should clear up all notifications", () => {
            const notificationMock: NotificationInterface = {
                type: NotificationType.INFO,
                message: "Test"
            };

            const notificationManagement: NotificationManagement = new NotificationManagement();
            for (let i = 0; i < 10; i++) {
                notificationManagement.notifications.push(notificationMock);
            }

            notificationManagement.purge();

            expect(notificationManagement.notifications.length).toBe(0);
        })
    });
});
