using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NeuralinkLightsDemo.Migrations
{
    public partial class InitialCreate04242019 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lights",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Number = table.Column<int>(nullable: false),
                    Setting1 = table.Column<int>(nullable: false),
                    Setting2 = table.Column<int>(nullable: false),
                    Setting3 = table.Column<int>(nullable: false),
                    Pattern = table.Column<int>(nullable: false),
                    Datetime = table.Column<DateTime>(nullable: false),
                    AlgorithmParameter1 = table.Column<int>(nullable: false),
                    AlgorithmParameter2 = table.Column<int>(nullable: false),
                    AlgorithmParameter3 = table.Column<int>(nullable: false),
                    AlgorithmParameter4 = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lights", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lights");
        }
    }
}
