set -e

for f in $(find files -not -type d); do
  url=${f#"files"}
  echo $url
  curl -u "admin:$ADMIN_PASSWORD" -XPOST "$PROXY_URL/deploy?url=$url" -H "Content-Type: text/plain" --data-binary "@$f"
done