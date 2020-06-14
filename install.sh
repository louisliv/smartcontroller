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

cd $HOME
git clone https://github.com/louisliv/smartcontroller.git

########################
##  Remove Old Files  ##
########################
echo -e " ${LRED}-${NC}${WHITE} Removing old files...${NC}"
rm -rf $SC
sudo rm /var/www/smartcontroller
sudo rm /etc/systemd/system/gunicorn.service
sudo rm /etc/nginx/sites-enabled/smartcontroller_nginx.conf

###############################
## Packages and Dependencies ##
###############################
echo -e "\n ${LRED}[${NC} ${LGREEN}Packages and Dependencies Installation${NC} ${LRED}]${NC}"
sleep 1

echo -e " ${LRED}-${NC}${WHITE} Checking packages and dependencies...${NC}"
sleep 1

cd $SC
mapfile -t packages < file.txt

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

####################
## Install NodeJS ##
####################
echo -e "\n ${LRED}[${NC} ${LGREEN}Installing NodeJS${NC} ${LRED}]${NC}"
sleep 1

cd $HOME                          
if ! type node > /dev/null; then
    wget -N https://nodejs.org/dist/v12.18.0/node-v12.18.0-linux-armv7l.tar.xz
    tar -xvf node-v12.18.0-linux-armv7l.tar.xz
    cd node-v12.18.0-linux-armv7l
    sudo cp -R * /usr/local/
fi

sleep 1

##################################
## Install TPLink Smarthome API ##
##################################
echo -e "\n ${LRED}[${NC} ${LGREEN}Installing TPLink Smarthome API${NC} ${LRED}]${NC}"
sleep 1
sudo npm install -g tplink-smarthome-api
sleep 1

#############################
## Install SmartController ##
#############################

echo -e " ${LRED}[${NC}${LGREEN} Installing SmartController ${NC}${LRED}]${NC}"
sleep 1

echo -e " ${LRED}--${NC}${WHITE} Installing python requirements...${NC}${ORANGE}\n"
cd $SC

sudo python3 -m pip install -r requirements.txt
sleep 1

##########################
## Migrate the Database ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Setting up the database...${NC}\n"
cd $SC/server
python3 manage.py migrate

#######################
## Create Admin User ##
#######################
echo -e "\n ${LRED}-${NC}${WHITE} Creating admin users...${NC}\n"
cd $SC/server
python3 manage.py create_superuser --username=admin --email=admin@example.com --password=admin

#######################
## Get Static Set Up ##
#######################
echo -e "\n ${LRED}-${NC}${WHITE} Setting up the static files...${NC}\n"
cd $SC/server
python3 manage.py collectstatic

####################
## Build Frontend ##
####################
cd $SC/client

echo -e "\n ${LRED}-${NC}${WHITE} Installing NPM Dependancies...${NC}\n"
npm install

echo -e "\n ${LRED}-${NC}${WHITE} Building the frontend...${NC}\n"
npm run-script build

echo -e "\n ${LRED}-${NC}${WHITE} Remove the dependacies now that it's built...${NC}\n"
rm -rf $SC/client/node_modules

##############################
## Update/Uninstall Scripts ##
##############################
cd $SC

echo -e "\n ${LRED}-${NC}${WHITE} Making the scripts executable...${NC}\n"
chmod +x uninstall.sh
chmod +x update.sh

##################
## Start Server ##
##################

echo -e "\n ${LRED}-${NC}${WHITE} Start server...${NC}\n"
cd $SC
sudo ln -s $SC /var/www
sudo ln -s $SC/gunicorn.service /etc/systemd/system/
sudo ln -s $SC/smartcontroller_nginx.conf /etc/nginx/sites-enabled/

sudo systemctl start gunicorn.service
sudo systemctl enable gunicorn.service
sudo systemctl restart nginx.service
