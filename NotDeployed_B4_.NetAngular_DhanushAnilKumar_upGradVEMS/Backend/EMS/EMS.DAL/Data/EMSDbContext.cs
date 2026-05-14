using EMS.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace EMS.DAL.Data
{
    public class EMSDbContext : DbContext
    {
        public EMSDbContext(DbContextOptions<EMSDbContext> options) : base(options) { }

        public DbSet<UserInfo> Users { get; set; }
        public DbSet<EventDetails> Events { get; set; }
        public DbSet<CategoryDetails> Categories { get; set; }
        public DbSet<SessionInfo> Sessions { get; set; }
        public DbSet<SpeakersDetails> Speakers { get; set; }
        public DbSet<ParticipantEventDetails> ParticipantEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ===============================
            //  RELATIONSHIPS
            // ===============================

            // Category → Events (1-M)
            modelBuilder.Entity<EventDetails>()
                .HasOne(e => e.Category)
                .WithMany(c => c.Events)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Event → Sessions (1-M)
            modelBuilder.Entity<SessionInfo>()
                .HasOne(s => s.Event)
                .WithMany(e => e.Sessions)
                .HasForeignKey(s => s.EventId)
                .OnDelete(DeleteBehavior.NoAction);

            // Speaker → Sessions (1-M)
            modelBuilder.Entity<SessionInfo>()
                .HasOne(s => s.Speaker)
                .WithMany(sp => sp.Sessions)
                .HasForeignKey(s => s.SpeakerId)
                .OnDelete(DeleteBehavior.NoAction);

            // User → ParticipantEvent (1-M)
            modelBuilder.Entity<ParticipantEventDetails>()
                .HasOne(p => p.User)
                .WithMany(u => u.Registrations)
                .HasForeignKey(p => p.ParticipantEmailId)
                .OnDelete(DeleteBehavior.Cascade);

            // Event → ParticipantEvent (1-M)
            modelBuilder.Entity<ParticipantEventDetails>()
                .HasOne(p => p.Event)
                .WithMany(e => e.Participants)
                .HasForeignKey(p => p.EventId)
                .OnDelete(DeleteBehavior.Cascade);


            // ===============================
            //  UNIQUE CONSTRAINTS
            // ===============================

            modelBuilder.Entity<EventDetails>()
                .HasIndex(e => e.EventName)
                .IsUnique();

            modelBuilder.Entity<SpeakersDetails>()
                .HasIndex(s => s.SpeakerName)
                .IsUnique();

            modelBuilder.Entity<SessionInfo>()
                .HasIndex(s => s.SessionTitle)
                .IsUnique();

            modelBuilder.Entity<UserInfo>()
                .HasIndex(u => u.EmailId)
                .IsUnique();

            modelBuilder.Entity<CategoryDetails>()
                .HasIndex(c => c.CategoryName)
                .IsUnique();

            // ===============================
            //  SEED DATA 
            // ===============================

            var cat1 = Guid.Parse("11111111-1111-1111-1111-111111111111");
            var cat2 = Guid.Parse("22222222-2222-2222-2222-222222222222");
            var cat3 = Guid.Parse("33333333-3333-3333-3333-333333333333");
            var cat4 = Guid.Parse("44444444-4444-4444-4444-444444444444");
            var cat5 = Guid.Parse("55555555-5555-5555-5555-555555555555");

            // ADMIN SEED
            modelBuilder.Entity<UserInfo>().HasData(
                new UserInfo
                {
                    EmailId = "admin@upgrad.com",
                    UserName = "Admin",
                    Role = "Admin",
                    Password = "Admin@321" 
                });

            // CATEGORY SEED
            modelBuilder.Entity<CategoryDetails>().HasData(
                new CategoryDetails { Id = cat1, CategoryName = "Tech & Innovation" },
                new CategoryDetails { Id = cat2, CategoryName = "Industrial Event" },
                new CategoryDetails { Id = cat3, CategoryName = "Workshop" },
                new CategoryDetails { Id = cat4, CategoryName = "Solution and Projects" },
                new CategoryDetails { Id = cat5, CategoryName = "EMS (Solution)" }
            );
        }
    }
}