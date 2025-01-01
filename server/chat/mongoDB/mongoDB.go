package mongoDB

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)
type MongoDB struct {
	Client *mongo.Client
}

func (m *MongoDB)Connect(url string) (error) {
	clientOptions := options.Client().ApplyURI(url)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return err
	}
	m.Client = client
	err = m.Client.Ping(context.Background(), nil)
	if err != nil {
		return err
	}
	return nil
}