GREEN='\033[0;32m'
LGREEN='\033[1;32m'
LRED='\033[1;31m'
WHITE='\033[1;37m'
ORANGE='\033[0;33m'
NC='\033[0m'

clear
echo -e " ${LRED}########################################${NC}"
echo -e " ${LRED}#${NC}  ${GREEN}Updating SmartController${NC}  ${LRED}#${NC}"
echo -e " ${LRED}########################################${NC}\n"

SC="$HOME/smartcontroller"

#####################
##  Download Zip  ##
#####################

echo -e " ${LRED}--${NC}${WHITE} Downloading system files...${NC}${ORANGE}\n"
sleep 1

cd $SC
rm -rf dist
rm -rf release

cd $HOME
sudo rm smartcontroller.zip*

cd $HOME
wget https://smartcontrollerlouisliv.s3.amazonaws.com/smartcontroller.zip
unzip -o smartcontroller.zip -d smartcontroller

cd $SC
bash update.sh