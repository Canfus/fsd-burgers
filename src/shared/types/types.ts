export type Nil = null | undefined;
export type Nullable<T> = T | null;
export type RenderProp<T> = (props: T) => React.JSX.Element;
