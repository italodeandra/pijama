import { Box, Button, Field, useDocumentation } from "../../lib"
import { Code } from "../components"
import { useForm } from "react-hook-form"

const example = `const FormAndValidationExample = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    <Box sh={{ maxW: 40 }}>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <Field
          label="Field not required"
          defaultValue="test"
          {...register("example")}
        />

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        <Field
          label="Field required"
          required
          {...register("exampleRequired", {
            required: "This field is required",
          })}
          error={!!errors.exampleRequired}
          helperText={errors.exampleRequired?.message}
        />

        <Button sh={{ mt: 1 }} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  )
}`

export const FormAndValidationExample = () => {
  useDocumentation({}, () => example)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    <Box>
      <Box sh={{ maxW: 40 }}>
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <Field
            defaultValue="test"
            label="Field not required"
            {...register("example")}
          />

          {/* include validation with required or other standard HTML validation rules */}
          {/* errors will return when field validation fails  */}
          <Field
            label="Field required"
            required
            {...register("exampleRequired", {
              required: "This field is required",
            })}
            error={!!errors.exampleRequired}
            helperText={errors.exampleRequired?.message}
          />

          <Button sh={{ mt: 1 }} type="submit">
            Submit
          </Button>
        </form>
      </Box>

      <Code>{example}</Code>
    </Box>
  )
}
