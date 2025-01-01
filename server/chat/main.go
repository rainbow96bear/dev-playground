package main

import (
	"context"
	"dev-playground/chat/graphQL"
	"dev-playground/chat/mongoDB"
	"fmt"
	"log"
)

var (
	community_client_url = "http://localhost:5173"
	mongo_db_url         = "mongodb://localhost:27017"
)

func main() {
	fmt.Println("Community Client URL:", community_client_url)
	fmt.Println("Mongo DB URL:", mongo_db_url)
	mongoDB := mongoDB.MongoDB{}
	err := mongoDB.Connect(mongo_db_url)
	defer mongoDB.Client.Disconnect(context.Background())
	if err != nil {
		log.Printf("mongoDB Connect 실패 : %e\n", err)
		return
	}

	graphQL.Connect(community_client_url, mongoDB)
}
