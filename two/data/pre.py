# -*- coding: UTF-8 -*-
#!/usr/bin/python

import sys
import re
import json

year = sys.argv[1]
wave_start = sys.argv[2] # e.g. V1
cc_start = sys.argv[3] # e.g. V2

print year
# write to answers.txt
keys = []
keys.append(wave_start)
keys.append(cc_start)

for line in open('generated/questions_' + year + '.txt'):
    vals = re.sub('[\s+]', ' ', line).split(' ')
    vals = [s for s in vals if s]
    keys.append(vals[0])

#print keys
answers = {}
keyLine = {}
lineNumber = -1
findingAnswerFor = None

for line in open('raw/' + year + '.sts'):
    if bool(re.search(r"\\V", line)) and "{" in line and "}" in line:
        lineNumber += 1
        for key in keys:
            if bool(re.search(r"\\"+key +"[^\d^\w]", line)):
                keyLine[key] = str(lineNumber)
    if bool(re.search(r"" + wave_start + "[^\d^\w](.+)\\" + wave_start, line)):
        answers[wave_start] = []
        continue
    if bool(re.search(r"" + cc_start + "[^\d^\w](.+)\\" + cc_start, line)):
        answers[cc_start] = []
        continue



    if findingAnswerFor is not None:
        if bool(re.search(r"\\", line)):
            findingAnswerFor = None
            #print "Done!"
            #print line
        else:
            #print line
            answers[findingAnswerFor].append(line.strip())

    if findingAnswerFor is None:
        for key in keys:
            if bool(re.search(r"" + key + "[^\d^\w]", line)):
                #print "starting answers for " + key
                #print line
                findingAnswerFor = key
                answers[findingAnswerFor] = []

if len(answers[wave_start]) is 0:
    print "Warning: " + year + " did not append " + wave_start
if len(answers[cc_start]) is 0:
    print "Warning: " + year + " did not append " + cc_start

with open('generated/answers_' + year + '.txt', 'w') as fp:
    for key in keys:
        fp.write("\\" + key + " {" + keyLine[key] + "}" + "\n")
        for line in answers[key]:
            fp.write(line + "\n")


indices = [int(x) for x in keyLine.values()]
indices.sort()

dataToWrite = []

# find relevant columns and put them in data
for line in open('raw/' + year + '.dat'):
    vals = line.split(',')
    dataLine = ""
    for i in indices:
        dataLine += "" + vals[i] + ("," if i != indices[-1] else "")
    dataToWrite.append(dataLine)

with open('generated/data_' + year + '.txt', 'w') as fp:
    for d in dataToWrite:
        fp.write(d)
        fp.write("\n")
