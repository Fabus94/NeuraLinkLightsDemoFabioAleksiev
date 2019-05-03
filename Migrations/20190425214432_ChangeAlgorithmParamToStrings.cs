using Microsoft.EntityFrameworkCore.Migrations;

namespace NeuralinkLightsDemo.Migrations
{
    public partial class ChangeAlgorithmParamToStrings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Pattern",
                table: "Lights",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "AlgorithmParameter4",
                table: "Lights",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "AlgorithmParameter3",
                table: "Lights",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "AlgorithmParameter2",
                table: "Lights",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "AlgorithmParameter1",
                table: "Lights",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Pattern",
                table: "Lights",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AlgorithmParameter4",
                table: "Lights",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AlgorithmParameter3",
                table: "Lights",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AlgorithmParameter2",
                table: "Lights",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AlgorithmParameter1",
                table: "Lights",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
