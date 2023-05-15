#!/bin/sh
set -e

# Perform environment variable substitution on nginx.conf.template
envsubst '$$PORT' < /etc/nginx/nginx.conf> /etc/nginx/nginx.conf

# Execute the CMD from the Dockerfile
exec "$@"