'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
	const {uid,roleList} = event;
	const res = await uniID.bindRole({
		uid,
		roleList
	})
	
	//返回数据给客户端
	return res
};
