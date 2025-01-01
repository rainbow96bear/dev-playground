package mongoDB

import (
	"context"
	"fmt"
)

func (m *MongoDB)SignIn(userinfo userInfo) error {
	collection := m.Client.Database("userinfo").Collection("users")

	// InsertOne으로 사용자 삽입 (컬렉션이 없으면 자동으로 생성됨)
	insertResult, err := collection.InsertOne(context.Background(), userinfo)
	if err != nil {
		return fmt.Errorf("failed to insert user: %v", err)
	}

	// 성공적으로 삽입된 문서의 ID 출력
	fmt.Printf("Inserted user with ID: %v\n", insertResult.InsertedID)
	return nil
}