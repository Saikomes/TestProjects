set -e

if [ $# -lt 1 ]; then
    echo "Usage: ./docker-run.sh <number of users> [SCALE]"
    exit 1
fi

./loadData.sh

NVUS=$1
SCALE=${2:-1}
SCRIPT_NAME=testAll.js
TAG_NAME="$(basename -s .js $SCRIPT_NAME)-$(date +%s)"
SCRIPT_DIR=$(dirname $(realpath $0))
EXECUTION_DIR=$(basename $SCRIPT_DIR)

mkdir -p $SCRIPT_DIR/logs
sudo chmod 777 $SCRIPT_DIR/logs
rm -f $SCRIPT_DIR/logs/loadTest.log

# --logformat=json --http-debug --console-output "test.txt" 
sudo docker-compose run --rm -v $SCRIPT_DIR:/$EXECUTION_DIR k6 run --env base_url="http://172.19.22.210:8090/" --env timeout="60s" --env vus=$NVUS --env scale=$SCALE --logformat=raw --console-output=/$EXECUTION_DIR/logs/"loadTest.log" /$EXECUTION_DIR/scripts/$SCRIPT_NAME --tag testid=$TAG_NAME
grep -v -P '(ar user|sv user)' $SCRIPT_DIR/logs/loadTest.log > $SCRIPT_DIR/logs/error.log
