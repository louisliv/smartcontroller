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

#####################
##  Download Repo  ##
#####################

echo -e " ${LRED}--${NC}${WHITE} Downloading system files...${NC}${ORANGE}\n"
sleep 1

cd $SC
git fetch && git pull origin master

###############################
## Packages and Dependencies ##
###############################
echo -e "\n ${LRED}[${NC} ${LGREEN}Packages and Dependencies Installation${NC} ${LRED}]${NC}"
sleep 1

echo -e " ${LRED}-${NC}${WHITE} Checking packages and dependencies...${NC}"
sleep 1

cd $SC
mapfile -t packages < packages.txt

for package in "${packages[@]}"; do
    if dpkg -s $package >/dev/null 2>&1; then
        echo -e " ${LRED}--${NC}${WHITE} $package : ${NC}${LGREEN}Installed${NC}"
    else
        echo -e " ${LRED}--${NC}${WHITE} $package : ${NC}${LRED}Not Installed${NC}"
        installpackages+=("$package")
    fi
done

if [ ${#installpackages[@]} -gt 0 ]; then
    
    echo -e " ${LRED}---${NC}${WHITE} Installing missing packages and dependencies...${NC}${ORANGE}\n"
    sleep 1
    
    sudo apt-get update; sudo apt-get install -y ${installpackages[@]}

fi

echo -e "\n ${NC}${LRED}--${NC}${GREEN} All packages and dependencies are installed.${NC}\n"

sleep 1

#################################
## Install New SmartController ##
#################################

echo -e " ${LRED}[${NC}${LGREEN} Installing Updated SmartController ${NC}${LRED}]${NC}"
sleep 1

echo -e " ${LRED}--${NC}${WHITE} Installing python requirements...${NC}${ORANGE}\n"
cd $SC

sudo python3 -m pip install -r requirements.txt
sudo npm install -g yarn
sleep 1

##########################
## Migrate the Database ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Setting up the database...${NC}\n"
cd $SC/server
python3 manage.py migrate

#######################
## Get Static Set Up ##
#######################
echo -e "\n ${LRED}-${NC}${WHITE} Setting up the static files...${NC}\n"
cd $SC/server
python3 manage.py collectstatic --noinput

####################
## Build Frontend ##
####################
cd $SC/electron-ui

echo -e "\n ${LRED}-${NC}${WHITE} Installing NPM Dependancies...${NC}\n"
yarn install

echo -e "\n ${LRED}-${NC}${WHITE} Building the frontend...${NC}\n"
yarn build:prod
electron-builder build --armv7l --linux

echo -e "\n ${LRED}-${NC}${WHITE} Remove the dependacies now that it's built...${NC}\n"
rm -rf $SC/electron-ui/node_modules

##############################
## Update/Uninstall Scripts ##
##############################
cd $SC

echo -e "\n ${LRED}-${NC}${WHITE} Making the scripts executable...${NC}\n"
chmod +x uninstall.sh
chmod +x update.sh

####################
## Restart Server ##
####################

echo -e "\n ${LRED}-${NC}${WHITE} Restart server...${NC}\n"

sudo systemctl restart gunicorn.service
sudo systemctl restart nginx.service
