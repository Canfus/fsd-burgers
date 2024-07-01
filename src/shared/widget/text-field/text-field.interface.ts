import type {
  UseControllerProps,
  FieldValues,
  FieldPath,
  Control,
} from 'react-hook-form';

import type { Input } from '../../ui/input';

export type TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<
    React.ComponentPropsWithoutRef<typeof Input>,
    'value' | 'onChange' | 'onPointerEnterCapture' | 'onPointerLeaveCapture'
  > & {
    control: Control<TFieldValues>;
  };
