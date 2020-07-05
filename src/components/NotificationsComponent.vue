<template>
    <div>
        <v-snackbar
            v-for="notification in notifications"
            :key="notification.id"
            :right="true"
            :bottom="true"
            v-model="notification.show"
        >
            {{ notification.message }}
            <v-btn
                color="blue"
                text
                @click="submitCloseNotification(notification)"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script lang="ts">
import NotificationInterface from "@/model/notification/NotificationInterface";
import { Component, Vue } from "vue-property-decorator";

/**
 * Component that handles notification display by making use of the
 * Vuetify Snackbar component
 *
 * @since 2.0.0
 */
@Component({
    name: "NotificationsComponent"
})
export default class NotificationsComponent extends Vue {
    /**
     * A computed property that provides the notifications array
     * that provides all notifications that should be created by this component.
     *
     * @returns The (reactive) array that contains all visible notifications
     */
    get notifications(): NotificationInterface[] {
        return this.$softDocLinker.notificationManagement.notifications;
    }

    /**
     * Called when a notification is being closed manually by clicking
     * on the close button.
     *
     * @param notification The notification of which a close was triggered
     */
    private submitCloseNotification(notification: NotificationInterface): void {
        notification.show = false;
        this.$softDocLinker.notificationManagement.removeNotification(
            notification
        );
    }
}
</script>
