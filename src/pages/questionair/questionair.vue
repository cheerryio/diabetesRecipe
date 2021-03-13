<template>
    <view>
        <button @click="func" value="这...">上传</button>
        <button @click="get_value">获得结果</button>
        <button @click="d_file">删除文件</button>
    </view>
</template>

<script>
import tmp from "./tmp";
export default {
    data() {
        return {
            food_categary_name: [
                "",
                "奶类",
                "肉蛋类及大豆类",
                "谷薯类",
                "蔬菜类",
                "油脂类及硬果类",
                "水果类",
            ],
        };
    },

    methods: {
        func() {
            for (let id in tmp) {
                let food = tmp[id];
                if (food.thumbImg) continue;
                uniCloud
                    .uploadFile({
                        filePath: "@/static/图片/奶类/奶粉 20g.JPG",
                        cloudPath: "奶类_奶粉.jpg",
                        onUploadProgcess: (e) => {
                            console.log(e);
                        },
                    })
                    .then((result) => {
                        if (result["success"] == true) {
                            tmp[id].thumbImg = result.fileID;
                        } else {
                            console.log("food upload failed", food);
                        }
                    });
            }
        },
        get_value() {
            console.log(tmp);
            let s = JSON.stringify(tmp);
            console.log(s);
            localStorage.setItem("tmp_value", s);
        },
        d_file() {
            uniCloud
                .callFunction({ name: "delete-file", data: {} })
                .then((result) => console.log(result)).catch((e)=>console.log(e));
        },
    },
};
</script>

<style lang="scss">
</style>
