#!/bin/sh
set -e

# ---------------------------------------------------------------------------
# Generates /usr/share/nginx/html/env-config.js at container startup.
# Values come from runtime environment variables, falling back to the
# defaults baked into the image at build time.
#
# The app reads window.__ENV__ first, then falls back to import.meta.env
# (which contains build-time values). This way a Coolify redeploy with new
# env vars does NOT require a full image rebuild.
# ---------------------------------------------------------------------------

cat > /usr/share/nginx/html/env-config.js <<EOF
window.__ENV__ = {
  VITE_BACKEND_URL:   "${VITE_BACKEND_URL:-}",
  VITE_CLIENT_ID:     "${VITE_CLIENT_ID:-}",
  VITE_CLIENT_SECRET: "${VITE_CLIENT_SECRET:-}"
};
EOF

echo "env-config.js generated"

exec nginx -g "daemon off;"
