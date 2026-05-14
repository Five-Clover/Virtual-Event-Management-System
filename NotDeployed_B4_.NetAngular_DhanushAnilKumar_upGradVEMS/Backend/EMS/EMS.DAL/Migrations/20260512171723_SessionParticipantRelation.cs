using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMS.DAL.Migrations
{
    /// <inheritdoc />
    public partial class SessionParticipantRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SessionId",
                table: "ParticipantEvents",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ParticipantEvents_SessionId",
                table: "ParticipantEvents",
                column: "SessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_ParticipantEvents_Sessions_SessionId",
                table: "ParticipantEvents",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "SessionId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ParticipantEvents_Sessions_SessionId",
                table: "ParticipantEvents");

            migrationBuilder.DropIndex(
                name: "IX_ParticipantEvents_SessionId",
                table: "ParticipantEvents");

            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "ParticipantEvents");
        }
    }
}
