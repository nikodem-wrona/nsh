if [ ! -d "/Users/$USER/nsh" ]; then
  echo "nsh is not installed"
  exit 0
else 
  rm -rf /Users/$USER/nsh
  echo "nsh uninstalled"
  exit 0
fi
