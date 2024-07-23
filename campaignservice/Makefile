.PHONY: init
init:
	@go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	@go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

.PHONY: proto
proto:
	@protoc --proto_path=. --go-grpc_out=. --go_out=:. proto/user.proto

.PHONY: tidy
tidy:
	@go mod tidy

.PHONY: build
build:
	go build -o campaignservice ./cmd/api/main.go

.PHONY: run
run:
	./campaignservice