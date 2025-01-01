package resolver

import (
	"dev-playground/chat/graphQL/resolver/types"
	"dev-playground/chat/mongoDB"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
	messageChannel chan *types.Message
	mongo mongoDB.MongoDB
}

func NewResolver(mongo mongoDB.MongoDB) *Resolver {
	return &Resolver{
		messageChannel: make(chan *types.Message, 100),
		mongo: mongo,
	}
}