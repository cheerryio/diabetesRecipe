'use strict';
exports.main = async (event) => {
	let url="https://unicloud.dcloud.net.cn/unicloud/api/file/list?appid=&provider=aliyun&spaceId=ad62b9d2-1c41-4b81-be63-a1209cbdb4aa&pageSize=20&page="
	const res1=await uniCloud.httpclient.request(url+"1",{
		method:"GET",
		headers:{
			cookie:"email=2221619190@qq.com; __uni__uid=rBAAsWA6Ua+L8mbTIH1yAg==; iqx__user_login=5OPK1tXkxM7XwMeZq6akoKaWnaevk6Hj05jR6OGTqp3Vxenp2tDkxsjLpK2mp6eVyKvbxJSmmdChqamop9OcyK6tl8LYlZ6h26qjkKuS2d_awb6dk6Cjsqiqo5Ggkcu3wb6dr9no4uDe0J-akqaWi7jb0M7d8OeSvcSFlaakk5ySudPcr6itj-ibmJ-WpNHizs_F3ta92OSUmamtkZSogpK5wci_u5yF0N_hyIG5x83Z6J2SstjX0-PbkpmqkJqcraeko56WnaaWtsLYw9zXqKmlpp6Ymg..; vue_admin_template_token=e9d8443c8daf0c7adc0f9a60f890f177; Hm_lvt_d88cf351a1a0af968ec466035e9c18f1=1614685016,1614749434,1614775122,1615600234; SET_IS_TCB=0; UNI-UIN=undefined; NAVIGATE=; HAVE_HOSTING_SERVICE=1; TCB_SPACE_TIME={%22start%22:%222021-02-28%2000:00:00%22%2C%22end%22:%222021-03-28%2000:00:00%22}; dcloud_session=eyJpdiI6IlRvYlwvczFVY1RxV2hcL1ZzRDRuNDFaQT09IiwidmFsdWUiOiJUdHFCMkt3d2FMaDd5SVQ5aVhrQWFjbVNEbDdJQnBXc1V2VElFREdqc1MxemFVUUVxM1JJZzY2MlhMUko0UkpyYzlFQkJNekdWcW43Q2lSNzE4aFJWZz09IiwibWFjIjoiMmYxZDBjZmUzNjM2YmMzNDAxOTFjNmJiMjI0NzY1MjdjNTdmOGVhNDQxMTUxMzNiM2Q0MDQyNDU4N2QyN2I0YiJ9; SPACE_ID=ad62b9d2-1c41-4b81-be63-a1209cbdb4aa; SPACE_VAL=diabetes-alicloud%EF%BC%88%E9%98%BF%E9%87%8C%E4%BA%91%EF%BC%89; APP_ID=; sidebarStatus=0; dev_session=eyJpdiI6IlA4WFJDZXFGY0xYdVplQnJab25SZFE9PSIsInZhbHVlIjoieDRJWkVqTGJ6MTlwUFRTMUtoaGw2K0s2aWowMStaZUxNYkZpUzcxdHh6amlaajdTYzlpMFZZRWNvSlZ0Yld0TnZVVzU2XC9VdjVXUG5SK252QVc4S0Z3PT0iLCJtYWMiOiJkM2Q2MTk3Yzg0M2EzMmI2YjYyZWMwNmY5MGU2NDc1OTIzY2ZlM2NjYmJhNzk0MzdlZTkyMDc4NmExNDk1YWU4In0%3D; Hm_lpvt_d88cf351a1a0af968ec466035e9c18f1=1615605115",
			token:"e9d8443c8daf0c7adc0f9a60f890f177"
		}
	})
	let data=JSON.parse(res1.data.toString()).data;
	let fileList=[]
	for(let page=1;page<=data.last_page;page++){
		let res=await uniCloud.httpclient.request(url+page.toString(),{
			method:"GET",
			headers:{
				cookie:"email=2221619190@qq.com; __uni__uid=rBAAsWA6Ua+L8mbTIH1yAg==; iqx__user_login=5OPK1tXkxM7XwMeZq6akoKaWnaevk6Hj05jR6OGTqp3Vxenp2tDkxsjLpK2mp6eVyKvbxJSmmdChqamop9OcyK6tl8LYlZ6h26qjkKuS2d_awb6dk6Cjsqiqo5Ggkcu3wb6dr9no4uDe0J-akqaWi7jb0M7d8OeSvcSFlaakk5ySudPcr6itj-ibmJ-WpNHizs_F3ta92OSUmamtkZSogpK5wci_u5yF0N_hyIG5x83Z6J2SstjX0-PbkpmqkJqcraeko56WnaaWtsLYw9zXqKmlpp6Ymg..; vue_admin_template_token=e9d8443c8daf0c7adc0f9a60f890f177; Hm_lvt_d88cf351a1a0af968ec466035e9c18f1=1614685016,1614749434,1614775122,1615600234; SET_IS_TCB=0; UNI-UIN=undefined; NAVIGATE=; HAVE_HOSTING_SERVICE=1; TCB_SPACE_TIME={%22start%22:%222021-02-28%2000:00:00%22%2C%22end%22:%222021-03-28%2000:00:00%22}; dcloud_session=eyJpdiI6IlRvYlwvczFVY1RxV2hcL1ZzRDRuNDFaQT09IiwidmFsdWUiOiJUdHFCMkt3d2FMaDd5SVQ5aVhrQWFjbVNEbDdJQnBXc1V2VElFREdqc1MxemFVUUVxM1JJZzY2MlhMUko0UkpyYzlFQkJNekdWcW43Q2lSNzE4aFJWZz09IiwibWFjIjoiMmYxZDBjZmUzNjM2YmMzNDAxOTFjNmJiMjI0NzY1MjdjNTdmOGVhNDQxMTUxMzNiM2Q0MDQyNDU4N2QyN2I0YiJ9; SPACE_ID=ad62b9d2-1c41-4b81-be63-a1209cbdb4aa; SPACE_VAL=diabetes-alicloud%EF%BC%88%E9%98%BF%E9%87%8C%E4%BA%91%EF%BC%89; APP_ID=; sidebarStatus=0; dev_session=eyJpdiI6IlA4WFJDZXFGY0xYdVplQnJab25SZFE9PSIsInZhbHVlIjoieDRJWkVqTGJ6MTlwUFRTMUtoaGw2K0s2aWowMStaZUxNYkZpUzcxdHh6amlaajdTYzlpMFZZRWNvSlZ0Yld0TnZVVzU2XC9VdjVXUG5SK252QVc4S0Z3PT0iLCJtYWMiOiJkM2Q2MTk3Yzg0M2EzMmI2YjYyZWMwNmY5MGU2NDc1OTIzY2ZlM2NjYmJhNzk0MzdlZTkyMDc4NmExNDk1YWU4In0%3D; Hm_lpvt_d88cf351a1a0af968ec466035e9c18f1=1615605115",
				token:"e9d8443c8daf0c7adc0f9a60f890f177"
			}
		})
		let data=JSON.parse(res.data.toString()).data;
		data.files.forEach(file=>{
			fileList.push(file.id)
		})

		console.log(`get page ${page} finish`)
	}

	const res2=await uniCloud.deleteFile({
		fileList,
	})

	return 1;
};
