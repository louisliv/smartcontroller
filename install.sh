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

########################
##  Remove Old Files  ##
########################
echo -e " ${LRED}-${NC}${WHITE} Removing old files...${NC}"
rm -rf $SC

#############################
##Packages and Dependencies##
#############################
echo -e "\n ${LRED}[${NC} ${LGREEN}Packages and Dependencies Installation${NC} ${LRED}]${NC}"
sleep 1

echo -e " ${LRED}-${NC}${WHITE} Checking packages and dependencies...${NC}"
sleep 1

packages=("python3-dev" "python3-pip" "unzip" "nginx")

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

python3 -m pip install -r requirements.txt

echo -e "\n ${NC}${LRED}--${NC}${GREEN} All packages and dependencies are installed.${NC}\n"

sleep 1

#############################
## Install SmartController ##
#############################

echo -e " ${LRED}[${NC}${LGREEN} Installing SmartController ${NC}${LRED}]${NC}"
sleep 1

echo -e " ${LRED}-${NC}${WHITE} Creating folders...${NC}"
sleep 1
mkdir -p -m 0777 $SC

echo -e " ${LRED}--${NC}${WHITE} Downloading system files...${NC}${ORANGE}\n"
sleep 1

cd $SC
wget -N -q https://github.com/louisliv/smartcontroller/files/4773663/smartcontroller.zip
unzip smartcontroller.zip
rm smartcontroller.zip

##########################
## Migrate the Database ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Setting up the database...${NC}\n"
cd $SC/server
python3 manage.py migrate

##########################
## Create Admin User    ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Creating admin users...${NC}\n"
cd $SC/server
python3 manage.py create_superuser --username=admin --email=admin@example.com --password=admin

##########################
## Get Static Set Up ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Setting up the static files...${NC}\n"
cd $SC/server
python3 manage.py collectstatic

##################
## Start Server ##
##################

echo -e "\n ${LRED}-${NC}${WHITE} Start server...${NC}\n"
cd $SC
ln -s $SC /var/www/html
ln -s gunicorn.service /etc/systemd/system/
ln -s smartcontroller_nginx.conf /etc/nginx/sites-enabled/

systemctl start gunicorn.service
systemctl enable gunicorn.service
systemctl restart nginx.service
