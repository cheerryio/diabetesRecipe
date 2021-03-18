'use strict'
const fs = require('fs')
const path = require('path')
exports.main = async (event, context) => {
	const {cookie,token}=event;
	// 清空food表中所有记录
	await uniCloud.database().collection("food").remove();

	// 清空所有云文件
	let deleteResult=await uniCloud.callFunction({
		name:"delete-file",
		data:{
			cookie,
			token
		}
	}).catch(err=>{
		console.error(err);
		throw new Error("cookie已失效");
	})

	const categoryList=fs.readdirSync("./upload-file/图片")
	const map={
		"奶类":1,
		"肉蛋类及大豆类":2,
		"谷薯类":3,
		"蔬菜类":4,
		"油脂类及硬果类":5,
		"水果类":6
	}
	let data=[]
	for(const categoryName of categoryList){
		let categoryID=map[categoryName];
		let imageNameList=fs.readdirSync(`./upload-file/图片/${categoryName}`)
		for(let i=0;i<imageNameList.length;i++){
			let imageName=imageNameList[i];
			let [name,kilo]=path.parse(imageName).name.split(" ")
			let price=parseInt(kilo.replace("g",""))
			console.log(path.join(__dirname,`图片/${categoryName}/${imageName}`))
			let res=await uniCloud.uploadFile({
				cloudPath:imageName,
				fileContent:path.join(__dirname,`图片/${categoryName}/${imageName}`)
			}).catch(err=>{
				console.error("err: "+err)
			})
			let thumbImgList=await uniCloud.getTempFileURL({
				fileList:[res.fileID]
			}).catch(err=>{
				console.error(err)
			})
			console.log(thumbImgList.fileList[0].tempFileURL)
			data.push({
				categoryID,
				description:"",
				foodID:categoryID*10000+i+1,
				isOnSale:true,
				name,
				price,
				unit:"g/份",
				thumbImg:thumbImgList.fileList[0].tempFileURL,
			})
		}
	}
	let result="";
	for(let item of data){
		result+=JSON.stringify(item)+"/r/n";
		uniCloud.database().collection("food").add(item);
	}
	fs.writeFileSync("./upload-file/data.json",result);

  // 返回数据给客户端
  return event
}
