export type Field = { value: FieldType, target: string, label: string, type: FieldTypeLiteral }
export type FieldType = string | number | boolean | FieldType[];
export type FieldTypeLiteral = "string" | "number" | "boolean" | "array";

export type FieldTypeOption = { value: FieldTypeLiteral, label: string }
export type FieldTypeIcons = { [key in FieldTypeLiteral]: JSX.Element }
export type FieldTypeDefault = { [key in FieldTypeLiteral]: FieldType }
