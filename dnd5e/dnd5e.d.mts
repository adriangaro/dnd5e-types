import * as _dataModels from "@dnd5e/module/data/_module.mjs";
import * as _documents from "@dnd5e/module/documents/_module.mjs";
import * as _applications from "@dnd5e/module/applications/_module.mjs";
import * as _utils from "@dnd5e/module/utils.mjs";
import * as _dice from "@dnd5e/module/dice/_module.mjs";
import * as _canvas from "@dnd5e/module/canvas/_module.mjs";

import * as _fvttUtils from 'fvtt-types/utils';

import '@dnd5e/module/types/_module.mjs';

declare global {
  export import fvttUtils = _fvttUtils;

  namespace dnd5e {
    namespace types {
      export import canvas = _canvas;
      export interface FormSelectOption<T extends string = string> {
        value: T;
        label: string;
        group?: string;
        disabled?: boolean;
        selected?: boolean;
        rule?: boolean;
      }

      export type FavoriteData5e = {
        img: string;
        title: string;
        subtitle?: string | string[] | undefined;
        value?: number | undefined;
        quantity?: number | undefined;
        modifier?: string | number | undefined;
        passive?: number | undefined;
        range?: {
          value?: string,
          long?: string | null
        }
        save?: {
          ability?: string,
          dc?: string
        },
        uses?: {
          value?: number,
          max?: number,
          name?: string
        }
        toggle?: boolean;
        suppressed?: boolean | undefined;
      }

      export type CompendiumBrowserFilterDefinition = Map<string, CompendiumBrowserFilterDefinitionEntry>

      export type CompendiumBrowserFilterDefinitionEntry = {
        label: string;
        type: "boolean" | "range" | "set";
        config: object;
        createFilter?: CompendiumBrowserCreateFilters;
      }
      export type CompendiumBrowserCreateFilters = (
        filters: FilterDescription[],
        value: any,
        definition: CompendiumBrowserFilterDefinitionEntry
      ) => any

      export type FilterDescription = {
        k: string;
        v: any;
        o?: string | undefined;
      }

      type IsAny<T> = 0 extends (1 & T) ? true : false;

      type IsNever<T> = [T] extends [never] ? true : false;
      /**
       * Checks if a type is an array (including readonly arrays/tuples).
       */
      type IsArray<T> = T extends readonly unknown[] ? true : false;

      /**
       * Infers the element type of an array or tuple.
       */
      type InferArrayElement<T> = T extends readonly (infer E)[] ? E : never;

      // --- The DeepMerge Type ---

      /**
       * Recursively merges two types, U into T.
       * - Objects are merged property by property.
       * - Arrays are merged by creating a new array type whose elements are a union of the elements of T's and U's arrays.
       * - Other types from U overwrite types from T.
       */
      export type PrettifyType<T> = {
        [K in keyof T]: T[K];
      } & {};

      /**
       * Utility type to filter out properties of T whose value is 'never'.
       */
      type FilterNever<T> = PrettifyType<{
        [K in keyof T as T[K] extends never ? never : K]: T[K]
      }>;

      export type RemoveIndexSignatures<T> = {
        [K in keyof T as fvttUtils.OmitIndex<K>]: T[K];
      };
      export type DeepMerge<T, U> = 
        // --- Handle top-level `never` cases first ---
        IsNever<U> extends true
        ? never // If U is never, the result is always never.
        : IsNever<T> extends true
        ? U // If T is never (and U is not), the result is U.

        // --- Neither is `never`, proceed with merging logic ---
        : PrettifyType< // Apply Prettify to the outcome
            IsArray<T> extends true // Check if T is an array
            ? IsArray<U> extends true // Check if U is also an array
                ? Array<DeepMerge<InferArrayElement<T>, InferArrayElement<U>>> // Both are arrays: Merge elements recursively
                : U // T is array, U is not: U takes priority

            : fvttUtils.IsObject<T> extends true // Check if T is an object (and not an array)
            ? fvttUtils.IsObject<U> extends true // Check if U is also an object
                // Both T and U are Objects: merge them
                ? { // Combine properties
                    // Properties only in T
                    [K in Exclude<keyof T, keyof U>]: T[K];
                  } & {
                    // Properties only in U
                    [K in Exclude<keyof U, keyof T>]: U[K];
                  } & {
                    // Properties in both T and U: recursively DeepMerge them
                    [K in Extract<keyof T, keyof U>]: DeepMerge<T[K], U[K]>;
                  }
                : U // T is object, U is not: U takes priority

            : U // T is neither array nor object: U takes priority
        >;


      export type ExtractKeys<_T extends object, T = fvttUtils.RemoveIndexSignatures<_T>> = {
        [K in keyof T]:
        [T[K]] extends [never]
        ? never
        : K;
      }[keyof T];

      export type MergeOverrideDefinition<T extends object, U extends object, Ret extends object = fvttUtils.SimpleMerge<
        fvttUtils.RemoveIndexSignatures<T>,
        fvttUtils.RemoveIndexSignatures<U>
      >> = {
          [K in ExtractKeys<Ret>]: Ret[K]
        }

      type IsSchemaField<F> = F extends foundry.data.fields.SchemaField<any, any, any, any, any> ? true : false;

      /**
       * Helper type to extract the inner schema (TFields) from a SchemaField.
       */
      type ExtractSchema<F extends foundry.data.fields.DataField> =
        F extends foundry.data.fields.SchemaField<infer TFields, any, any, any, any> ? TFields : never;

      /**
       * Helper type to extract the options (TOptions) from a SchemaField.
       */
      type ExtractSchemaOptions<F extends foundry.data.fields.DataField> =
        F extends foundry.data.fields.SchemaField<any, infer TOptions, any, any, any> ? TOptions : never;

      // --- NEW: Helpers to extract derived types from DataField ---
      // These work because SchemaField extends DataField<Options, AssignmentType, InitializedType, PersistedType>

      /**
       * Extracts the AssignmentType generic parameter from a DataField.
       */
      type ExtractAssignmentType<F extends foundry.data.fields.DataField<any, any, any, any>> =
        F extends foundry.data.fields.DataField<any, infer A, any, any> ? A : never;

      /**
       * Extracts the InitializedType generic parameter from a DataField.
       */
      type ExtractInitializedType<F extends foundry.data.fields.DataField<any, any, any, any>> =
        F extends foundry.data.fields.DataField<any, any, infer I, any> ? I : never;

      /**
       * Extracts the PersistedType generic parameter from a DataField.
       */
      type ExtractPersistedType<F extends foundry.data.fields.DataField<any, any, any, any>> =
        F extends foundry.data.fields.DataField<any, any, any, infer P> ? P : never;


      /**
       * NEW VERSION: Helper to reconstruct a SchemaField with explicitly intersected derived types.
       * This version takes the original SchemaField types from T and U to extract
       * their potentially custom AssignmentType, InitializedType, and PersistedType.
       */
      type ReconstructSchemaFieldWithIntersection<
        OrigFieldT extends foundry.data.fields.SchemaField<any, any, any, any, any>, // The original T[K]
        OrigFieldU extends foundry.data.fields.SchemaField<any, any, any, any, any>, // The original U[K]
        MergedSchema extends foundry.data.fields.DataSchema                     // The merged inner schema
      > = foundry.data.fields.SchemaField<
        MergedSchema,                                                            // 1. Merged inner schema
        ExtractSchemaOptions<OrigFieldT>,                                        // 2. Options from T[K]
        // --- Explicitly provide intersected derived types ---
        ExtractAssignmentType<OrigFieldT> & ExtractAssignmentType<OrigFieldU>,   // 3. Intersected AssignmentType
        ExtractInitializedType<OrigFieldT> & ExtractInitializedType<OrigFieldU>, // 4. Intersected InitializedType
        ExtractPersistedType<OrigFieldT> & ExtractPersistedType<OrigFieldU>      // 5. Intersected PersistedType
      // We rely on the SchemaField constructor's type signature compatibility.
      // Note: Intersection (&) with null/undefined follows standard TS rules
      // (e.g., (T | null) & T = T; (T | null) & (U | null) = (T & U) | null)
      >;

      /**
       * Merges two Foundry VTT DataSchemas (T and U) according to specific rules,
       * including explicit intersection of derived types for SchemaField conflicts.
       *
       * Rules:
       * 1. Keys present in only one schema are included as is.
       * 2. If a key exists in both schemas:
       * a. If both fields are SchemaFields:
       * - Recursively merge their inner schemas using MergeSchemas.
       * - Use the options object from the field in the *first* schema (T).
       * - Extract AssignmentType, InitializedType, and PersistedType from *both*
       * original SchemaFields (T[K] and U[K]).
       * - Create the new SchemaField using the merged inner schema, options from T[K],
       * and the *literal intersection* (`&`) of the respective derived types,
       * passing them explicitly as generic arguments.
       * b. Otherwise (type mismatch or non-SchemaField conflict):
       * - Use the field definition from the *second* schema (U).
       */

      export type MergeSchemas<
        _T extends foundry.data.fields.DataSchema,
        _U extends foundry.data.fields.DataSchema,
        T extends foundry.data.fields.DataSchema = fvttUtils.RemoveIndexSignatures<_T>,
        U extends foundry.data.fields.DataSchema = fvttUtils.RemoveIndexSignatures<_U>,
      > = { // Apply FilterNever to the result of the mapped type
        // Iterate over all keys present in either T or U
        [K in keyof T | keyof U]:
        // Check if K exists in the overriding schema U first
        K extends keyof U
        // --- Key K exists in U ---
        ? U[K] extends never // Check if the value in U is 'never'
        // If U[K] is 'never', map this key to 'never' so FilterNever removes it.
        ? never
        // If U[K] is not 'never', proceed with merge logic. Check if K also exists in T.
        : K extends keyof T
        // --- Key K exists in both T and U (and U[K] is not never) ---
        ? IsSchemaField<T[K]> extends true
        ? IsSchemaField<U[K]> extends true
        // --- Both T[K] and U[K] are SchemaFields: Perform deep merge ---
        ? T[K] extends foundry.data.fields.SchemaField<any, any, any, any, any> // Type guard for inference
        ? U[K] extends foundry.data.fields.SchemaField<any, any, any, any, any> // Type guard for inference
        ? ReconstructSchemaFieldWithIntersection<
          T[K], // Pass original T[K] to extract its types
          U[K], // Pass original U[K] to extract its types
          MergeSchemas<ExtractSchema<T[K]>, ExtractSchema<U[K]>> // Pass merged inner schema
        >
        : U[K] // Should be unreachable due to IsSchemaField<U[K]> check
        : U[K] // Should be unreachable due to IsSchemaField<T[K]> check
        // --- T[K] is SchemaField, U[K] is not -> Use U[K] (Rule 2.c) ---
        : U[K]
        // --- T[K] is not a SchemaField -> Use U[K] (Rule 2.c) ---
        : U[K]
        // --- Key K exists only in U (and U[K] is not never) ---
        : U[K] // Use the value from U
        // --- Key K exists only in T ---
        : K extends keyof T // Ensure K is actually in T (should always be true here)
        ? T[K] // Use the value from T
        : never; // Should be unreachable because K must be in T or U
      } & {}; // Use '& {}' to clean up the display of the resulting type

      export type StrictSimpleMerge<Target extends object, Override extends object> = Omit<fvttUtils.RemoveIndexSignatures<Target>, keyof fvttUtils.RemoveIndexSignatures<Override>> & fvttUtils.RemoveIndexSignatures<Override>;
      interface FunctionSignature {
        parameters: AnyArray;
        returnType: unknown;
      }

      // May look like a no-op but in actuality strips out everything except properties.
      // This means it removes function signatures, constructor signatures, etc.
      type ToObject<T extends object> = {
        [K in keyof T]: T[K];
      };

      // @ts-expect-error - This is a core type that unfortunately intrinsically has an error.
      // The issue with a type like this is in theory they could overlap and the resulting type
      // could become something like `never` or something ill-behaved.
      // Fortunately this is used to add an overload which can never really conflict
      // and so is pretty safe.
      interface AddSignature<T extends object, Params extends AnyArray, Return> extends T {
        //    ^ Interface 'AddSignature<T, Params, Return>' incorrectly extends interface 'T'.
        //        'AddSignature<T, Params, Return>' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'object'.
        // The above is the suppressed error

        (...args: Params): Return
      }

      // Returns a `FunctionSignature[]`.
      type GetFunctionOverloads<
        T extends AnyFunction,
        Shape extends object = ToObject<T>,
        // This would be the first part to change if you want to change the return type.
        Signatures extends FunctionSignature[] = [],
      > = Shape extends T
        ? Signatures
        : T extends AddSignature<Shape, infer Params, infer Return>
        ? GetFunctionOverloads<
          T,
          AddSignature<Shape, Params, Return>,
          // This would be the second.
          [{ parameters: Params, returnType: Return }, ...Signatures]
        >
        : Signatures

      // This type is written this way intentionally.
      // It does truly allow any function to be assigned to it.
      // However `...args: any[]` can be very type unsafe, this is much safer.
      type AnyFunction = (arg0: never, ...args: never[]) => unknown;

      type AnyArray = readonly unknown[];


      type GetOverloadReturnTypes<T extends AnyFunction> =
        GetFunctionOverloads<T>[number]["returnType"];

      type GetKey<T, K extends string | number | symbol | never> = K extends never ? never : T extends {
        [_K in K]: any
      } ? T[K] : never;

      type GetKeyReturn<T, K extends string | number | symbol | never> = K extends never ? never : T extends {
        [_K in K]: (...args: any[]) => any
      } ? ReturnType<T[K]> : never;

      /** Utility type to find a key in a map based on its value. */
      type FindKeyByValue<Map extends Record<PropertyKey, any>, Value> = {
        [K in keyof Map]: Map[K] extends Value ? K : never
      }[keyof Map];

      type __GetSchemaFromDefine_Never<T extends fvttUtils.AnyConcreteConstructor> =
        T extends ({ defineSchema(): unknown }) ?
        dnd5e.types.GetOverloadReturnTypes<T['defineSchema']> extends infer Schema ?
        (Schema extends foundry.data.fields.DataSchema ? fvttUtils.RemoveIndexSignatures<Schema> : never)
        : never
        : never;

      type __GetSchemaFromInstance_Never<T extends fvttUtils.AnyConcreteConstructor> =
        InstanceType<T> extends { schema: foundry.data.fields.SchemaField<infer S, any, any, any, any> } ?
        fvttUtils.RemoveIndexSignatures<S> extends infer SchemaRemovedSigs ?
        (SchemaRemovedSigs extends foundry.data.fields.DataSchema ? SchemaRemovedSigs : never)
        : never
        : never;

      // --- Usability Check Helper (Checks for any, never, {}) ---
      type IsEmptyObjectType<S> =
        IsAny<S> extends false
        ? ([keyof S] extends [never] ? true : false)
        : false;

      type __IsUnusableSchema<S> =
        IsAny<S> extends true ? true :
        [S] extends [never] ? true :
        IsEmptyObjectType<S> extends true ? true :
        false;

      // --- Internal Computation Logic ---
      // UPDATED: Added constraints to parameters for clarity and robustness
      type __ComputeSchemaCore<
        SchemaInstance extends foundry.data.fields.DataSchema | never,
        SchemaDefine extends foundry.data.fields.DataSchema | never
      > =
        __IsUnusableSchema<SchemaInstance> extends false
        ? SchemaInstance // Use usable instance schema
        : __IsUnusableSchema<SchemaDefine> extends false
        ? SchemaDefine // Use usable define schema
        : {}; // Default to {} if both are unusable

      // --- Public GetSchema Type ---
      /**
       * Gets the specific DataSchema for a Document constructor T.
       * - Prioritizes Instance schema, falls back to static defineSchema.
       * - Discards 'any', 'never', or '{}' results from either source.
       * - Defaults to '{}' if both sources fail or yield unusable schemas.
       * - Removes index signatures from the final result.
       */
      export type GetSchema<
        T extends fvttUtils.AnyConcreteConstructor
      > =
        // Compute the core result first ({}, SpecificSchema_I, or SpecificSchema_D)
        __ComputeSchemaCore<
          __GetSchemaFromInstance_Never<T>,
          __GetSchemaFromDefine_Never<T>
        > extends infer CoreResult extends foundry.data.fields.DataSchema // Assign result to a variable
        // Apply RemoveIndexSignatures to the final computed result
        ? fvttUtils.RemoveIndexSignatures<CoreResult>
        // This branch should logically not be hit
        : {};


      /**
       * Filters a string union `U` to include only those keys `K` that:
       * 1. Exist as keys in the type `T`.
       * 2. Have a value type `T[K]` that extends the target value type `V`.
       *
       * @template T - The target interface or type to inspect keys and values from.
       * @template U - The string union of potential keys to filter. Must extend string | number | symbol (PropertyKey).
       * @template V - The type that the value associated with a key in T must match (or extend).
       */
      type FilterKeysByValue<T, U extends PropertyKey, V> = {
        // 1. Iterate through each key 'K' in the input union 'U'
        [K in U]:
        // 2. Check if 'K' is actually a key of the target type 'T'
        K extends keyof T
        // 3. If 'K' is a key of 'T', check if the type of its value (T[K]) extends the target value type 'V'
        ? T[K] extends V
        // 4. If both conditions are true, keep the key 'K'
        ? K
        // 5. Otherwise (value type doesn't match), discard this key by mapping it to 'never'
        : never
        // 6. If 'K' wasn't even a key of 'T', discard it by mapping it to 'never'
        : never
        // 7. Look up the properties of the mapped type using the original union 'U'.
        // This effectively collects all non-'never' values (the keys we kept) into a final union type.
      }[U];

      /**
       * Helper type to recursively split a dot-separated string path into a tuple of keys.
       * @example SplitPath<'a.b.c'> // Result: ['a', 'b', 'c']
       * @example SplitPath<'a'> // Result: ['a']
       * @example SplitPath<''> // Result: []
       */
      type SplitPath<S extends string> =
        S extends `${infer Key}.${infer Rest}`
        ? [Key extends `${infer N extends number}` ? N : Key, ...SplitPath<Rest>]
        : S extends "" ? [] : [S extends `${infer N extends number}` ? N : S];

      /**
       * Recursively navigates a type `T` using a tuple of path segments `TPath`.
       * Returns the type at the end of the path or `never`.
       */
      type NavigatePath<T, TPath extends (string|number)[]> =
          T extends undefined | null
          ? TPath extends [] ? T : never
          : TPath extends []
          ? T
          : TPath extends [infer CurrentKey, ...infer RemainingKeys]
          ? CurrentKey extends keyof T // This handles string keys for objects AND numeric string keys for arrays/tuples
          ? RemainingKeys extends (string|number)[]
          ? NavigatePath<T[CurrentKey], RemainingKeys> // T[CurrentKey] works for both object properties and array elements
          : never
          : never
          : never;


      /**
       * Utility type to get the type of a property deep within an object `T`
       * using a dot-separated string path `P`.
       *
       * @template T The object type to navigate.
       * @template P The dot-separated string path (e.g., "user.address.street").
       * @returns The type found at the specified path, or `never` if the path is invalid.
       *
       * @example
       * type MyType = { actor: { system: { traits: string[] } }, name: string };
       * type TraitsType = GetTypeFromPath<MyType, 'actor.system.traits'>; // string[]
       * type NameType = GetTypeFromPath<MyType, 'name'>; // string
       * type InvalidPath = GetTypeFromPath<MyType, 'actor.data.value'>; // never
       * type TooDeep = GetTypeFromPath<MyType, 'name.length'>; // never (unless T was string)
       * type RootType = GetTypeFromPath<MyType, ''>; // MyType
       */
      export type GetTypeFromPath<T, P extends string> = NavigatePath<T, SplitPath<P>>;
      type d = {
        a?: {
          b?: {
            c: 3
          }
        },
        d: { c: 2 }[]
      }
      type Schema = {
        id: string;
        config: {
          values: number[]; // Array of numbers
          params: [string, boolean]; // Tuple
          metadata?: { // Optional object
            tags: string[];
          } | null; // Can also be null
        };
      };
      
      type IsExactly<T, U> = (<V>() => V extends T ? true : false) extends (<V>() => V extends U ? true : false)
        ? true
        : false

      type EnsureAnyIfNever<T> = {
        [K in keyof T]: T[K] extends never ? any : T[K]
      }
      export interface DND5EConfig {

      }

      export type DND5EConfigKey = ExtractKeys<DND5EConfig>
    }

    export import dataModels = _dataModels;
    export import documents = _documents;
    export import applications = _applications;
    export import utils = _utils;
    export import dice = _dice;
    export import canvas = _canvas;
  }

  interface CONFIG {
    DND5E: dnd5e.types.DND5EConfig
  }
}


export default dnd5e;