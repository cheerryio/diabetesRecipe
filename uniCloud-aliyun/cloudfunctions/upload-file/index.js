'use strict'
const fs = require('fs')
const path = require('path')
exports.main = async (event, context) => {
	const {cookie,token,uploadCategoryType}=event;

	// 清空food表中所有记录
	await uniCloud.database().collection("food").remove();

	const categoryList=fs.readdirSync("./upload-file/生食")
	const rawFoodMap={
		"奶类":1,
		"肉蛋类及大豆类":2,
		"谷薯类":3,
		"蔬菜类":4,
		"油脂类及硬果类":5,
		"水果类":6
	}
	let rawFoodList=[]
	for(const categoryName of categoryList){
		let categoryID=rawFoodMap[categoryName];
		let imageNameList=fs.readdirSync(`./upload-file/生食/${categoryName}`)
		for(let i=0;i<imageNameList.length;i++){
			let imageName=imageNameList[i];
			let [name,kilo]=path.parse(imageName).name.split(" ")
			let price=parseInt(kilo.replace("g",""))
			console.log(path.join(__dirname,`生食/${categoryName}/${imageName}`))
			let res=await uniCloud.uploadFile({
				cloudPath:imageName,
				fileContent:path.join(__dirname,`生食/${categoryName}/${imageName}`)
			}).catch(err=>{
				console.error("err: "+err)
			})
			let thumbImgList=await uniCloud.getTempFileURL({
				fileList:[res.fileID]
			}).catch(err=>{
				console.error(err)
			})
			console.log(thumbImgList.fileList[0].tempFileURL)
			rawFoodList.push({
				categoryID,
				description:"",
				foodID:categoryID*10000+i+1,
				isOnSale:true,
				name,
				price,
				unit:"g/份",
				thumbImg:thumbImgList.fileList[0].tempFileURL,
				thumbImgFileID:res.fileID
			})
		}
	}
	let rawFoodResult="";
	for(let item of rawFoodList){
		rawFoodResult+=JSON.stringify(item)+"/r/n";
		uniCloud.database().collection("food").add(item);
	}
	fs.writeFileSync("./upload-file/data.json",rawFoodResult);

	const cookedFoodMap={
		"主食类":7,
		"肉蛋类":8,
		"大豆及制品":9,
		"油脂类":10,
		"坚果类":11,
		"饮料冷饮":12,
		"零食点心类":13
	}
	let cookedFoodData=require(path.join(__dirname,"熟食","cookedFood.json")).Sheet1;
	let cookedFoodList=[];
	let lastCategoryID=7,currentCategoryID=7;
	let count=0;
	for(let item of cookedFoodData){
		const {name,categoryName,carbohydrates,protein,fat}=item;
		lastCategoryID=currentCategoryID;
		currentCategoryID=cookedFoodMap[categoryName];
		if(lastCategoryID == currentCategoryID) count+=1;
		else count=1;

		let imageName=`${name}.jpg`;
		console.log(path.join(__dirname,`熟食/${categoryName}图片/${imageName}`));
		let res;
		try{
			res=await uniCloud.uploadFile({
				cloudPath:imageName,
				fileContent:path.join(__dirname,`熟食/${categoryName}图片/${imageName}`)
			}).catch(err=>{
				console.error("err: "+err);
				throw new Error("图片不存在")
			})
		}catch(err){
			continue;
		}
		let thumbImgList=await uniCloud.getTempFileURL({
			fileList:[res.fileID]
		}).catch(err=>{
			console.error(err)
		})

		console.log(thumbImgList.fileList[0].tempFileURL);

		let d={
			categoryID:currentCategoryID,
			description:"",
			foodID:currentCategoryID*10000+count,
			isOnSale:true,
			name:item.name,
			kilo:100,
			unit:"g/份",
			nutrientContent:{
				carbohydrates:Number(carbohydrates),
				carbohydratesUnit:"g/100g",
				protein:Number(protein),
				proteinUnit:"g/100g",
				fat:Number(fat),
				fatUnit:"g/100g"
			},
			thumbImg:thumbImgList.fileList[0].tempFileURL,
			thumbImgFileID:res.fileID
		}
		cookedFoodList.push(d);
	}

	let cookedFoodResult="";
	for(let cookedFood of cookedFoodList){
		cookedFoodResult+=JSON.stringify(cookedFood)+"/r/n";
		uniCloud.database().collection("food").add(cookedFood);
	}
	fs.writeFileSync("./upload-file/cookedFoodDBData.json",cookedFoodResult);

  // 返回数据给客户端
  return event
}
