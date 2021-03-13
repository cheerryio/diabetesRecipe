'use strict';
exports.main = async (event) => {
	//event为客户端上传的参数
	//console.log(event,context);
	/*for(let id in tmp){
		let food=tmp[id];
		uniCloud.deleteFile({
			fileList:[tmp[id].thumbImg]
		}).then(result=>console.log(result))
	}*/
	//返回数据给客户端
	return 1;
};
