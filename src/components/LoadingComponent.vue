<template>
    <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<style lang="less" scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

/**
 * Component that can be used to indicate a loading state
 * when data is being pulled in the background.
 *
 * @since 2.0.0
 */
@Component
export default class LoadingComponent extends Vue {
    @Prop({ default: true })
    overlay: boolean = true;
}
</script>
