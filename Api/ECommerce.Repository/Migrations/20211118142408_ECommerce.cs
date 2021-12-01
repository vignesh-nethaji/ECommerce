using Microsoft.EntityFrameworkCore.Migrations;

namespace ECommerce.Repository.Migrations
{
    public partial class ECommerce : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_cart_Product_productId",
                table: "cart");

            migrationBuilder.DropForeignKey(
                name: "FK_cart_Users_userId",
                table: "cart");

            migrationBuilder.DropForeignKey(
                name: "FK_Product_Catagory_CatagoryId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_CatagoryId",
                table: "Product");

            migrationBuilder.DropPrimaryKey(
                name: "PK_cart",
                table: "cart");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CatagoryId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "category",
                table: "Catagory");

            migrationBuilder.RenameTable(
                name: "cart",
                newName: "Cart");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "Product",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "price",
                table: "Product",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "image",
                table: "Product",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Product",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Cart",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "productId",
                table: "Cart",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_cart_userId",
                table: "Cart",
                newName: "IX_Cart_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_cart_productId",
                table: "Cart",
                newName: "IX_Cart_ProductId");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Product",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Catagory",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cart",
                table: "Cart",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Product_CategoryId",
                table: "Product",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_Product_ProductId",
                table: "Cart",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_User_UserId",
                table: "Cart",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Catagory_CategoryId",
                table: "Product",
                column: "CategoryId",
                principalTable: "Catagory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_Product_ProductId",
                table: "Cart");

            migrationBuilder.DropForeignKey(
                name: "FK_Cart_User_UserId",
                table: "Cart");

            migrationBuilder.DropForeignKey(
                name: "FK_Product_Catagory_CategoryId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_CategoryId",
                table: "Product");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cart",
                table: "Cart");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Catagory");

            migrationBuilder.RenameTable(
                name: "Cart",
                newName: "cart");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Product",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Product",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Product",
                newName: "image");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Product",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "cart",
                newName: "userId");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "cart",
                newName: "productId");

            migrationBuilder.RenameIndex(
                name: "IX_Cart_UserId",
                table: "cart",
                newName: "IX_cart_userId");

            migrationBuilder.RenameIndex(
                name: "IX_Cart_ProductId",
                table: "cart",
                newName: "IX_cart_productId");

            migrationBuilder.AddColumn<int>(
                name: "CatagoryId",
                table: "Product",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "category",
                table: "Catagory",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_cart",
                table: "cart",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Product_CatagoryId",
                table: "Product",
                column: "CatagoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_cart_Product_productId",
                table: "cart",
                column: "productId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_cart_Users_userId",
                table: "cart",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Catagory_CatagoryId",
                table: "Product",
                column: "CatagoryId",
                principalTable: "Catagory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
