import math

evs =   [40,  30,  19,  19,  17,  16,  16,  15,  14,  13,  11,  10,  10,  10,  8,   6,   6,   5,    4,   4]
mlist = [11,  9,  -14,  -1,   10,  2,   3,   -2, -11,  -7,  3,  -2,  -11, -7,  -14,  12,  0,  -9,  -7,  -4]
abbs = ["TX","FL","IL","PA","OH","GA","NC","MI","NJ","VA","AZ","WI","CO","MN","OR","IA","NV","NM","ME","NH"]
props = [0.0000000000500, 0.0000000004210, 0.0000000032050, 0.0000000221300, 0.0000001383490, 0.0000007819110, 0.0000039893520, 0.0000183514530, 0.0000760347550, 0.0002835187880, 0.0009509417040, 0.0028684187810, 0.0077826482740, 0.0190057914640, 0.0418249834440, 0.0830975846950, 0.1494574525500, 0.2442546314080, 0.3645237517840, 0.5000000000000, 0.6354762482160, 0.7557453685920, 0.8505425474500, 0.9169024153050, 0.9581750165560, 0.9809942085360, 0.9922173517260, 0.9971315812190, 0.9990490582960, 0.9997164812120, 0.9999239652450, 0.9999816485470, 0.9999960106480, 0.9999992180890, 0.9999998616510, 0.9999999778700, 0.9999999967950, 0.9999999995790, 0.9999999999500]
weights = [0.055, 0.075, 0.1, 0.145, 0.25, 0.145, 0.1, 0.075, 0.055]
def decimaltobinary(n):
    rlist = []
    val = n
    s2list = [524288,262144,131072,65536,32768,16384,8192,4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]  # Binary representation for 5 bits
    for i in s2list:
        if (val // i == 1):
            rlist.append(1)
            val -= i
        else:
            rlist.append(0)
    return rlist


wv = []
shift = 0
def test():
    proplist = []

    for i in range(0, len(mlist)):
        proplist.append(props[mlist[i]+shift+19])
    
    g143 = []
    l143 = []
    e143 = []

    for i in range(0, 1048576):
        nl = decimaltobinary(i)
        
        ol = []
        evl = []

        prodlist = []

        for j in range(0, 20):
            if (nl[j] == 1):
                ol.append(abbs[j])
                evl.append(evs[j])
                prodlist.append(proplist[j])
            else:
                prodlist.append(1 - proplist[j])
        p = math.prod(prodlist)
        if (sum(evl) > 143):
            g143.append(p)
        elif (sum(evl) < 143):
            l143.append(p)
        else:
            e143.append(p)


    print(f"S: {shift} >143: {sum(g143) * 100:.4f}% <143: {sum(l143) * 100:.4f}% =143: {sum(e143) * 100:.4f}%")
    wv.append([sum(g143),sum(l143),sum(e143)])

shift = -4
test()
shift = -3
test()
shift = -2
test()
shift = -1
test()
shift = 0
test()
shift = 1
test()
shift = 2
test()
shift = 3
test()
shift = 4
test()

rwins = [wv[i][0]*weights[i] for i in range(0, 9)]
dwins = [wv[i][1]*weights[i] for i in range(0, 9)]
ties = [wv[i][2]*weights[i] for i in range(0, 9)]
print(f"Total >143: {sum(rwins) * 100:.8f}% <143: {sum(dwins) * 100:.8f}% =143: {sum(ties) * 100:.4f}%")