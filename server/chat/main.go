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
	"github.com/vektah/gqlparser/v2/ast"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	/*
	GraphQL 요청을 처리하는 핸들러 생성
 	graph.Config의 resolver 지정
 	*/
	srv := handler.New(graph.NewExecutableSchema(graph.Config{Resolvers: &resolver.Resolver{}}))

	// CORS 설정을 확인하기 위한 Options 요청 처리 설정
	srv.AddTransport(transport.Options{})
	// 클라이언트가 HTTP GET 요청을 통한 처리 허용 설정
	srv.AddTransport(transport.GET{})
	// 클라이언트가 HTTP POST 요청을 통한 처리 허용 설정
	srv.AddTransport(transport.POST{})
	// 클라이언트가 WebSocket을 통한 지속적 연결 설정
	srv.AddTransport(transport.Websocket{})
	// GraphQL API에서 파일 업로드 지원 설정
	srv.AddTransport(transport.MulipartForm{})
	// 클라이언트의 과도한 요청 방지
	srv.Use(extension.FixedComplexityLimit{ComplexityLimit: 100})
	
	srv.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
