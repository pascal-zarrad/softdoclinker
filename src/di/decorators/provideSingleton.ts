import { interfaces } from "inversify";
import { fluentProvide, provide } from "inversify-binding-decorators";

/**
 * Shorthand decorator for singleton binding
 * using inversify-binding-decorators.
 *
 * @param identifier The identifier of the binding
 */
export default function provideSingleton<T>(
    identifier: interfaces.ServiceIdentifier<T>
) {
    return fluentProvide(identifier)
        .inSingletonScope()
        .done();
}
