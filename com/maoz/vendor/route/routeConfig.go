package route

import (
	"controller"

	"github.com/iris-contrib/middleware/cors"
	"github.com/kataras/iris"
)

func GetRoute() *iris.Application {
	app := iris.New()

	//static
	app.StaticServe("./static", "/static")

	//template
	template := iris.HTML("./template", ".html")
	//Layout
	template.Layout("layout.html")
	//function
	template.AddFunc("greet", func(s string) string {
		return "Greeting " + s + "!"
	})

	//RegisterView
	app.RegisterView(template)

	//define route
	app.Get("/app", controller.Landing)
	app.Get("/story", controller.LoadStorys)

	crs := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // allows everything, use that to change the hosts.
		AllowCredentials: true,
	})
	v1 := app.Party("/api", crs).AllowMethods(iris.MethodOptions) // <- important for the preflight.
	{
		v1.Get("/users.json", controller.LoadUsersWithJson)
	}

	return app
}
