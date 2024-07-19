FROM golang:1.22-alpine

WORKDIR /app

RUN apk add --no-cache make

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN make build

WORKDIR /app

EXPOSE 8080

CMD ["make", "run"]
