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
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="notification.show = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script lang="ts">
import SOFT_DOC_LINKER, { SoftDocLinker } from "@/SoftDocLinker";
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
    snackbar: boolean = true;
    /**
     * A computed property that provides the notifications array
     * that provides all notifications that should be created by this component.
     */
    get notifications(): NotificationInterface[] {
        console.log(SOFT_DOC_LINKER.notificationManagement.notifications);
        return SOFT_DOC_LINKER.notificationManagement.notifications;
    }
}
</script>
