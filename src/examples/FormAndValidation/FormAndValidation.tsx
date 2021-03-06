/* eslint-disable no-console */

import Box from "@material-ui/core/Box";
import Button from "../../../lib/components/Button";
import TextField from "../../../lib/components/TextField";
import { useForm } from "react-hook-form";

const FormAndValidation = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{
    example: string;
    exampleRequired: string;
  }>({ defaultValues: { example: "Test" } });
  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <Box sx={{ maxWidth: (theme) => theme.spacing(40) }}>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <TextField label="Field not required" {...register("example")} />

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        <TextField
          label="Field required"
          required
          {...register("exampleRequired", {
            required: "This field is required",
          })}
          error={!!errors.exampleRequired}
          helperText={errors.exampleRequired?.message}
        />

        <Button sx={{ mt: 1 }} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FormAndValidation;
