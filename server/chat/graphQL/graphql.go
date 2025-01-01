package graphQL

import (
	"context"
	"dev-playground/chat/graphQL/graph"
	"dev-playground/chat/graphQL/resolver"
	"dev-playground/chat/mongoDB"
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/websocket"
	lru "github.com/hashicorp/golang-lru"
	"github.com/rs/cors"
	"github.com/vektah/gqlparser/v2/ast"
)
const (
	PORT = "8080"
)
// LRUCache는 gqlgen의 Cache 인터페이스를 구현하는 래퍼입니다.
type LRUCache struct {
	cache *lru.Cache
}

// NewLRUCache는 LRUCache를 생성하는 함수입니다.
func NewLRUCache(size int) (*LRUCache, error) {
	cache, err := lru.New(size)
	if err != nil {
		return nil, err
	}
	return &LRUCache{cache: cache}, nil
}

// Get은 gqlgen의 Cache 인터페이스에서 요구하는 Get 메서드를 구현합니다.
func (l *LRUCache) Get(ctx context.Context, key string) (*ast.QueryDocument, bool) {
	val, ok := l.cache.Get(key)
	if !ok {
		return nil, false
	}
	return val.(*ast.QueryDocument), true
}

// Set은 gqlgen의 Cache 인터페이스에서 요구하는 Set 메서드를 구현합니다.
func (l *LRUCache) Set(ctx context.Context, key string, value *ast.QueryDocument) bool {
	// Add 메서드를 Set 메서드로 변경하여 적용
	l.cache.Add(key, value)
	return true
}

// Delete는 gqlgen의 Cache 인터페이스에서 요구하는 Delete 메서드를 구현합니다.
func (l *LRUCache) Delete(ctx context.Context, key string) {
	l.cache.Remove(key)
}

// Size는 캐시의 크기를 반환하는 메서드입니다.
func (l *LRUCache) Size() int {
	return l.cache.Len()
}

func Connect(url string, mongoDB mongoDB.MongoDB) {
	/*
		GraphQL 요청을 처리하는 핸들러 생성
	 	graph.Config의 resolver 지정
	*/
	resolver := resolver.NewResolver(mongoDB)
	srv := handler.New(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))

	// CORS 설정을 확인하기 위한 Options 요청 처리 설정
	srv.AddTransport(transport.Options{})
	// 클라이언트가 HTTP GET 요청을 통한 처리 허용 설정
	srv.AddTransport(transport.GET{})
	// 클라이언트가 HTTP POST 요청을 통한 처리 허용 설정
	srv.AddTransport(transport.POST{})
	// 클라이언트가 WebSocket을 통한 지속적 연결 설정
	srv.AddTransport(transport.Websocket{
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				// 요청 origin을 허용하는 조건을 설정 (예: http://localhost:5173)
				// 필요한 경우 여러 origin을 허용할 수 있음
				allowedOrigins := []string{
					url, // 예시: 허용할 origin 추가
				}
				for _, origin := range allowedOrigins {
					if r.Header.Get("Origin") == origin {
						return true
					}
				}
				// 위 조건에 맞지 않으면 false 반환
				return false
			},
		},
	})
	// GraphQL API에서 파일 업로드 지원 설정
	srv.AddTransport(transport.MultipartForm{})
	// 클라이언트의 과도한 요청 방지
	// srv.Use(&extension.ComplexityLimit{ComplexityLimit: 100})

	srv.Use(extension.Introspection{})

	// CORS 미들웨어 설정
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{url}, // 허용할 Origin 추가
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"}, // 허용할 HTTP 메서드
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// GraphQL 핸들러 등록
	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", corsMiddleware.Handler(srv)) // CORS 미들웨어 적용

	log.Printf("connect to %s for GraphQL playground", url)
	log.Fatal(http.ListenAndServe(":"+PORT, nil))
}
