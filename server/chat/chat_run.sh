if [ "$1" == "product" ]; then
    go run -ldflags="-X main.community_client_url=http://localhost:5173 -X main.mongo_db_url=mongodb://localhost:27017" main.go
else
    go run main.go 
fi