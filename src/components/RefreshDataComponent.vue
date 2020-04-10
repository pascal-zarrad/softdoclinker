<template>
    <v-btn color="blue" bottom dark fab fixed right>
        <v-progress-circular
            v-if="sharedState.loading"
            indeterminate
            size="24"
        />
        <v-icon v-else>mdi-refresh</v-icon>
    </v-btn>
</template>

<script lang="ts">
import SoftDocLinkerDataStateInterface from "@/model/softDocLinkerDataStateInterface";
import { Component, Prop, Vue } from "vue-property-decorator";

/**
 * Component that provides a refresh button to manually trigger
 * a reload of all data (config/doc).
 *
 * @since 2.0.0
 */
@Component
export default class RefreshDataComponent extends Vue {
    /**
     * Shared state of the application
     */
    @Prop()
    sharedState?: SoftDocLinkerDataStateInterface;
}
</script>
