/* istanbul ignore file */

import DocCollectionInterface from "@/model/doc/DocCollectionInterface";

/**
 * Returns a fresh object containing the default docs of SoftDocLinker
 *
 * @since 2.0.0
 */
export default function defaultDocCollectionData(): DocCollectionInterface {
    return {
        /**
         * @inheritdoc
         */
        documentations: []
    };
}
