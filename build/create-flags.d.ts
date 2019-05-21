import React from "react";
import { Computable } from "deep-computed";
import { KeyPath, KeyPathValue } from "useful-types";
export declare type ProviderProps<T> = {
    flags: Computable<T>;
};
declare type RenderConsumer<T> = {
    name: KeyPath<T>;
    render(flags: T): React.ReactNode;
    fallbackRender?(flags: T): React.ReactNode;
};
declare type ChildConsumer<T> = {
    name: KeyPath<T>;
    children: any;
    fallbackRender?(flags: T): React.ReactNode;
};
declare type ComponentConsumer<T> = {
    name: KeyPath<T>;
    component: React.ComponentType<{
        flags: T;
    }>;
    fallbackComponent?: React.ComponentType<{
        flags: T;
    }>;
};
export declare type ConsumerProps<T> = RenderConsumer<T> | ChildConsumer<T> | ComponentConsumer<T>;
export declare type CreateFlags<T> = {
    FlagsProvider: React.ComponentType<ProviderProps<T>>;
    Flag: React.ComponentType<ConsumerProps<T>>;
    useFlag<KP extends KeyPath<T>>(keyPath: KP): KeyPathValue<T, KP>;
    useFlags(): T;
};
export declare function createFlags<T>(): CreateFlags<T>;
export default createFlags;