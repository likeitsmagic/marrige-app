FROM golang:1.22-alpine

WORKDIR /app

RUN apk add --no-cache make protoc

COPY Makefile go.mod go.sum ./
RUN make init && go mod download

COPY . .

RUN make proto tidy

RUN make build

WORKDIR /app

EXPOSE 8080

CMD ["make", "run"]
