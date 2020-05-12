<template>
    <v-btn color="blue" @click="onClick" bottom dark fab fixed right>
        <v-progress-circular
            v-if="sharedState.loading"
            indeterminate
            size="24"
        />
        <v-icon v-else>mdi-refresh</v-icon>
    </v-btn>
</template>

<script lang="ts">
import SoftDocLinkerDataStateInterface from "@/model/SharedStateInterface";
import SOFT_DOC_LINKER, { SoftDocLinker } from "@/SoftDocLinker";
import StateManagement from "@/model/StateManagement";
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

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

    /**
     * Listener for click event of the refresh button
     */
    onClick() {
        SOFT_DOC_LINKER.getStateManagement().then(stateManagement =>
            stateManagement.update(true)
        );
    }
}
</script>
