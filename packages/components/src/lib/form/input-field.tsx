import { Field, FieldProps } from 'formik';
import { ComponentProps, FunctionComponent } from 'react';
import { Input } from '../base/ui/input';

const InputField: FunctionComponent<ComponentProps<'input'>> = ({
  name,
  ...props
}) => {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors }, meta }: FieldProps) => (
        <div className="flex flex-col gap-2">
          <Input {...props} {...field} />

          {meta.touched && meta.error && (
            <div className="text-red-600 text-sm">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export { InputField };
