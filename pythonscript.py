import random
from io import StringIO

RED='\33[91m'
BLUE='\33[94m'
WHITE='\33[97m'
END='\33[0m'

print(BLUE + 'Success!' + END)

democraticpv = 0
republicanpv = 0

democraticEV = 0
republicanEV = 0

timeInMinutes = 0

simulationEnd = False


# CONSTANTS LISTED BELOW
EV, PV, DPCT, RPCT, STARTTIME, SPEED, STATUS, DVOTES, RVOTES, ITERATIONS, STATENAME, ABBREVIATION = 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11



#[ev,pv,d,r,starttime,speed,status,dvotes,rvotes, num of iterations so far]
alabama = [9, 2300000, 35, 65, 120, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Alabama", "AL"]
alaska = [3, 400000, 43, 57, 420, "Slow", "Votes Not Counted Yet", 0, 0, 0, "Alaska", "AK"]
arizona = [11, 3400000, 50, 50, 180, "Medium", "Votes Not Counted Yet", 0, 0, 0, "Arizona", "AZ"]
arkansas = [6, 1200000, 35, 65, 150, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Arkansas", "AR"]
california = [54, 16600000, 59.5, 40.5, 300, "Slow", "Votes Not Counted Yet", 0, 0, 0, "California", "CA"]
colorado = [10, 3200000, 55, 45, 180, "Medium", "Votes Not Counted Yet", 0, 0, 0, "Colorado", "CO"]
connecticut = [7, 1800000, 57, 43, 120, "Medium", "Votes Not Counted Yet", 0, 0, 0, "Connecticut", "CT"]
delaware = [3, 500000, 57, 43, 120, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Delaware", "DE"]
dc = [3, 300000, 84, 16, 120, "Medium", "Votes Not Counted Yet", 0, 0, 0, "District of Columbia", "DC"]
florida = [30, 11500000, 45, 55, 120, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Florida", "FL"]
georgia = [16, 5000000, 49.5, 50.5, 60, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Georgia", "GA"]
hawaii = [4, 600000, 62, 38, 360, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Hawaii", "HI"]
idaho = [4, 800000, 35, 65, 300, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Idaho", "ID"]
illinois = [19, 5600000, 56, 44, 120, "Slow", "Votes Not Counted Yet", 0, 0, 0, "Illinois", "IL"]
indiana = [11, 3000000, 41, 59, 60, "Medium", "Votes Not Counted Yet", 0, 0, 0, "Indiana", "IN"]
iowa = [6, 1600000, 44, 56, 180, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Iowa", "IA"]
kansas = [6, 1300000, 40, 60, 120, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Kansas", "KS"]
kentucky = [8, 2100000, 36, 64, 60, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Kentucky", "KY"]
louisiana = [8, 2100000, 39, 61, 180, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Louisiana", "LA"]
maine = [4, 800000, 54, 46, 120, "Slow", "Votes Not Counted Yet", 0, 0, 0, "Maine", "ME"]
maryland = [10, 2800000, 62, 38, 120, "Slow", "Votes Not Counted Yet", 0, 0, 0, "Maryland", "MD"]
massachusetts = [11, 3500000, 62, 38, 120, "Slow", "Votes Not Counted Yet", 0, 0, 0, "Massachusetts", "MA"]
michigan = [15, 5500000, 51, 49, 180, "Slow", "Votes Not Counted Yet", 0, 0, 0, "Michigan", "MI"]
minnesota = [10, 3100000, 53, 47, 180, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Minnesota", "MN"]
mississippi = [6, 1300000, 41, 59, 120, "Slow", "Votes Not Counted Yet", 0, 0, 0, "Mississippi", "MS"]
missouri = [10, 3000000, 43, 57, 120, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Missouri", "MO"]
montana = [4, 600000, 42, 58, 240, "Medium", "Votes Not Counted Yet", 0, 0, 0, "Montana", "MT"]
nebraska = [5, 900000, 38, 62, 180, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Nebraska", "NE"]
nevada = [6, 1400000, 49, 51, 240, "Medium", "Votes Not Counted Yet", 0, 0, 0, "Nevada", "NV"]
newhampshire = [4, 800000, 53, 47, 60, "Slow", "Votes Not Counted Yet", 0, 0, 0, "New Hampshire", "NH"]
newjersey = [14, 4400000, 56, 44, 120, "Slow", "Votes Not Counted Yet", 0, 0, 0, "New Jersey", "NJ"]
newmexico = [5, 900000, 55, 45, 180, "Fast", "Votes Not Counted Yet", 0, 0, 0, "New Mexico", "NM"]
newyork = [28, 8100000, 56, 44, 180, "Medium", "Votes Not Counted Yet", 0, 0, 0, "New York", "NY"]
northcarolina = [16, 5600000, 49, 51, 90, "Fast", "Votes Not Counted Yet", 0, 0, 0, "North Carolina", "NC"]
northdakota = [3, 400000, 33, 67, 180, "Fast", "Votes Not Counted Yet", 0, 0, 0, "North Dakota", "ND"]
ohio = [17, 5900000, 47, 53, 90, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Ohio", "OH"]
oklahoma = [7, 1500000, 32, 68, 120, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Oklahoma", "OK"]
oregon = [8, 2300000, 57, 43, 300, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Oregon", "OR"]
pennsylvania = [19, 7000000, 50, 50, 120, "Medium", "Votes Not Counted Yet", 0, 0, 0, "Pennsylvania", "PA"]
rhodeisland = [4, 500000, 58, 42, 120, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Rhode Island", "RI"]
southcarolina = [9, 2500000, 40, 60, 60, "Medium", "Votes Not Counted Yet", 0, 0, 0, "South Carolina", "SC"]
southdakota = [3, 400000, 35, 65, 180, "Fast", "Votes Not Counted Yet", 0, 0, 0, "South Dakota", "SD"]
tennessee = [11, 3000000, 37, 63, 120, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Tennessee", "TN"]
texas = [40, 11600000, 46, 54, 180, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Texas", "TX"]
utah = [6, 1500000, 38, 62, 240, "Slow", "Votes Not Counted Yet", 0, 0, 0, "Utah", "UT"]
vermont = [3, 400000, 63, 37, 60, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Vermont", "VT"]
virginia = [13, 4500000, 54, 46, 60, "Medium", "Votes Not Counted Yet", 0, 0, 0, "Virginia", "VA"]
washington = [12, 4000000, 58, 42, 300, "Medium", "Votes Not Counted Yet", 0, 0, 0, "Washington", "WA"]
westvirginia = [4, 800000, 30, 70, 90, "Fast", "Votes Not Counted Yet", 0, 0, 0, "West Virginia", "WV"]
wisconsin = [10, 3200000, 50.5, 49.5, 180, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Wisconsin", "WI"]
wyoming = [3, 300000, 28, 72, 180, "Fast", "Votes Not Counted Yet", 0, 0, 0, "Wyoming", "WY"]


#Votes Not Counted Yet, Votes Counting

# evs, pvs, dem, gop, time, speed, status, dvsf, rvsf, iterations

officiallist=[alabama, alaska, arizona, arkansas, california, colorado, connecticut, delaware, dc, florida, georgia, hawaii, idaho, illinois, indiana, iowa, kansas, kentucky, louisiana, maine, maryland, massachusetts, michigan, minnesota, mississippi, missouri, montana, nebraska, nevada, newhampshire, newjersey, newmexico, newyork, northcarolina, northdakota, ohio, oklahoma, oregon, pennsylvania, rhodeisland, southcarolina, southdakota, tennessee, texas,  utah, vermont, virginia, washington, westvirginia, wisconsin, wyoming]




def addvotes(state):
    global republicanpv, democraticpv
    dvotestoadd=state[PV]*state[DPCT]/10000
    rvotestoadd=state[PV]*state[RPCT]/10000

    dup=random.randint(0,dvotestoadd)
    rup=random.randint(0,rvotestoadd)

    if state[5] == "Fast":
        if(random.random()<=0.9):
            state[DVOTES]+=dup
            state[RVOTES]+=rup
            democraticpv+=dup
            republicanpv+=rup
            state[ITERATIONS]+=1
    elif state[5]=="Medium":
        if(random.random()<=0.7):
            state[DVOTES]+=dup
            state[RVOTES]+=rup
            democraticpv+=dup
            republicanpv+=rup
            state[ITERATIONS]+=1
    elif state[5]=="Slow":
        if(random.random()<=0.5):
            state[DVOTES]+=dup
            state[RVOTES]+=rup
            democraticpv+=dup
            republicanpv+=rup
            state[ITERATIONS]+=1


def callstate(state):
    global democraticEV, republicanEV
    dcall=0
    rcall=0
    if(state[STATUS]=="Votes Counting"):
        for i in range(25):
            dcurrent=state[DVOTES]
            rcurrent=state[RVOTES]
            for j in range(state[9], 200):
                dcurrent+=random.randint(0,((state[PV]*(state[DPCT]+7)/10000)))
                rcurrent+=random.randint(0,((state[1]*(state[RPCT]-7)/10000)))

            if(dcurrent>rcurrent):
                dcall+=1
            elif(rcurrent>dcurrent):
                rcall+=1

            dcurrent=state[7]
            rcurrent=state[8]
            for k in range(state[9],200):
                dcurrent+=random.randint(0,((state[PV]*(state[DPCT]-7)/10000)))
                rcurrent+=random.randint(0,((state[PV]*(state[RPCT]+7)/10000)))
            
            if(dcurrent>rcurrent):
                dcall+=1
            elif(rcurrent>dcurrent):
                rcall+=1            
        if(dcall==50):
            state[6]="Votes Counting - D"
            democraticEV+=state[EV]
            print(state[10]+" Called for Democrats - D: "+str(int((state[7]/(state[7]+state[8]+1))*1000)/10)+" % - R: "+str(int((state[8]/(state[7]+state[8]+1))*1000)/10)+" % ("+str(state[9]/2)+" % reporting)")
        if(rcall==50):
            state[6]="Votes Counting - R"
            republicanEV+=state[EV]
            print(state[10]+" Called for Republicans - D: "+str(int((state[7]/(state[7]+state[8]+1))*1000)/10)+" % - R: "+str(int((state[8]/(state[7]+state[8]+1))*1000)/10)+" % ("+str(state[9]/2)+" % reporting)")
    elif(state[6]=="Votes Counting - R" or state[6]=="Votes Counting - D"):
        for i in range(10):
            dcurrent=state[7]
            rcurrent=state[8]
            for j in range(state[9], 200):
                dcurrent+=random.randint(0,(state[1]*state[2]/10000))
                rcurrent+=random.randint(0,(state[1]*state[3]/10000))

            if(dcurrent>rcurrent):
                dcall+=1
            elif(rcurrent>dcurrent):
                rcall+=1        
        if(state[6]=="Votes Counting - R"):
            if(dcall>0):
                state[6]="Votes Counting"
                republicanEV-=state[EV]
        if(state[6]=="Votes Counting - D"):
            if(rcall>0):
                state[6]="Votes Counting"
                democraticEV-=state[EV]

    if(state[9]==200):
        state[6]="Votes Counted"
        print(state[10]+"All Votes Counted"+str(int((state[7]/(state[7]+state[8]+1))*1000)/10)+" % - R: "+str(int((state[8]/(state[7]+state[8]+1))*1000)/10)+" % ("+str(state[9]/2)+" % reporting)")

def getColor(state):
    if((state[STATUS]=="Votes Counted" and state[RVOTES]>state[DVOTES]) or (state[STATUS]=="Votes Counting - R")):
        return RED
    elif((state[STATUS]=="Votes Counted" and state[DVOTES]>state[RVOTES]) or (state[STATUS]=="Votes Counting - D")):
        return BLUE
    else:
        return WHITE

def drawPixels(buffer, state, numpixels):
    buffer.write(getColor(state))
    for _ in range(numpixels):
        buffer.write(state[ABBREVIATION]+" ")
    buffer.write(END)

def drawPixelsEndLine(buffer, state, numpixels):
    buffer.write(getColor(state))
    for _ in range(numpixels-1):
        buffer.write(state[ABBREVIATION]+" ")
    buffer.write(state[ABBREVIATION]+"\n"+END)

def drawSpace(buffer, numpixels):
    for _ in range(numpixels):
        buffer.write("   ")

def drawmap():
    map=StringIO()

    drawSpace(map, 2)
    drawPixels(map, washington, 3)
    drawPixels(map, idaho, 1)
    drawPixels(map, montana, 3)
    drawSpace(map, 11)
    drawPixels(map, minnesota, 1)
    drawSpace(map, 22)
    drawPixelsEndLine(map, maine, 2)

    drawPixels(map, washington, 5)
    drawPixels(map, idaho, 1)
    drawPixels(map, montana, 7)
    drawPixels(map, northdakota, 6)
    drawPixels(map, minnesota, 5)
    drawSpace(map, 3)
    drawPixels(map, michigan, 1)
    drawSpace(map, 11)
    drawPixels(map, vermont, 2)
    drawPixels(map, newhampshire, 1)
    drawPixelsEndLine(map, maine, 3)

    drawPixels(map, washington, 5)
    drawPixels(map, idaho, 1)
    drawPixels(map, montana, 7)
    drawPixels(map, northdakota, 6)
    drawPixels(map, minnesota, 4)
    drawSpace(map, 2)
    drawPixels(map, michigan, 2)
    drawSpace(map, 11)
    drawPixels(map, newyork, 1)
    drawPixels(map, vermont, 2)
    drawPixels(map, newhampshire, 1)
    drawPixelsEndLine(map, maine, 3)

    drawPixels(map, washington, 5)
    drawPixels(map, idaho, 2)
    drawPixels(map, montana, 6)
    drawPixels(map, northdakota, 6)
    drawPixels(map, minnesota, 3)
    drawPixels(map, wisconsin, 2)
    drawPixels(map, michigan, 2)
    drawSpace(map, 11)
    drawPixels(map, newyork, 2)
    drawPixels(map, vermont, 1)
    drawPixels(map, newhampshire, 2)
    drawPixelsEndLine(map, maine, 2)

    drawPixels(map, oregon, 1)
    drawPixels(map, washington, 2)
    drawPixels(map, oregon, 2)
    drawPixels(map, idaho, 2)
    drawPixels(map, montana, 6)
    drawPixels(map, southdakota, 6)
    drawPixels(map, minnesota, 2)
    drawPixels(map, wisconsin, 5)
    drawSpace(map, 1)
    drawPixels(map, michigan, 1)
    drawSpace(map, 9)
    drawPixels(map, newyork, 2)
    drawPixels(map, vermont, 1)
    drawPixels(map, newhampshire, 2)
    drawPixelsEndLine(map, maine, 1)

    drawPixels(map, oregon, 5)
    drawPixels(map, idaho, 3)
    drawPixels(map, montana, 1)
    drawPixels(map, wyoming, 4)
    drawPixels(map, southdakota, 6)
    drawPixels(map, minnesota, 2)
    drawPixels(map, wisconsin, 4)
    drawSpace(map, 1)
    drawPixels(map, michigan, 3)
    drawSpace(map, 7)
    drawPixels(map, newyork, 3)
    drawPixelsEndLine(map, massachusetts, 4)

    drawPixels(map, oregon, 5)
    drawPixels(map, idaho, 4)
    drawPixels(map, wyoming, 4)
    drawPixels(map, southdakota, 6)
    drawPixels(map, minnesota, 3)
    drawPixels(map, wisconsin, 3)
    drawSpace(map, 1)
    drawPixels(map, michigan, 3)
    drawSpace(map, 5)
    drawPixels(map, newyork, 5)
    drawPixelsEndLine(map, massachusetts, 5)

    drawPixels(map, oregon, 5)
    drawPixels(map, idaho, 4)
    drawPixels(map, wyoming, 4)
    drawPixels(map, southdakota, 6)
    drawPixels(map, iowa, 3)
    drawPixels(map, wisconsin, 3)
    drawSpace(map, 1)
    drawPixels(map, michigan, 3)
    drawSpace(map, 4)
    drawPixels(map, pennsylvania, 1)
    drawPixels(map, newyork, 6)
    drawPixels(map, connecticut, 2)
    drawPixelsEndLine(map, rhodeisland, 1)

    drawPixels(map, oregon, 5)
    drawPixels(map, idaho, 4)
    drawPixels(map, wyoming, 4)
    drawPixels(map, nebraska, 5)
    drawPixels(map, iowa, 4)
    drawPixels(map, illinois, 3)
    drawSpace(map, 1)
    drawPixels(map, michigan, 4)
    drawSpace(map, 2)
    drawPixels(map, ohio, 1)
    drawPixels(map, pennsylvania, 6)
    drawPixels(map, newyork, 1)
    drawPixels(map, connecticut, 2)
    drawPixelsEndLine(map, rhodeisland, 1)

    drawPixels(map, california, 3)
    drawPixels(map, nevada, 4)
    drawPixels(map, utah, 2)
    drawPixels(map, wyoming, 4)
    drawPixels(map, nebraska, 6)
    drawPixels(map, iowa, 4)
    drawPixels(map, illinois, 2)
    drawPixels(map, indiana, 3)
    drawPixels(map, ohio, 5)
    drawPixels(map, pennsylvania, 6)
    drawPixels(map, newjersey, 1)
    drawPixelsEndLine(map, newyork, 2)

    drawPixels(map, california, 3)
    drawPixels(map, nevada, 4)
    drawPixels(map, utah, 3)
    drawPixels(map, colorado, 5)
    drawPixels(map, nebraska, 4)
    drawPixels(map, iowa, 3)
    drawPixels(map, illinois, 3)
    drawPixels(map, indiana, 3)
    drawPixels(map, ohio, 5)
    drawPixels(map, pennsylvania, 5)
    drawPixelsEndLine(map, newjersey, 2)

    drawPixels(map, california, 3)
    drawPixels(map, nevada, 4)
    drawPixels(map, utah, 3)
    drawPixels(map, colorado, 5)
    drawPixels(map, nebraska, 4)
    drawPixels(map, missouri, 3)
    drawPixels(map, illinois, 3)
    drawPixels(map, indiana, 3)
    drawPixels(map, ohio, 4)
    drawPixels(map, westvirginia, 1)
    drawPixels(map, pennsylvania, 5)
    drawPixelsEndLine(map, newjersey, 1)

    drawPixels(map, california, 3)
    drawPixels(map, nevada, 4)
    drawPixels(map, utah, 3)
    drawPixels(map, colorado, 5)
    drawPixels(map, kansas, 4)
    drawPixels(map, missouri, 4)
    drawPixels(map, illinois, 2)
    drawPixels(map, indiana, 3)
    drawPixels(map, ohio, 4)
    drawPixels(map, westvirginia, 3)
    drawPixels(map, maryland, 3)
    drawPixelsEndLine(map, delaware, 1)

    drawPixels(map, california, 3)
    drawPixels(map, nevada, 4)
    drawPixels(map, utah, 3)
    drawPixels(map, colorado, 5)
    drawPixels(map, kansas, 5)
    drawPixels(map, missouri, 3)
    drawPixels(map, illinois, 2)
    drawPixels(map, indiana, 2)
    drawPixels(map, kentucky, 3)
    drawPixels(map, ohio, 1)
    drawPixels(map, westvirginia, 3)
    drawPixels(map, virginia, 1)
    drawPixels(map, dc, 1)
    drawPixels(map, maryland, 2)
    drawPixelsEndLine(map, delaware, 1)

    drawPixels(map, california, 4)
    drawPixels(map, nevada, 3)
    drawPixels(map, utah, 3)
    drawPixels(map, colorado, 5)
    drawPixels(map, kansas, 5)
    drawPixels(map, missouri, 4)
    drawPixels(map, illinois, 1)
    drawPixels(map, indiana, 1)
    drawPixels(map, kentucky, 6)
    drawPixels(map, westvirginia, 1)
    drawPixels(map, virginia, 3)
    drawSpace(map, 1)
    drawPixelsEndLine(map, maryland, 1)

    drawSpace(map, 1)
    drawPixels(map, california, 4)
    drawPixels(map, nevada, 2)
    drawPixels(map, arizona, 3)
    drawPixels(map, newmexico, 4)
    drawPixels(map, oklahoma, 6)
    drawPixels(map, missouri, 4)
    drawPixels(map, kentucky, 7)
    drawPixelsEndLine(map, virginia, 6)

    drawSpace(map, 2)
    drawPixels(map, california, 4)
    drawPixels(map, nevada, 1)
    drawPixels(map, arizona, 3)
    drawPixels(map, newmexico, 4)
    drawPixels(map, texas, 2)
    drawPixels(map, oklahoma, 4)
    drawPixels(map, arkansas, 4)
    drawPixels(map, missouri, 1)
    drawPixels(map, tennessee, 7)
    drawPixelsEndLine(map, northcarolina, 5)

    drawSpace(map, 2)
    drawPixels(map, california, 4)
    drawPixels(map, arizona, 4)
    drawPixels(map, newmexico, 4)
    drawPixels(map, texas, 2)
    drawPixels(map, oklahoma, 4)
    drawPixels(map, arkansas, 4)
    drawPixels(map, tennessee, 7)
    drawPixelsEndLine(map, northcarolina, 6)

    drawSpace(map, 4)
    drawPixels(map, california, 2)
    drawPixels(map, arizona, 4)
    drawPixels(map, newmexico, 4)
    drawPixels(map, texas, 2)
    drawPixels(map, oklahoma, 4)
    drawPixels(map, arkansas, 4)
    drawPixels(map, mississippi, 2)
    drawPixels(map, alabama, 3)
    drawPixels(map, georgia, 2)
    drawPixels(map, southcarolina, 3)
    drawPixelsEndLine(map, northcarolina, 2)

    drawSpace(map, 5)
    drawPixels(map, california, 1)
    drawPixels(map, arizona, 4)
    drawPixels(map, newmexico, 4)
    drawPixels(map, texas, 6)
    drawPixels(map, arkansas, 3)
    drawPixels(map, mississippi, 3)
    drawPixels(map, alabama, 3)
    drawPixels(map, georgia, 3)
    drawPixelsEndLine(map, southcarolina, 3)

    drawSpace(map, 8)
    drawPixels(map, arizona, 2)
    drawPixels(map, newmexico, 1)
    drawPixels(map, texas, 10)
    drawPixels(map, arkansas, 2)
    drawPixels(map, mississippi, 3)
    drawPixels(map, alabama, 3)
    drawPixels(map, georgia, 3)
    drawPixelsEndLine(map, southcarolina, 3)

    drawSpace(map, 11)
    drawPixels(map, texas, 10)
    drawPixels(map, louisiana, 2)
    drawPixels(map, mississippi, 3)
    drawPixels(map, alabama, 3)
    drawPixels(map, georgia, 4)
    drawPixelsEndLine(map, southcarolina, 1)

    drawSpace(map, 2)
    drawPixels(map, alaska, 2)
    drawSpace(map, 8)
    drawPixels(map, texas, 1)
    drawSpace(map, 1)
    drawPixels(map, texas, 7)
    drawPixels(map, louisiana, 2)
    drawPixels(map, mississippi, 3)
    drawPixels(map, alabama, 3)
    drawPixelsEndLine(map, georgia, 4)

    drawPixels(map, alaska, 5)
    drawSpace(map, 9)
    drawPixels(map, texas, 7)
    drawPixels(map, louisiana, 4)
    drawPixels(map, mississippi, 1)
    drawPixels(map, alabama, 1)
    drawPixelsEndLine(map, florida, 6)

    drawSpace(map, 1)
    drawPixels(map, alaska, 4)
    drawSpace(map, 10)
    drawPixels(map, texas, 6)
    drawPixels(map, louisiana, 4)
    drawSpace(map, 5)
    drawPixelsEndLine(map, florida, 3)

    drawPixels(map, alaska, 5)
    drawSpace(map, 2)
    drawPixels(map, hawaii, 1)
    drawSpace(map, 7)
    drawPixels(map, texas, 4)
    drawSpace(map, 12)
    drawPixelsEndLine(map, florida, 2)

    drawSpace(map, 1)
    drawPixels(map, alaska, 2)
    drawSpace(map, 1)
    drawPixels(map, alaska, 1)
    drawSpace(map, 3)
    drawPixels(map, hawaii, 2)
    drawSpace(map, 5)
    drawPixels(map, texas, 3)
    drawSpace(map, 13)
    drawPixelsEndLine(map, florida, 3)
    
    drawPixels(map, alaska, 1)
    drawSpace(map, 4)
    drawPixels(map, alaska, 1)
    drawSpace(map, 4)
    drawPixels(map, hawaii, 2)
    drawSpace(map, 4)
    drawPixels(map, texas, 2)
    drawSpace(map, 13)
    drawPixelsEndLine(map, florida, 3)

    drawSpace(map, 10)
    drawPixels(map, hawaii, 2)
    drawSpace(map, 5)
    drawPixels(map, texas, 1)
    drawSpace(map, 14)
    drawPixels(map, florida, 2)
    
    return map.getvalue()
    



while(simulationEnd == False):
    timeInMinutes += 1
    print(timeInMinutes)
    print("Democratic "+str(democraticEV)+" - "+str (republicanEV)+" Republican")
    print("Democratic "+str(int((democraticpv/(democraticpv+republicanpv+1))*1000)/10)+" % - "+str(int((republicanpv/(democraticpv+republicanpv+1))*1000)/10)+" % Republican")
    
    t = input("input : ")
    if(t=="q"):
        simulationEnd=True
    if(t=="m"):
        print(drawmap())

    for i in officiallist:
        if i[6] == "Votes Not Counted Yet":
            if i[4] == timeInMinutes:
                i[6] = "Votes Counting"
                print(i[10]+" Polls Closed")

        if i[6] == "Votes Counting" or i[6]=="Votes Counting - R" or i[6]=="Votes Counting - D":
            addvotes(i)
            callstate(i)

        if i[6]=="Votes Counting":
            print(i[10]+" Too Close to Call - D: "+str(int((i[7]/(i[7]+i[8]+1))*1000)/10)+" % - R: "+str(int((i[8]/(i[7]+i[8]+1))*1000)/10)+" % ("+str(i[9]/2)+" % reporting)")
