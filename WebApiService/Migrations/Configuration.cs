namespace WebApiService.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using WebApiService.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<WebApiService.Models.ProductsContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebApiService.Models.ProductsContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            
            context.Products.AddOrUpdate(
              p => p.Name,
              new Product { Name = "Mouse", Description = "mouse alambrico que anda mas o menos" },
              new Product { Name = "Pro AngularJS book", Description = "apress book que esta muy bueno" },
              new Product { Name = "Mate", Description = "flor de mate" },
              new Product { Name = "Termo", Description = "termo stanley que chorrea un cacho" }
            );

        }
    }
}
