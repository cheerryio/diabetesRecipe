'use strict'
const fs = require('fs')
const path = require('path')
exports.main = async (event, context) => {
  const categoryList = fs.readdirSync('./图片')
  const map = {
    奶类: 1,
    肉蛋类及大豆类: 2,
    谷薯类: 3,
    蔬菜类: 4,
    油脂类及硬果类: 5,
    水果类: 6
  }
  const data = []
  for (const categoryName of categoryList) {
    const categoryID = map[categoryName]
    const imageNameList = fs.readdirSync(`./图片/${categoryName}`)
    for (let i = 0; i < imageNameList.length; i++) {
      const imageName = imageNameList[i]
      const [name, kilo] = path.parse(imageName).name.split(' ')
      const price = parseInt(kilo.replace('g', ''))
      console.log(path.join(__dirname, '../', `图片/${categoryName}/${imageName}`))
      const res = await uniCloud.uploadFile({
        cloudPath: imageName,
        fileContent: path.join(__dirname, '../', `图片/${categoryName}/${imageName}`)
      }).catch(err => {
        console.log('err: ' + err)
      })
      const thumbImgList = await uniCloud.getTempFileURL({
        fileList: [res.fileID]
      }).catch(err => {
        console.log(err)
      })
      console.log(thumbImgList.fileList[0].tempFileURL)
      data.push({
        categoryID,
        description: '',
        foodID: categoryID * 10000 + i + 1,
        isOnSale: true,
        name,
        price,
        unit: 'g/份',
        thumbImg: thumbImgList.fileList[0].tempFileURL
      })
    }
  }
  const f = fs.openSync('./upload-file/data.json', 'w')
  let result = ''
  for (const d of data) {
    result += JSON.stringify(d) + '\r\n'
  }
  fs.writeFileSync(f, result)
  fs.closeSync(f)

  // 返回数据给客户端
  return event
}
