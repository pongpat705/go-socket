package websocket
import (
	"github.com/kataras/iris"
  "github.com/kataras/iris/websocket"
  "fmt"
	"time"
	"math/rand"
)
func GetSocket(app *iris.Application){
  // create our echo websocket server
  ws := websocket.New(websocket.Config{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
  })
  ws.OnConnection(handleConnection)




  // register the server on an endpoint.
  // see the inline javascript code in the websockets.html, this endpoint is used to connect to the server.
  app.Get("/echo", ws.Handler())

  // serve the javascript built'n client-side library,
  // see websockets.html script tags, this path is used.
  app.Any("/iris-ws.js", func(ctx iris.Context) {
    ctx.Write(websocket.ClientSource)
  })
}

func handleConnection(c websocket.Connection) {

	loop := 1
	for true {

		time.Sleep(100 * time.Millisecond)
		rpm := rand.Intn(9000)
		speed := rand.Intn(260)
		fuel := rand.Intn(100)

		rpm = (9000*loop)/100
		speed = (260*loop)/100
		fuel = (100*(100-loop))/100

		fmt.Println("####")
		fmt.Println(rpm,speed,fuel)
		fmt.Println("####")
		c.To(websocket.All).Emit("rpm", rpm)
		c.To(websocket.All).Emit("speed", speed)
		c.To(websocket.All).Emit("fuel", fuel)

		if(loop == 100){
			loop = 0
		}

		if(loop == 0){
			time.Sleep(5 * time.Second)
		}

		loop++
	}
	// Read events from browser
	c.On("chat", func(msg string) {
		// Print the message to the console, c.Context() is the iris's http context.
		fmt.Printf("%s sent: %s\n", c.Context().RemoteAddr(), msg)
		// Write message back to the client message owner with:
		// c.Emit("chat", msg)
		// Write message to all except this client with:
		c.To(websocket.Broadcast).Emit("chat", msg)

	})
}
