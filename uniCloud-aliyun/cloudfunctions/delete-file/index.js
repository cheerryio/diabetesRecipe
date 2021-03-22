'use strict';
exports.main = async (event) => {
	const {cookie,token}=event;
	let url="https://unicloud.dcloud.net.cn/unicloud/api/file/list?appid=&provider=aliyun&spaceId=ad62b9d2-1c41-4b81-be63-a1209cbdb4aa&pageSize=20&page="
	const res1=await uniCloud.httpclient.request(url+"1",{
		method:"GET",
		headers:{
			cookie,
			token,
		},
		timeout:50000
	})
	let data=JSON.parse(res1.data.toString()).data;
	let fileList=[]
	for(let page=1;page<=data.last_page;page++){
		let res=await uniCloud.httpclient.request(url+page.toString(),{
			method:"GET",
			headers:{
				cookie,
				token,
			},
			timeout:50000
		})
		let data=JSON.parse(res.data.toString()).data;
		data.files.forEach(file=>{
			fileList.push(file.id)
		})

		const res2=await uniCloud.deleteFile({
			fileList,
		})
		fileList=[]

		console.log(`get fileList to delete, page ${page} finish`)
	}

	return 1;
};
