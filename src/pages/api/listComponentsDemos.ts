import fg from "fast-glob"
import { NextApiHandler } from "next"
import { sortBy } from "lodash"

const listComponentDemos = () =>
  fg("**/*.demo.tsx", { objectMode: true }).then((res) =>
    res.map((d) => d.name.split(".demo.").slice(0, -1).join("."))
  )

const listComponentsDemos: NextApiHandler = async (req, res) => {
  res.send(sortBy((await listComponentDemos()) || []))
}

// noinspection JSUnusedGlobalSymbols
export default listComponentsDemos
