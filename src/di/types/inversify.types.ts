/* istanbul ignore file */

import ContainerManagement from "@/di/ContainerManagement";

/**
 * Apply custom type overrides when necessary to customize SoftDocLinker.
 * By default, this function should stay empty and the bindings should be defined
 * using decorators.
 *
 * This is the only place where the containers binding should be modified
 * in the entire application.
 */
export default function applyTypeOverrides(
    containerManagement: ContainerManagement
) {}
