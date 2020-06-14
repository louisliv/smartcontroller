GREEN='\033[0;32m'
LGREEN='\033[1;32m'
LRED='\033[1;31m'
WHITE='\033[1;37m'
ORANGE='\033[0;33m'
NC='\033[0m'
RUNASROOT="run-as-root"
NOROOT="no-root"

clear
echo -e " ${LRED}########################################${NC}"
echo -e " ${LRED}#${NC}  ${GREEN}Installing SmartController${NC}  ${LRED}#${NC}"
echo -e " ${LRED}########################################${NC}\n"

SCGITBRANCH="master"
SC="$HOME/smartcontroller"

SCRIPTPATH=$(realpath $0)

##################
## Start Server ##
##################

echo -e "\n ${LRED}-${NC}${WHITE} Stop server...${NC}\n"
sudo systemctl stop gunicorn.service
sudo systemctl stop gunicorn.service

########################
##  Remove Old Files  ##
########################
echo -e " ${LRED}-${NC}${WHITE} Removing old files...${NC}"

cd $HOME
sudo rm /var/www/smartcontroller
sudo rm /etc/systemd/system/gunicorn.service
sudo rm /etc/nginx/sites-enabled/smartcontroller_nginx.conf
rm -rf $SC
sudo systemctl restart nginx.service