import { Button, TextField } from "../../index"
import { css } from "@emotion/react"
import { useForm } from "react-hook-form"

export const FormAndValidationExample = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <TextField defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      {/* errors will return when field validation fails  */}
      <TextField
        {...register("exampleRequired", {
          required: "This field is required",
        })}
        error={!!errors.exampleRequired}
        helperText={errors.exampleRequired?.message}
      />

      <Button css={css({ marginTop: 8 })} type="submit">
        Submit
      </Button>
    </form>
  )
}
