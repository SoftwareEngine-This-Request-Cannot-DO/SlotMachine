import random

# 設定事件的機率
probabilities = [0.50, 0.25, 0.15, 0.10]


t = 0
for i in range(100):
    random_number = random.random()
    if random_number < probabilities[0]:
        result = "事件1"
        t+=1
    elif random_number < probabilities[0] + probabilities[1]:
        result = "事件2"
    elif random_number < probabilities[0] + probabilities[1] + probabilities[2]:
        result = "事件3"
    else:
        result = "事件4"

print("隨機事件結果：", t)
