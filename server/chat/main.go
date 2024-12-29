package main

import (
	"dev-playground/chat/graph"
	"dev-playground/chat/resolver"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"github.com/vektah/gqlparser/v2/ast"
)

const defaultPort = "8080"

func init(){
	resolver.Log.Init("11111")
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	/*
	GraphQL 요청을 처리하는 핸들러 생성
 	graph.Config의 resolver 지정
 	*/
	resolver := resolver.NewResolver()
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
					"http://localhost:5173", // 예시: 허용할 origin 추가
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
	
	srv.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})


	// CORS 미들웨어 설정
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // 허용할 Origin 추가
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"}, // 허용할 HTTP 메서드
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// GraphQL 핸들러 등록
	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", corsMiddleware.Handler(srv)) // CORS 미들웨어 적용

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))

}
