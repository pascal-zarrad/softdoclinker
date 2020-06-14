import Vue from "vue";
import SoftDocLinkerInterface from "@/SoftDocLinkerInterface";

/**
 * Augment Vue type to add our own instance properties required for
 * stuff that is shared between the entire application.
 */
declare module "vue/types/vue" {
    interface Vue {
        /**
         * SoftDocLinker instance that provides access to
         * the management of the management of the data layer.
         */
        $softDocLinker: SoftDocLinkerInterface;
    }
}
