import { Box, Code, useDocumentation } from "../../lib"

export const ShorthandExample = () => {
  useDocumentation({})

  return (
    <>
      <Box>
        <Box sh={{ mb: 2 }}>Color</Box>

        <Box sh={{ color: "textPrimary" }}>
          This text will have the primary text color
        </Box>
        <Box sh={{ color: "textSecondary" }}>
          This text will have the secondary text color
        </Box>

        <Code block sh={{ mt: 2 }}>
          {`<Box sh={{ color: "textPrimary" }}>
  This text will have the primary text color
</Box>
<Box sh={{ color: "textSecondary" }}>
  This text will have the secondary text color
</Box>`}
        </Code>
      </Box>

      <Box sh={{ mt: 3 }}>
        <Box sh={{ mb: 2 }}>Shadow</Box>

        <Box sh={{ display: "flex" }}>
          <Box sh={{ m: 2, p: 1, shadow: "xs" }}>shadow: xs</Box>
          <Box sh={{ m: 2, p: 1, shadow: "sm" }}>shadow: sm</Box>
          <Box sh={{ m: 2, p: 1, shadow: "md" }}>shadow: md</Box>
          <Box sh={{ m: 2, p: 1, shadow: "lg" }}>shadow: lg</Box>
          <Box sh={{ m: 2, p: 1, shadow: "xl" }}>shadow: xl</Box>
          <Box sh={{ m: 2, p: 1, shadow: "xxl" }}>shadow: xxl</Box>
        </Box>

        <Code block sh={{ mt: 2 }}>
          {`<Box sh={{ shadow: "xs" }}>
  shadow: xs
</Box>
<Box sh={{ shadow: "sm" }}>
  shadow: sm
</Box>
<Box sh={{ shadow: "md" }}>
  shadow: md
</Box>
<Box sh={{ shadow: "lg" }}>
  shadow: lg
</Box>
<Box sh={{ shadow: "xl" }}>
  shadow: xl
</Box>
<Box sh={{ shadow: "xxl" }}>
  shadow: xxl
</Box>`}
        </Code>
      </Box>
    </>
  )
}
