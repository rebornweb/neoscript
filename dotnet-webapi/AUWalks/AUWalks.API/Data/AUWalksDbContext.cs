using AUWalks.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace AUWalks.API.Data
{
    public class AUWalksDbContext : DbContext
    {
        public AUWalksDbContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {
                
        }

        public DbSet<Difficulty> Difficulties { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Walk> Walks { get; set; }

    }
}
