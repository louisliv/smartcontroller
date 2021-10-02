GREEN='\033[0;32m'
LGREEN='\033[1;32m'
LRED='\033[1;31m'
WHITE='\033[1;37m'
ORANGE='\033[0;33m'
NC='\033[0m'
RUNASROOT="run-as-root"
NOROOT="no-root"

SCGITBRANCH="master"
SC="$HOME/smartcontroller"

SCRIPTPATH=$(realpath $0)

########################
##  Remove Old Files  ##
########################
echo -e " ${LRED}-${NC}${WHITE} Removing old files...${NC}"
sudo rm /var/www/smartcontroller
sudo rm /etc/nginx/sites-enabled/smartcontroller_nginx.conf

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

##############################
## Update/Uninstall Scripts ##
##############################
cd $SC

echo -e "\n ${LRED}-${NC}${WHITE} Making the scripts executable...${NC}\n"
chmod +x uninstall.sh
chmod +x update.sh

echo -e "\n ${LRED}-${NC}${WHITE} Make executible...${NC}\n"
cd $SC/electron-ui/release
chmod +x *.AppImage

####################
## Restart Server ##
####################

echo -e "\n ${LRED}-${NC}${WHITE} Restart server...${NC}\n"
cd $SC
sudo ln -s $SC /var/www
sudo ln -s $SC/smartcontroller_nginx.conf /etc/nginx/sites-enabled

sudo systemctl daemon-reload
sudo systemctl restart gunicorn.service
sudo systemctl restart nginx.service
