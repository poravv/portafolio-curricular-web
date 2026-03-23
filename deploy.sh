#!/bin/bash
set -euo pipefail

# =============================================================================
# Deploy to cPanel via FTPS (explicit TLS on port 21)
# Usage: ./deploy.sh
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"

# Load .env
if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: .env file not found at $ENV_FILE"
  exit 1
fi

source "$ENV_FILE"

# Validate required vars
for var in FTP_USER FTP_PASS FTP_HOST FTP_PORT FTP_REMOTE_PATH; do
  if [ -z "${!var:-}" ]; then
    echo "ERROR: $var is not set in .env"
    exit 1
  fi
done

DIST_DIR="$SCRIPT_DIR/dist"

# Step 1: Build
echo "========================================="
echo "  Building project..."
echo "========================================="

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 22 2>/dev/null || true

npm run build

if [ ! -d "$DIST_DIR" ]; then
  echo "ERROR: dist/ directory not found after build"
  exit 1
fi

echo ""
echo "========================================="
echo "  Deploying to $FTP_HOST..."
echo "========================================="
echo "  User: $FTP_USER"
echo "  Remote: $FTP_REMOTE_PATH"
echo ""

# Step 2: Upload via lftp (supports FTPS explicit TLS)
if ! command -v lftp &> /dev/null; then
  echo "lftp not found. Installing via Homebrew..."
  brew install lftp
fi

lftp -c "
  set ftp:ssl-allow yes
  set ftp:ssl-force yes
  set ftp:ssl-protect-data yes
  set ssl:verify-certificate no
  set net:timeout 30
  set net:max-retries 3
  set net:reconnect-interval-base 5

  open -u $FTP_USER,$FTP_PASS -p $FTP_PORT $FTP_HOST

  echo '--- Syncing files ---'
  mirror --reverse --delete --verbose --parallel=4 \
    --exclude-glob .DS_Store \
    --exclude-glob .git/ \
    $DIST_DIR $FTP_REMOTE_PATH

  echo '--- Done ---'
  bye
"

echo ""
echo "========================================="
echo "  Deploy complete!"
echo "  https://portafolio-andres.mindtechpy.net"
echo "========================================="
