import random, math

bounds = (1, 2)

i = 0
time = 0
while i < 200:
    time += 1
    rand = random.random()
    it = math.floor(rand*(((1-i/200)*(bounds[1]-bounds[0]))+bounds[0]))
    if it!=0:
        for j in range(0,it):
            i+=1
            if(i == 50 or i == 100 or i == 150 or i == 180 or i == 190 or i == 199 or i == 200):
                print(f"Time: {time} - {i/2}% reporting")
