﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Student_Registration_System_Server.Migrations
{
    /// <inheritdoc />
    public partial class AddImagePathToStudents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Students");
        }
    }
}
