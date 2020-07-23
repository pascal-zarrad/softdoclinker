/* istanbul ignore file */

import ContainerManagement from "@/di/ContainerManagement";
import { TYPES } from "@/di/types/inversify.symbols";
import { Container } from "inversify";

/**
 * Apply custom core bindings for core functionality if necessary.
 *
 * If you are about to customize SoftDocLinker, use { @link extend/inversify.typesExtend }
 * instead to differ customizations from SoftDocLinker core stuff.
 * This also allows to rebind types that are defined here.
 *
 * To keep things organized, sort bindings after their lowest path
 * and use comments.
 */
export default function applyTypeOverrides(
    containerManagement: ContainerManagement
) {
    const container: Container = containerManagement.container;

    // @/di
    container
        .bind(TYPES.ContainerManagementInterface)
        .toConstantValue(ContainerManagement.getContainerManagement());
}
