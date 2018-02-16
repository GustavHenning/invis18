#!/bin/bash

DATA_INFO="raw/WV6_Data_ascii_delimited_v_2016_01_01.sts"

# Get Questions
cat $DATA_INFO | grep "How much do you trust" > questions.txt
cat $DATA_INFO | grep "Confidence" >> questions.txt


#Get Answers
rm ./answers.txt

#Get the year and the country
WAVE="1"
COUNTRY_CODE="2"
COUNTRY_CODE_END="2A"
# These are a bit altered from the for loop
cat $DATA_INFO | tr -d '\n' | grep -oP "(  \\\V$WAVE)(.+)(  \\\V$COUNTRY_CODE )" | sed 's/     /     \n/g' | sed 's/\\/\n\\/g' >> answers.txt
cat $DATA_INFO | tr -d '\n' | grep -oP "(  \\\V$COUNTRY_CODE)(.+)(  \\\V$COUNTRY_CODE_END )" | sed 's/     /     \n/g' | sed 's/\\/\n\\/g' >> answers.txt

#Get the rest of the answers
PREV="02"
for i in {03..26}; do
  cat $DATA_INFO | tr -d '\n' | grep -oP "(  \\\V1$PREV)(.+)(  \\\V1$i)" | sed 's/     /     \n/g' | sed 's/\\/\n\\/g' >> answers.txt
  PREV=$i
done
