const mongoose = require('mongoose')

const authSchema= new mongoose.Schema(
    {
        email:{type: String , unique: true , required: true},
        password:{type: String , required: true},
    },
    // { collection:"userAuth" , versionKey:false}
    {versionKey:false}
)
// agr authSchema ma collection use kar tay hai to thk hai . agr nahi use kar na to nichay mongoose.model may jo collection name hai like "userAuth" to per is ka sath "s" ka use kar hoga. e.g "userAuths"
const Auth = mongoose.model("userAuths" , authSchema)
module.exports = Auth