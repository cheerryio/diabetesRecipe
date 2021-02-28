'use strict';
const uniID = require('uni-id')
exports.main = async function(event,context) {
    const {
        username,
        password
    } = event
    // username、password验证是否合法的逻辑
    const res = await uniID.register({
        username,
        password
    })
		console.log(res)
		const res2=await uniID.bindRole({
			uid:res.uid,
			roleList:["admin"],
			reset:true,
		})
    return res2
}
