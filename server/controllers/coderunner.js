const run = require("../core/python")

const coderunner = (req,res) => {
        const {code, args} = req.body
        const argValues = args.map(arg => JSON.stringify(arg))
        const finalCode = code + `\n\nprint(solution(${argValues.join(",")}))`
        run(finalCode)
        .then((output) => {
            return res.status(200).json({msg: "Success output", output})
        })
        .catch(error => {
            return res.status(200).json({msg: "Error in getting output", error})
        })
}

module.exports = {coderunner}