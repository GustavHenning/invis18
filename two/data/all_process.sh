#!/bin/bash

GEN="./generated"
#rm -rf $GEN
mkdir $GEN

#
# WAVE 2016
#
YEAR="2016_01_01"
DATA_INFO="raw/$YEAR.sts"
WAVE="1"
WAVE_END="2"
COUNTRY_CODE="2"
COUNTRY_CODE_END="2A"

cat $DATA_INFO | grep "How much you trust" > $GEN/questions_$YEAR.txt
cat $DATA_INFO | grep "Confidence" >> $GEN/questions_$YEAR.txt

bash preprocess.sh $YEAR $WAVE $WAVE_END $COUNTRY_CODE $COUNTRY_CODE_END
python postprocess.py $YEAR

exit 1
YEAR="5_2015_04_18"
DATA_INFO="raw/$YEAR.sts"
WAVE="1"
WAVE_END="1A"
COUNTRY_CODE="2"
COUNTRY_CODE_END="2A"

cat $DATA_INFO | grep "Trust:" > $GEN/questions_$YEAR.txt
cat $DATA_INFO | grep "Confidence:" >> $GEN/questions_$YEAR.txt

bash preprocess.sh $YEAR $WAVE $WAVE_END $COUNTRY_CODE $COUNTRY_CODE_END
python postprocess.py $YEAR

YEAR="4_2015_04_18"
DATA_INFO="raw/$YEAR.sts"
WAVE="1"
WAVE_END="2"
COUNTRY_CODE="2"
COUNTRY_CODE_END="2A"

cat $DATA_INFO | grep "Confidence:" > $GEN/questions_$YEAR.txt
cat $GEN/questions_$YEAR.txt
bash preprocess.sh $YEAR $WAVE $WAVE_END $COUNTRY_CODE $COUNTRY_CODE_END
python postprocess.py $YEAR

YEAR="3_2015_04_18"
DATA_INFO="raw/$YEAR.sts"

cat $DATA_INFO | grep "Confidence:" > $GEN/questions_$YEAR.txt

echo hello
bash preprocess.sh $YEAR $WAVE $WAVE_END $COUNTRY_CODE $COUNTRY_CODE_END
python postprocess.py $YEAR


YEAR="2_2015_04_18"
DATA_INFO="raw/$YEAR.sts"

cat $DATA_INFO | grep "Confidence:" > $GEN/questions_$YEAR.txt

bash preprocess.sh $YEAR $WAVE $WAVE_END $COUNTRY_CODE $COUNTRY_CODE_END
python postprocess.py $YEAR
