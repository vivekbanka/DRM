using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Item> Items => Set<Item>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Item>().HasData(
            new Item { Id = 1, Name = "Initial Item", Value = 42 }
        );

        // Configure User-Role many-to-many relationship
        builder.Entity<UserRole>()
            .HasKey(ur => new { ur.UserId, ur.RoleId });

        builder.Entity<UserRole>()
            .HasOne(ur => ur.User)
            .WithMany(u => u.UserRoles)
            .HasForeignKey(ur => ur.UserId);

        builder.Entity<UserRole>()
            .HasOne(ur => ur.Role)
            .WithMany(r => r.UserRoles)
            .HasForeignKey(ur => ur.RoleId);

        // Seed default roles
        builder.Entity<Role>().HasData(
            new Role { Id = 1, Name = "Admin", Description = "System administrator", CreatedAt = DateTime.UtcNow },
            new Role { Id = 2, Name = "User", Description = "Regular user", CreatedAt = DateTime.UtcNow }
        );
    }
}