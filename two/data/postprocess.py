# -*- coding: UTF-8 -*-
#!/usr/bin/python

import sys
import re
import json

year = sys.argv[1]

questions = {}
for line in open('generated/questions_' + year + '.txt'):
    vals = re.sub('[\s+]', ' ', line).split(' ')
    vals = [s for s in vals if s]
    questions["\\" + vals[0]] = re.search(r'{(.*?)}', line).group(1).decode("utf-8").replace(u"\u2019", "").encode("utf-8")

#print questions

lines = [line.rstrip('\n') for line in open('generated/answers_' + year + '.txt')]
answers = {} # map access to both question and number to meaning
chronological = [] # keep track of order

current = ""
for line in lines:
    if "\V" in line:
        if len(current.strip()) > 0:
            #print answers[current]
            if len(answers[current]) == 0:
                answers.pop(current, None)
            else:
                if current not in chronological:
                    chronological.append(current)
        current=line.strip().split(' ')[0]
        answers[current] = {}
    elif len(line.strip()) > 0:
        answers[current][line.split(' ')[0]] = line.partition(' ')[2].strip().decode("utf-8").replace(u"\u00b4", "").replace(u"\u00f3", "").replace("\"", "").encode("utf-8")


print "---------"
for key in answers.keys():
    if key not in chronological:
        print key
print "---------"
print answers
for c in chronological:
    print c

print "Num questions"
print len(questions.keys())
print "Num answers"
print len(answers.keys())
print "Num actual contents"
print len(chronological)

# year => country => question => answer => frequency
yearData = {}
for line in open('generated/data_' + year + '.txt'):
    values = line.split(',')

    country = answers[chronological[1]][values[1]].replace('\'','')

    if country not in yearData.keys():
        yearData[country] = {}
    for q in questions:
        if questions[q] not in yearData[country]:
            yearData[country][questions[q]] = {}
    #print year
    #print country
    for i in range(2, len(values)-1):
        ans = ""
        try:
            if len(chronological) > i:
                ans = answers[chronological[i]][values[i]].replace('\'', '')
        except KeyError:
            ans =  "No data"
        if len(chronological) > i:
            question = questions[chronological[i]]
        if not ans in yearData[country][question]:
            yearData[country][question][ans] = 1
        else:
            yearData[country][question][ans] += 1
        #print(i)
        #print(chronological[i])
        #print(values[i])
#print yearData
with open('generated/result_' + year + '.json', 'w') as fp:
    json.dump(yearData, fp, indent=4)
