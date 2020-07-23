/* istanbul ignore file */

import ContainerManagement from "@/di/ContainerManagement";

/**
 * Apply custom type overrides when necessary to customize SoftDocLinker.
 * By default, this function should stay empty and the bindings should be defined
 * using decorators.
 *
 * This is the only place where the containers binding should be modified
 * in the entire application.
 *
 * To keep things organized, sort bindings after their lowest path
 * and use comments.
 */
export default function applyExtendedTypeOverrides(
    containerManagement: ContainerManagement
) {}
