package resolver

import (
	"context"
	"dev-playground/chat/graph"
	"dev-playground/chat/resolver/types"
	Common "dev-playground/common/Log"
	"fmt"
	"time"
)

var messageChannel = make(chan *types.Message, 10)
var Log Common.Log

func (r *mutationResolver) SendMessage(ctx context.Context, content *string, mediaURL *string, mediaType *string) (*types.Message, error) {
	Log.Debugf("message content : %s\n", *content)
	currentTime := time.Now().Format(time.RFC3339)

	// 새로운 메시지 생성
	message := &types.Message{
		ID:        fmt.Sprintf("%d", time.Now().UnixNano()), // 메시지 ID는 유니크하게 생성
		Content:   content,
		MediaURL:  mediaURL,
		MediaType: mediaType,
		Timestamp: &currentTime,
	}

	// 메시지를 채널로 전송 (구독자에게 전달)
	go func() {
		select {
		case messageChannel <- message:
			Log.Infof("메세지 전송 성공 message ID : %s\n", message.ID)
		case <-ctx.Done():
			Log.Warnf("메세지 전송 실패 message ID : %s\n", message.ID)
		}
	}()

	return message, nil
}


func (r *queryResolver) Messages(ctx context.Context) ([]*types.Message, error) {
	panic(fmt.Errorf("not implemented: Messages - messages"))
}

func (r *subscriptionResolver) MessageSent(ctx context.Context) (<-chan *types.Message, error) {
  	// 채널을 반환하여 구독자가 메시지를 실시간으로 받을 수 있게 합니다.
	subscriptionChannel := make(chan *types.Message)

	// 구독 종료 시 채널을 닫도록 처리
	go func() {
		<-ctx.Done()
		Log.Infof("메세지 구독 종료\n")
		close(subscriptionChannel)
	}()

	// 메시지가 messageChannel로부터 수신될 때마다 구독자 채널로 전달
	go func() {
		for message := range messageChannel {
			subscriptionChannel <- message
		}
	}()

	return subscriptionChannel, nil
}

func (r *Resolver) Mutation() graph.MutationResolver { return &mutationResolver{r} }

func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

func (r *Resolver) Subscription() graph.SubscriptionResolver { return &subscriptionResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }