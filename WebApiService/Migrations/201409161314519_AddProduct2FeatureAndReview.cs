namespace WebApiService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddProduct2FeatureAndReview : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Features", "Product_ProductId", "dbo.Products");
            DropForeignKey("dbo.Reviews", "Product_ProductId", "dbo.Products");
            DropIndex("dbo.Features", new[] { "Product_ProductId" });
            DropIndex("dbo.Reviews", new[] { "Product_ProductId" });
            RenameColumn(table: "dbo.Features", name: "Product_ProductId", newName: "ProductId");
            RenameColumn(table: "dbo.Reviews", name: "Product_ProductId", newName: "ProductId");
            AlterColumn("dbo.Features", "ProductId", c => c.Long(nullable: false));
            AlterColumn("dbo.Reviews", "ProductId", c => c.Long(nullable: false));
            CreateIndex("dbo.Features", "ProductId");
            CreateIndex("dbo.Reviews", "ProductId");
            AddForeignKey("dbo.Features", "ProductId", "dbo.Products", "ProductId", cascadeDelete: true);
            AddForeignKey("dbo.Reviews", "ProductId", "dbo.Products", "ProductId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Reviews", "ProductId", "dbo.Products");
            DropForeignKey("dbo.Features", "ProductId", "dbo.Products");
            DropIndex("dbo.Reviews", new[] { "ProductId" });
            DropIndex("dbo.Features", new[] { "ProductId" });
            AlterColumn("dbo.Reviews", "ProductId", c => c.Long());
            AlterColumn("dbo.Features", "ProductId", c => c.Long());
            RenameColumn(table: "dbo.Reviews", name: "ProductId", newName: "Product_ProductId");
            RenameColumn(table: "dbo.Features", name: "ProductId", newName: "Product_ProductId");
            CreateIndex("dbo.Reviews", "Product_ProductId");
            CreateIndex("dbo.Features", "Product_ProductId");
            AddForeignKey("dbo.Reviews", "Product_ProductId", "dbo.Products", "ProductId");
            AddForeignKey("dbo.Features", "Product_ProductId", "dbo.Products", "ProductId");
        }
    }
}
