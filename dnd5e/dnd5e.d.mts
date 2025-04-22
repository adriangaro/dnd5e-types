import * as _dataModels from "@dnd5e/module/data/_module.mjs";
import * as _documents from "@dnd5e/module/documents/_module.mjs";
import * as _applications from "@dnd5e/module/applications/_module.mjs";
import * as _utils from "@dnd5e/module/utils.mjs";
import * as _dice from "@dnd5e/module/dice/_module.mjs";
import * as _canvas from "@dnd5e/module/canvas/_module.mjs";

import * as _fvttUtils from 'fvtt-types/utils';


declare global {
  export import fvttUtils = _fvttUtils;

  namespace dnd5e {
    namespace types {
      export import canvas = _canvas;
      export type BasicRollOptions = {
        target?: number | undefined;
      }

      export type BasicRollConfiguration = {
        parts?: string[] | undefined;
        data?: object;
        situational?: boolean | undefined;
        options?: BasicRollOptions | undefined;
      }

      export type BasicRollProcessConfiguration = {
        rolls: BasicRollConfiguration[];
        evaluate?: boolean | undefined;
        event?: Event | undefined;
        hookNames?: string[] | undefined;
        subject?: Document | undefined;
        target?: number | undefined;
      }

      export type CriticalDamageConfiguration = {
        allow?: boolean | undefined;
        multiplier?: number | undefined;
        bonusDice?: number | undefined;
        bonusDamage?: string | undefined;
        multiplyDice?: boolean | undefined;
        multiplyNumeric?: boolean | undefined;
        powerfulCritical?: string | undefined;
      }

      export type DamageRollOptions = fvttUtils.PrettifyType<
        fvttUtils.SimpleMerge<
          BasicRollOptions,
          {
            isCritical?: boolean | undefined;
            critical?: CriticalDamageConfiguration | undefined;
            properties?: string[] | undefined;
            type?: string | undefined;
            types?: string[] | undefined;
          }
        >
      >
      export type DamageRollConfiguration = fvttUtils.PrettifyType<
        fvttUtils.SimpleMerge<
          BasicRollConfiguration,
          {
            options?: DamageRollOptions;
          }
        >
      >

      export type DamageRollProcessConfiguration = fvttUtils.PrettifyType<
        fvttUtils.SimpleMerge<
          BasicRollProcessConfiguration,
          {
            rolls: DamageRollConfiguration[];
            critical?: CriticalDamageConfiguration | undefined;
            isCritical?: boolean | undefined;
            scaling?: number | undefined;
          }
        >
      >
      export type RollBuildConfigCallback = (process: BasicRollProcessConfiguration, config: BasicRollConfiguration, formData?: FormDataExtended, index?: number) => any

      export type BasicRollConfigurationDialogRenderOptions = {
        dice?: {
          max?: number | undefined;
          denominations?: Set<string> | undefined;
        } | undefined;
      }

      export type BasicRollConfigurationDialogOptions = {
        rollType: typeof dnd5e.dice.BasicRoll;
        default?: {
          rollMode?: number | undefined;
        } | undefined;
        buildConfig?: RollBuildConfigCallback | undefined;
        rendering?: BasicRollConfigurationDialogRenderOptions | undefined;
      }

      export type BasicRollDialogConfiguration = {
        configure?: boolean | undefined;
        applicationClass?: typeof dnd5e.applications.dice.RollConfigurationDialog | undefined;
        options?: BasicRollConfigurationDialogOptions;
      }

      export type BasicRollMessageConfiguration = {
        create?: boolean | undefined;
        document?: ChatMessage5e;
        rollMode?: string | undefined;
        data?: object;
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

      export type UsesRecoveryData = {
        period: string;
        type: string;
        formula: string;
      }

      export type UsesData = {
        spent: number;
        max: string;
        recovery: UsesRecoveryData[];
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

      export type CombatRecoveryResults = {
        actor: object;
        item: object[];
        rolls: dnd5e.dice.BasicRoll[];
      }

      export type RestConfiguration = {
        type: string;
        dialog: boolean;
        chat: boolean;
        duration: number;
        newDay: boolean;
        advanceBastionTurn?: boolean | undefined;
        advanceTime?: boolean | undefined;
        autoHD?: boolean | undefined;
        autoHDThreshold?: number | undefined;
      }

      export type RestResult = {
        type: string;
        clone: Actor.Implementation;
        deltas: {
          hitPoints: number;
          hitDice: number;
        };
        newDay: boolean;
        rolls: Roll[];
        updateData: object;
        updateItems: object[];
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
      export type DeepMerge<T, U> =
        // --- Handle `never` cases first ---
        IsNever<T> extends true
        ? (IsNever<U> extends true ? never : U) // If T=never, result is U (unless U=never, then result is never)
        : IsNever<U> extends true
        ? T // If T!=never and U=never, result is T
        // --- Neither is `never`, proceed with original merging logic ---
        : PrettifyType< // Apply Prettify to the outcome of the logic below
          IsArray<T> extends true // Check T is Array
          ? IsArray<U> extends true // Check U is Array
          ? Array<DeepMerge<InferArrayElement<T>, InferArrayElement<U>>> // Both Arrays: Merge elements recursively
          : U // T is Array, U is not: U overwrites T
          // T is not Array. Check U.
          : fvttUtils.IsObject<U> extends true // Check U is Object
          ? fvttUtils.IsObject<T> extends true // Check T is Object
          // Both T and U are Objects: merge them
          ? { // Combine properties
            // Properties from T not in U
            [K in Exclude<keyof T, keyof U>]: T[K];
          } & {
            // Properties from U not in T
            [K in Exclude<keyof U, keyof T>]: U[K];
          } & {
            // Properties in both T and U: recursively DeepMerge them
            [K in Extract<keyof T, keyof U>]: DeepMerge<T[K], U[K]>;
          }
          : U // T is not Object, U is Object: U overwrites T
          // U is not an Object (and not an Array)
          : U // U overwrites T
        >;

      /**
       * Helper type to recursively split a dot-separated string path into a tuple of keys.
       * @example SplitPath<'a.b.c'> // Result: ['a', 'b', 'c']
       * @example SplitPath<'a'> // Result: ['a']
       * @example SplitPath<''> // Result: []
       */
      type SplitPath<S extends string> =
        S extends `${infer Key}.${infer Rest}`
        ? [Key, ...SplitPath<Rest>]
        : S extends "" ? [] : [S];

      /**
       * Recursively navigates a type `T` using a tuple of path segments `TPath`.
       * Returns the type at the end of the path or `never`.
       */
      type NavigatePath<T, TPath extends string[]> =
        // Base Case 1: If T becomes null or undefined before path ends, the path is invalid.
        T extends undefined | null
        ? TPath extends [] ? T : never // Return T if path is also done, else never
        : TPath extends []
        // Base Case 2: Path is exhausted, return the current type T.
        ? T
        : TPath extends [infer CurrentKey, ...infer RemainingKeys]
        // Recursive Step: Check if CurrentKey is a valid key of T and RemainingKeys is string[].
        ? CurrentKey extends keyof T
        ? RemainingKeys extends string[]
        // Recurse with the type T[CurrentKey] and the remaining path segments.
        ? NavigatePath<T[CurrentKey], RemainingKeys>
        : never // Should not happen if SplitPath is correct
        : never // CurrentKey is not a valid key in T for the remaining path.
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

      /**
 * Helper type to determine if a type T should be recursed into for path generation.
 * We stop at primitives, arrays, null, undefined, Dates, RegExps, etc.
 * We only continue for plain objects.
 */
      type ShouldRecurse<T> =
        T extends string | number | boolean | bigint | symbol | null | undefined | any[] | Date | RegExp ? false
        : T extends object ? true
        : false;

      /**
      * Recursive type to generate all possible dot-separated paths for a type T.
      * K represents the keys of the current level of T.
      */
      type GeneratePaths<T, Depth = 10> =
        // Check if T is an object we should recurse into
        ShouldRecurse<T> extends true
        ? { // Use mapped type to iterate over keys K of T
          [K in keyof T]: K extends string | number // Only consider string/number keys
          ? // Path Option 1: The key K itself
          `${K}` |
          // Path Option 2: Key K followed by a dot and paths from the nested type T[K]
          `${K}.${GeneratePaths<T[K]>}`
          : never // Ignore symbol keys
        }[keyof T] // Extract the union of all generated paths for keys K
        : never; // T is not an object to recurse into, so stop generating paths from here

      /**
      * Generates a union type of all valid dot-separated string paths for a given object type `T`.
      *
      * @template T The object type to generate paths for.
      * @returns A union of string literal types representing valid paths, or `never` if T is not an object.
      *
      * @example
      * type MyType = { user: { name: string; age: number }, id: string };
      * type Path = ValidPath<MyType>;
      * // Path = "id" | "user" | "user.name" | "user.age"
      *
      * function getValue(obj: MyType, path: ValidPath<MyType>) { ... }
      * getValue(obj, "user.name"); // OK
      * getValue(obj, "user.id"); // Error: Argument of type '"user.id"' is not assignable to parameter of type '"id" | "user" | "user.name" | "user.age"'
      */
      export type ValidPath<T> = GeneratePaths<T>;

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
        T extends foundry.data.fields.DataSchema,
        U extends foundry.data.fields.DataSchema,
      > = {
        [K in keyof T | keyof U]:
        K extends keyof T
        ? K extends keyof U
        // --- Key K exists in both T and U (Conflict/Merge Case) ---
        ? IsSchemaField<T[K]> extends true
        ? IsSchemaField<U[K]> extends true
        // --- Both are SchemaFields: Perform deep merge with intersection ---
        ? T[K] extends foundry.data.fields.SchemaField<any, any, any, any, any> // Type guard for inference
        ? U[K] extends foundry.data.fields.SchemaField<any, any, any, any, any> // Type guard for inference
        // Use the reconstruction helper that performs intersection
        ? ReconstructSchemaFieldWithIntersection<
          T[K], // Pass original T[K] to extract its types
          U[K], // Pass original U[K] to extract its types
          MergeSchemas<ExtractSchema<T[K]>, ExtractSchema<U[K]>> // Pass merged inner schema
        >
        : U[K] // Should be unreachable
        : U[K] // Should be unreachable
        // --- T[K] is SchemaField, U[K] is not -> Use U[K] (Rule 2.b) ---
        : U[K]
        // --- T[K] is not a SchemaField -> Use U[K] (Rule 2.b) ---
        : U[K]
        // --- Key K exists only in T ---
        : T[K]
        // --- Key K exists only in U ---
        : K extends keyof U
        ? U[K]
        : never;
      } & {}; // Clean up display

      export type StrictSimpleMerge<Target, Override extends object> = Omit<Target, keyof fvttUtils.RemoveIndexSignatures<Override>> & Override;
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

  namespace CONFIG {
    const DND5E: dnd5e.types.DND5EConfig;
  }
}


export default dnd5e;