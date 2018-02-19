#!/bin/bash
# We expect questions to be filled beforehand
YEAR="$1"
echo "PREPROCESSING"
GEN="./generated"

DATA_SOURCE="raw/$YEAR.dat"
DATA_INFO="raw/$YEAR.sts"

#Get the year and the country
WAVE="$2"
WAVE_END="$3"
COUNTRY_CODE="$4"
COUNTRY_CODE_END="$5"
# These are a bit altered from the for loop
cat $DATA_INFO | tr -d '\n' | grep -oP "(  \\\V$WAVE)(.+)(  \\\V$WAVE_END )" | sed 's/     /     \n/g' | sed 's/\\/\n\\/g' > $GEN/answers_$YEAR.txt
cat $DATA_INFO | tr -d '\n' | grep -oP "(  \\\V$COUNTRY_CODE )(.+)(  \\\V$COUNTRY_CODE_END )" | sed 's/     /     \n/g' | sed 's/\\/\n\\/g' >> $GEN/answers_$YEAR.txt

#Clean up questions
sed -i 's/  \+/ /g' $GEN/questions_$YEAR.txt

#Get the rest of the answers
QUESTS=($(cat $GEN/questions_$YEAR.txt | cut -d ' ' -f2))

PREV="${QUESTS[0]}"
END=${#QUESTS[@]}

echo "${QUESTS[@]}"
exit 1

for i in $(seq 1 $END); do

  cat $DATA_INFO | tr -d '\n' | grep -oP "(  \\$PREV )(.+)(  \\${QUESTS[$i]} )" | sed 's/     /     \n/g' | sed 's/\\/\n\\/g' >> $GEN/answers_$YEAR.txt
  PREV="${QUESTS[$i]}"
done

# Gather the relevant indexes we need to filter unwanted information from data source [Position - 1 = index]
SPECIAL_INDICES=()
SPECIAL_INDICES+=("1")
SPECIAL_INDICES+=("2")

QUESTION_INDICES=()
for i in "${SPECIAL_INDICES[@]}"; do
  QUESTION_INDICES+=("$(($i-1))")
done

for i in $(cat $GEN/questions_$YEAR.txt | tr -s ' ' | cut -d' ' -f4); do
  QUESTION_INDICES+=("$(($i-1))")
done

rm $GEN/data_$YEAR.txt

while read line; do
  RELEVANT=()
  IFS=',' read -r -a split <<< "$line"
  for i in "${QUESTION_INDICES[@]}"; do
    RELEVANT+=("${split[$i]}")
  done
  REL_LINE=""
  for i in "${RELEVANT[@]}"; do
    REL_LINE+="$i,"
  done
  #echo "${REL_LINE::-1}" #simply remove the last comma
  echo "${REL_LINE::-1}" >> $GEN/data_$YEAR.txt
done <$DATA_SOURCE

echo "PREPROCESSING DONE"
