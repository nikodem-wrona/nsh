INSTALL_DIRECTORY=/Users/nikodem/nsh

if [ ! -d "/Users/$USER/nsh" ]; then
  mkdir /Users/$USER/nsh
  mkdir /Users/$USER/nsh/nsh
fi

cd ../app

yarn
yarn build

cd ./nsh

cp -R ./* $INSTALL_DIRECTORY/nsh/
cp -R ../node_modules $INSTALL_DIRECTORY

echo "Installation complete in $INSTALL_DIRECTORY"
