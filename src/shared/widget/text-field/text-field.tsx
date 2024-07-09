import { useController, type FieldValues } from 'react-hook-form';
import { memo } from 'react';

import { Input } from '../../ui';
import type { TextFieldProps } from './text-field.interface';

const InnerComponent = <TFieldValues extends FieldValues = FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...props
}: TextFieldProps<TFieldValues>) => {
  const { field, fieldState } = useController({
    name,
    rules,
    shouldUnregister,
    disabled,
    control,
    defaultValue,
  });

  const { invalid, error } = fieldState;

  return (
    <Input
      {...props}
      {...field}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      error={invalid}
      errorText={error?.message}
    />
  );
};

export const TextField = memo(InnerComponent) as typeof InnerComponent;
