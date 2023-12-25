DIR=$(dirname $(realpath $0))
FTP_SERVER="build-serv"
FTP_USER_ACCOUNT_PATH="/ESLoadTest/usersAccountingReport.json"
FTP_USER_PATH="/ESLoadTest/users.json"
LOCAL_USER_ACCOUNT_PATH="$DIR/scripts/data/usersAccountingReport.json"
LOCAL_USER_PATH="$DIR/scripts/data/users.json"

if [ -f "$LOCAL_USER_PATH" ]; then
    echo "File already exists locally: $LOCAL_USER_PATH"
else
    curl "ftp://$FTP_SERVER$FTP_USER_PATH" -o "$LOCAL_USER_PATH"
    echo "File downloaded to $LOCAL_USER_PATH"
fi

if [ -f "$LOCAL_USER_ACCOUNT_PATH" ]; then
    echo "File already exists locally: $LOCAL_USER_ACCOUNT_PATH"
else
    curl "ftp://$FTP_SERVER$FTP_USER_ACCOUNT_PATH" -o "$LOCAL_USER_ACCOUNT_PATH"
    echo "File downloaded to $LOCAL_USER_ACCOUNT_PATH"
fi

