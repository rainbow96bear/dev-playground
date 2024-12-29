package resolver

import "dev-playground/chat/resolver/types"

type Resolver struct{
	messageChannel chan *types.Message
}

func NewResolver() *Resolver {
	return &Resolver{
		messageChannel: make(chan *types.Message, 100),
	}
}