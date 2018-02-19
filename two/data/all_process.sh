#!/bin/bash

GEN="./generated"
#rm -rf $GEN
mkdir $GEN

#
# WAVE 2016
#
YEAR="6_2016_01_01"
DATA_INFO="raw/$YEAR.sts"
WAVE="V1"
COUNTRY_CODE="V2"

cat $DATA_INFO | grep "How much you trust" > $GEN/questions_$YEAR.txt
cat $DATA_INFO | grep "Confidence" >> $GEN/questions_$YEAR.txt

python pre.py $YEAR $WAVE $COUNTRY_CODE
python postprocess.py $YEAR

YEAR="5_2015_04_18"
DATA_INFO="raw/$YEAR.sts"

cat $DATA_INFO | grep "Trust:" > $GEN/questions_$YEAR.txt
cat $DATA_INFO | grep "Confidence:" >> $GEN/questions_$YEAR.txt

python pre.py $YEAR $WAVE $COUNTRY_CODE
python postprocess.py $YEAR

YEAR="4_2015_04_18"
DATA_INFO="raw/$YEAR.sts"

cat $DATA_INFO | grep "Confidence:" > $GEN/questions_$YEAR.txt

python pre.py $YEAR $WAVE $COUNTRY_CODE
python postprocess.py $YEAR

YEAR="3_2015_04_18"
DATA_INFO="raw/$YEAR.sts"

cat $DATA_INFO | grep "Confidence:" > $GEN/questions_$YEAR.txt

python pre.py $YEAR $WAVE $COUNTRY_CODE
python postprocess.py $YEAR


YEAR="2_2015_04_18"
DATA_INFO="raw/$YEAR.sts"

cat $DATA_INFO | grep "Confidence:" > $GEN/questions_$YEAR.txt

python pre.py $YEAR $WAVE $COUNTRY_CODE
python postprocess.py $YEAR


YEAR="1_2015_04_18"
DATA_INFO="raw/$YEAR.sts"

cat $DATA_INFO | grep "Confidence:" > $GEN/questions_$YEAR.txt

python pre.py $YEAR $WAVE $COUNTRY_CODE
python postprocess.py $YEAR
