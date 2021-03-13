import os
import json
food_category = ["", "奶类", "肉蛋类及大豆类", "谷薯类", "蔬菜类", "油脂类及硬果类", "水果类"]
data = []
for c_id in range(1, 7):
    c_name = food_category[c_id]
    idx = 0
    for f_name in os.listdir(c_name):
        idx += 1
        food_name, food_price = os.path.splitext(f_name)[0].split()
        food_price = int(food_price[:-1])
        template = {
            "categoryID": c_id,
            "foodID": c_id*10000+idx,
            "name": food_name,
            "price": food_price,
            "unit": "g/份",
            "description": "",
            "thumbImg": "",
            "isOnSale": True
        }
        data.append(template)
with open("tmp.json", mode="w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)
